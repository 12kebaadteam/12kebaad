'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react'
import { submitFeedback } from '@/lib/actions'

export default function FeedbackSection({ careerId }: { careerId?: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPositive, setIsPositive] = useState<boolean | null>(null)
  const [reason, setReason] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isPositive === null) return
    
    setLoading(true)
    try {
      const res = await submitFeedback({ isPositive, reason, careerId })
      if (res.success) {
        setSubmitted(true)
      } else {
        alert(res.error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: 'var(--success-light)' }}>
        <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Thank you for your feedback!</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We use your input to improve our career recommendations.</p>
      </div>
    )
  }

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--primary)' }}>
        Was this helpful?
      </h3>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setIsPositive(true)}
          style={{ 
            flex: 1, padding: '1rem', borderRadius: '12px', border: '2px solid',
            borderColor: isPositive === true ? 'var(--success)' : 'var(--border)',
            background: isPositive === true ? 'var(--success-badge-bg)' : 'var(--bg-card)',
            color: isPositive === true ? 'var(--success)' : 'var(--text-main)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600'
          }}
        >
          <ThumbsUp size={20} color={isPositive === true ? 'var(--success)' : 'var(--text-muted)'} />
          Yes
        </button>
        <button 
          onClick={() => setIsPositive(false)}
          style={{ 
            flex: 1, padding: '1rem', borderRadius: '12px', border: '2px solid',
            borderColor: isPositive === false ? 'var(--accent)' : 'var(--border)',
            background: isPositive === false ? 'var(--accent-badge-bg)' : 'var(--bg-card)',
            color: isPositive === false ? 'var(--accent)' : 'var(--text-main)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600'
          }}
        >
          <ThumbsDown size={20} color={isPositive === false ? 'var(--accent)' : 'var(--text-muted)'} />
          No
        </button>
      </div>

      {isPositive !== null && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea 
            placeholder="Tell us why... (optional)"
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="form-control"
            style={{ 
              minHeight: '100px', fontSize: '0.95rem', resize: 'vertical'
            }}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ width: '100%', padding: '0.8rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'} <Send size={16} style={{ marginLeft: '8px' }} />
          </button>
        </form>
      )}
    </div>
  )
}
