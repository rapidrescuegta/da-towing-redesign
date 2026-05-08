import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Marketing site — no auth, no DB. Store submissions as append-only JSONL
// under logs/feedback/YYYY-MM-DD.jsonl and fire an email notification if
// Resend is configured. Never let email/fs errors block the user-facing POST.

export const runtime = 'nodejs'

type LogEntry = {
  level: string
  message: string
  timestamp: string
}

type FeedbackPayload = {
  comment?: string
  email?: string
  screenshot?: string | null
  consoleLogs?: LogEntry[]
  pageUrl?: string
  category?: string
}

const LOG_DIR = path.join(process.cwd(), 'logs', 'feedback')

async function appendToJsonl(record: Record<string, unknown>) {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true })
    const day = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    const file = path.join(LOG_DIR, `${day}.jsonl`)
    await fs.appendFile(file, JSON.stringify(record) + '\n', 'utf8')
  } catch (err) {
    console.error('[feedback] failed to write JSONL', err)
  }
}

async function sendNotificationEmail(record: {
  id: string
  category: string
  comment: string
  pageUrl: string
  email?: string
  userAgent?: string
  ipAddress?: string
  screenshot?: string | null
  consoleLogs?: LogEntry[]
}) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.FEEDBACK_EMAIL_TO || process.env.EMAIL_TO
  const from = process.env.EMAIL_FROM || 'D&A Towing Feedback <onboarding@resend.dev>'

  if (!apiKey || !to) {
    console.info('[feedback] email skipped — RESEND_API_KEY or FEEDBACK_EMAIL_TO not set')
    return
  }

  try {
    // Lazy import so the package isn't required at build time if unused
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const recentLogs = (record.consoleLogs || []).slice(-20)
    const logsHtml = recentLogs.length
      ? `<pre style="background:#0f1629;color:#cbd5e1;padding:12px;border-radius:8px;font-size:11px;overflow:auto;max-height:240px;">${recentLogs
          .map(
            (l) =>
              `[${l.timestamp}] ${l.level.toUpperCase()}: ${escapeHtml(l.message).slice(0, 500)}`
          )
          .join('\n')}</pre>`
      : ''

    const attachments: { filename: string; content: string }[] = []
    if (record.screenshot && record.screenshot.startsWith('data:image/')) {
      const base64 = record.screenshot.split(',')[1]
      if (base64) {
        attachments.push({
          filename: `screenshot-${record.id}.jpg`,
          content: base64,
        })
      }
    }

    await resend.emails.send({
      from,
      to,
      subject: `[D&A Towing] New ${record.category} feedback`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background:#070B14; color:#FAF8F0;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background: linear-gradient(135deg,#F5C842,#D4A017,#B8860B); color: #070B14; font-weight: bold; padding: 8px 14px; border-radius: 8px; font-size: 14px;">D&A Towing</div>
          </div>
          <h2 style="color: #F5C842; margin-bottom: 8px;">New ${escapeHtml(record.category)} feedback</h2>
          <p style="color: #CBD5E1;"><strong>From:</strong> ${record.email ? escapeHtml(record.email) : 'anonymous'}</p>
          <p style="color: #CBD5E1;"><strong>Page:</strong> ${escapeHtml(record.pageUrl || 'N/A')}</p>
          <p style="color: #94A3B8; font-size: 12px;"><strong>IP:</strong> ${escapeHtml(record.ipAddress || 'unknown')} &middot; <strong>UA:</strong> ${escapeHtml((record.userAgent || '').slice(0, 120))}</p>
          <div style="background: #151D35; border: 1px solid #243054; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="color: #FAF8F0; margin: 0; white-space: pre-wrap;">${escapeHtml(record.comment)}</p>
          </div>
          ${logsHtml ? `<h3 style="color:#94A3B8;font-size:13px;margin-top:24px;">Recent console logs</h3>${logsHtml}` : ''}
          <p style="color:#94A3B8;font-size:11px;margin-top:24px;">Report ID: ${record.id}</p>
        </div>
      `,
      attachments: attachments.length ? attachments : undefined,
    })
  } catch (err) {
    console.error('[feedback] email send failed', err)
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  let payload: FeedbackPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { comment, email, screenshot, consoleLogs, pageUrl, category } = payload

  if (!comment?.trim()) {
    return NextResponse.json({ error: 'Comment is required' }, { status: 400 })
  }

  // Server-side payload guard: reject screenshots larger than ~700KB
  if (screenshot && screenshot.length > 700_000) {
    return NextResponse.json({ error: 'Screenshot too large' }, { status: 400 })
  }

  const id = `fb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const userAgent = req.headers.get('user-agent') || 'unknown'

  const record = {
    id,
    createdAt: new Date().toISOString(),
    category: category || 'bug',
    status: 'open',
    comment: comment.trim(),
    email: email?.trim() || null,
    pageUrl: pageUrl || '',
    userAgent,
    ipAddress,
    consoleLogs: consoleLogs || [],
    // Screenshot is large — stored in JSONL too, since the site owner may want to
    // re-view it locally. For production-at-scale you'd offload this to blob storage.
    screenshot: screenshot || null,
  }

  // Persist (never blocks the user)
  await appendToJsonl(record)

  // Fire email async but await here so we can log failures — still wrapped in
  // try/catch inside sendNotificationEmail so it can't throw.
  await sendNotificationEmail({
    id,
    category: record.category,
    comment: record.comment,
    pageUrl: record.pageUrl,
    email: record.email || undefined,
    userAgent,
    ipAddress,
    screenshot,
    consoleLogs: record.consoleLogs,
  })

  return NextResponse.json({ id, ok: true }, { status: 201 })
}
