'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Send, User, CheckCircle2, AlertCircle } from 'lucide-react'
import { submitComment } from '@/lib/actions'
import { useSession } from 'next-auth/react'

export default function CommentSection({ careerId, courseId }: { careerId?: string, courseId?: string }) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<any[]>([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchComments()
  }, [careerId, courseId])

  async function fetchComments() {
    setLoading(true)
    try {
      const res = await fetch(`/api/comments?${careerId ? `careerId=${careerId}` : `courseId=${courseId}`}`)
      const data = await res.json()
      if (Array.isArray(data)) setComments(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!session || !trimmed || submitting) return

    setSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const res = await submitComment({ text: trimmed, careerId, courseId })
      if (res.success) {
        setText('')
        setSuccessMessage("Your comment has been posted successfully!")
        fetchComments()
        setTimeout(() => setSuccessMessage(''), 6000)
      } else {
        setErrorMessage(res.error || "Failed to post comment. Please try again.")
      }
    } catch (err) {
      console.error(err)
      setErrorMessage("Something went wrong while posting your comment. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ marginTop: '4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <MessageSquare size={24} style={{ color: 'var(--primary)' }} />
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)' }}>Discussion</h2>
      </div>

      {session ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '3rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <textarea 
              placeholder="Join the conversation..."
              value={text}
              onChange={e => {
                setText(e.target.value)
                if (errorMessage) setErrorMessage('')
              }}
              className="form-control"
              disabled={submitting}
              style={{ 
                minHeight: '100px', fontSize: '0.95rem', resize: 'vertical'
              }}
            />

            {successMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#10b981',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={16} />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="submit" 
                disabled={submitting || !text.trim()}
                className="btn-primary" 
                style={{ 
                  padding: '0.6rem 2rem', 
                  fontSize: '0.9rem', 
                  opacity: (submitting || !text.trim()) ? 0.7 : 1,
                  cursor: (submitting || !text.trim()) ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  minWidth: '150px',
                  justifyContent: 'center'
                }}
              >
                {submitting ? 'Posting...' : 'Post Comment'} 
                <Send size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Please sign in to join the discussion.</p>
          <a href="/form" className="btn-secondary" style={{ display: 'inline-block', padding: '0.6rem 2rem' }}>Sign In</a>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment, i) => (
            <div key={comment.id || i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: 'var(--bg-offset)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--primary)', flexShrink: 0
              }}>
                <User size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  {comment.user?.name || "Anonymous User"}
                </p>
                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5', wordBreak: 'break-word' }}>
                  {comment.text}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  )
}
