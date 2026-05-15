import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Marketing-site contact form. Persist submissions as JSONL and notify
// dispatch via Resend if configured. Mirrors the feedback route pattern.

export const runtime = 'nodejs'

type ContactPayload = {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
  pageUrl?: string
}

const LOG_DIR = path.join(process.cwd(), 'logs', 'contact')

const SERVICE_LABEL: Record<string, string> = {
  light: 'Light Duty Towing',
  heavy: 'Heavy Duty Towing',
  flatbed: 'Flatbed Towing',
  accident: 'Accident Recovery',
  rv: 'RV Towing',
  equipment: 'Equipment Towing',
  hauling: 'Auto Car Hauling',
  float: 'Float Towing',
  transport: 'Cross-Country Transport',
  storage: 'Storage & Warehousing',
}

async function appendToJsonl(record: Record<string, unknown>) {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true })
    const day = new Date().toISOString().slice(0, 10)
    const file = path.join(LOG_DIR, `${day}.jsonl`)
    await fs.appendFile(file, JSON.stringify(record) + '\n', 'utf8')
  } catch (err) {
    console.error('[contact] failed to write JSONL', err)
  }
}

async function sendNotificationEmail(record: {
  id: string
  name: string
  phone: string
  email: string
  serviceLabel: string
  message: string
  pageUrl: string
  userAgent: string
  ipAddress: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const to =
    process.env.CONTACT_EMAIL_TO ||
    process.env.EMAIL_TO ||
    'datowingstorage@gmail.com'
  const from = process.env.EMAIL_FROM || 'D&A Towing <onboarding@resend.dev>'

  if (!apiKey) {
    console.info('[contact] email skipped — RESEND_API_KEY not set')
    return
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from,
      to,
      replyTo: record.email || undefined,
      subject: `[D&A Towing] Quote request — ${record.serviceLabel || 'General'}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background:#070B14; color:#FAF8F0;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background: linear-gradient(135deg,#F5C842,#D4A017,#B8860B); color: #070B14; font-weight: bold; padding: 8px 14px; border-radius: 8px; font-size: 14px;">D&A Towing</div>
          </div>
          <h2 style="color: #F5C842; margin: 0 0 16px;">New quote request</h2>
          <table style="width:100%;border-collapse:collapse;color:#CBD5E1;font-size:14px;">
            <tr><td style="padding:6px 0;color:#94A3B8;width:120px;">Name</td><td style="padding:6px 0;"><strong style="color:#FAF8F0;">${escapeHtml(record.name)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#94A3B8;">Phone</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(record.phone)}" style="color:#F5C842;text-decoration:none;">${escapeHtml(record.phone)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#94A3B8;">Email</td><td style="padding:6px 0;">${record.email ? `<a href="mailto:${escapeHtml(record.email)}" style="color:#F5C842;text-decoration:none;">${escapeHtml(record.email)}</a>` : '<em style="color:#64748B;">not provided</em>'}</td></tr>
            <tr><td style="padding:6px 0;color:#94A3B8;">Service</td><td style="padding:6px 0;"><strong style="color:#FAF8F0;">${escapeHtml(record.serviceLabel)}</strong></td></tr>
          </table>
          <div style="background: #151D35; border: 1px solid #243054; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <div style="color:#94A3B8;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</div>
            <p style="color: #FAF8F0; margin: 0; white-space: pre-wrap;">${escapeHtml(record.message) || '<em style="color:#64748B;">(none)</em>'}</p>
          </div>
          <p style="color:#94A3B8;font-size:11px;margin-top:24px;">
            Page: ${escapeHtml(record.pageUrl || 'N/A')}<br>
            IP: ${escapeHtml(record.ipAddress)} &middot; UA: ${escapeHtml(record.userAgent.slice(0, 120))}<br>
            Request ID: ${record.id}
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('[contact] email send failed', err)
  }
}

function escapeHtml(s: string): string {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  let payload: ContactPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = payload.name?.trim() || ''
  const phone = payload.phone?.trim() || ''
  const email = payload.email?.trim() || ''
  const service = payload.service?.trim() || ''
  const message = payload.message?.trim() || ''
  const pageUrl = payload.pageUrl || ''

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!phone) {
    return NextResponse.json({ error: 'Phone is required' }, { status: 400 })
  }
  if (!service) {
    return NextResponse.json({ error: 'Service is required' }, { status: 400 })
  }

  // Trivial honeypot-style size guard
  if (message.length > 5000 || name.length > 200 || phone.length > 60) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 400 })
  }

  const id = `ct_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const userAgent = req.headers.get('user-agent') || 'unknown'
  const serviceLabel = SERVICE_LABEL[service] || service

  const record = {
    id,
    createdAt: new Date().toISOString(),
    name,
    phone,
    email: email || null,
    service,
    serviceLabel,
    message,
    pageUrl,
    userAgent,
    ipAddress,
  }

  await appendToJsonl(record)

  await sendNotificationEmail({
    id,
    name,
    phone,
    email,
    serviceLabel,
    message,
    pageUrl,
    userAgent,
    ipAddress,
  })

  return NextResponse.json({ id, ok: true }, { status: 201 })
}
