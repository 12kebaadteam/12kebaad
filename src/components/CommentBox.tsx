"use client";

import { useState } from "react";

export default function CommentBox({ targetId, type }: { targetId: string, type: 'course' | 'career' }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const payload = {
        text: trimmed,
        targetId,
        type,
        ...(type === 'course' ? { courseId: targetId } : { careerId: targetId })
      };

      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus('success');
        setText('');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || 'Failed to submit comment. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem' }}>
      <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Leave a Comment</h3>
      
      {status === 'success' ? (
        <div style={{
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.3)',
          color: '#10b981',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          ✓ Your comment has been posted successfully and is now visible.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
             ⚠️ <strong style={{ color: 'var(--accent)' }}>Note:</strong> Be respectful and helpful to fellow students.
          </p>
          <textarea
            value={text}
            onChange={e => {
              setText(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            className="form-control"
            placeholder="Share your thoughts or experiences here..."
            required
            rows={3}
            disabled={status === 'submitting'}
            style={{ resize: 'vertical' }}
          />
          {status === 'error' && (
            <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>
              {errorMessage || 'Failed to submit comment. Please try again.'}
            </p>
          )}
          <button 
            type="submit" 
            disabled={status === 'submitting' || !text.trim()} 
            className="btn-primary" 
            style={{ 
              alignSelf: 'flex-start',
              opacity: (status === 'submitting' || !text.trim()) ? 0.7 : 1,
              cursor: (status === 'submitting' || !text.trim()) ? 'not-allowed' : 'pointer',
              minWidth: '130px'
            }}
          >
            {status === 'submitting' ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}
    </div>
  )
}
