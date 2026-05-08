'use client'

import { useState } from 'react'
import { X, PaperPlaneTilt, Bug, Lightbulb, Question } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'

const CATEGORIES = [
  { value: 'bug', label: 'Bug', icon: Bug },
  { value: 'suggestion', label: 'Suggestion', icon: Lightbulb },
  { value: 'question', label: 'Question', icon: Question },
] as const

type LogEntry = {
  level: string
  message: string
  timestamp: string
}

interface FeedbackModalProps {
  screenshot: string | null
  consoleLogs: LogEntry[]
  onClose: () => void
}

export function FeedbackModal({ screenshot, consoleLogs, onClose }: FeedbackModalProps) {
  const pathname = usePathname()
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('bug')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!comment.trim()) return
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment,
          email: email.trim() || undefined,
          screenshot,
          consoleLogs,
          pageUrl: window.location.href,
          category,
        }),
      })
      if (res.ok) {
        setSent(true)
        setTimeout(onClose, 1500)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setSending(false)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-dark-800 border border-dark-500 rounded-xl shadow-2xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-600">
          <h2 className="text-cream font-semibold text-base">
            Send <span className="text-gradient-gold">Feedback</span>
          </h2>
          <button
            onClick={onClose}
            className="text-steel hover:text-cream transition-colors"
            aria-label="Close"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {sent ? (
            <div className="text-center py-8">
              <div className="text-gradient-gold text-lg font-semibold mb-1">Thanks!</div>
              <div className="text-steel text-sm">Your feedback has been submitted.</div>
            </div>
          ) : (
            <>
              {/* Screenshot preview */}
              {screenshot && (
                <div className="rounded-lg overflow-hidden border border-dark-500">
                  <img
                    src={screenshot}
                    alt="Screenshot"
                    className="w-full h-40 object-cover object-top"
                  />
                </div>
              )}

              {/* Category selector */}
              <div className="flex gap-2">
                {CATEGORIES.map(({ value, label, icon: Icon }) => {
                  const active = category === value
                  return (
                    <button
                      key={value}
                      onClick={() => setCategory(value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors border ${
                        active
                          ? 'bg-gold/10 text-gold-light border-gold/40'
                          : 'text-steel border-dark-500 hover:border-dark-500/80 hover:text-steel-light'
                      }`}
                    >
                      <Icon size={14} weight={active ? 'fill' : 'regular'} />
                      {label}
                    </button>
                  )
                })}
              </div>

              {/* Comment */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe what happened or what you'd like to see..."
                className="w-full h-28 bg-dark-700 border border-dark-500 rounded-lg px-3 py-2.5 text-sm text-cream placeholder-steel/60 focus:outline-none focus:border-gold/60 resize-none"
                autoFocus
              />

              {/* Optional email (no auth on this site) */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email (optional — so we can reply)"
                className="w-full bg-dark-700 border border-dark-500 rounded-lg px-3 py-2 text-sm text-cream placeholder-steel/60 focus:outline-none focus:border-gold/60"
              />

              {/* Page context */}
              <div className="text-steel/70 text-xs">
                Page: {pathname}
              </div>

              {error && (
                <div className="text-red-400 text-xs">{error}</div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!sent && (
          <div className="flex justify-end gap-3 px-5 py-4 border-t border-dark-600">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-steel hover:text-cream transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!comment.trim() || sending}
              className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light disabled:opacity-50 text-midnight text-sm font-semibold rounded-lg transition-colors"
            >
              <PaperPlaneTilt size={14} weight="fill" />
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
