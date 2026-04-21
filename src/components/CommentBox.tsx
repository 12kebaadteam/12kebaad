"use client";

import { useState } from "react";

export default function CommentBox({ targetId, type }: { targetId: string, type: 'course' | 'career' }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetId, type })
      });
      if (res.ok) {
        setStatus('success');
        setText('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
      <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Leave a Comment</h3>
      
      {status === 'success' ? (
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          ✓ Your comment will be updated and visible within 24 hrs.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
             ⚠️ <strong style={{ color: 'var(--accent)' }}>Note:</strong> You cannot edit or delete your comment later.
          </p>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="form-control"
            placeholder="Share your thoughts or experiences here..."
            required
            rows={3}
            style={{ resize: 'vertical' }}
          />
          {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>Failed to submit comment. Please try again.</p>}
          <button type="submit" disabled={status === 'submitting'} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            {status === 'submitting' ? 'Submitting...' : 'Post Comment'}
          </button>
        </form>
      )}
    </div>
  )
}
