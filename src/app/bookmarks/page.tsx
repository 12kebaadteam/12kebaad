'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, ChevronRight, TrendingUp, Target, Map } from 'lucide-react'
import Link from 'next/link'

export default function BookmarksPage() {
  const [bookmarked, setBookmarked] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarks = async () => {
      const saved = JSON.parse(localStorage.getItem('bookmarked_careers') || '[]')
      if (saved.length === 0) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch('/api/careers/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: saved })
        })
        const data = await res.json()
        setBookmarked(data)
      } catch (error) {
        console.error('Failed to fetch bookmarks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()
  }, [])

  const removeBookmark = (id: string) => {
    const updated = bookmarked.filter(c => c.id !== id)
    setBookmarked(updated)
    const savedIds = updated.map(c => c.id)
    localStorage.setItem('bookmarked_careers', JSON.stringify(savedIds))
  }

  return (
    <>
      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>My Saved Careers</h1>
          <p style={{ color: 'var(--text-muted)' }}>Your shortlisted paths for future reference.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading...</div>
        ) : bookmarked.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <Bookmark size={48} color="var(--border)" style={{ marginBottom: '1rem' }} />
            <h3>No bookmarks yet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You haven't saved any careers. Take the quiz to get started!</p>
            <Link href="/quiz-intro" className="btn-primary">Take Career Quiz</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {bookmarked.map((career, idx) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel"
                style={{ padding: '0', overflow: 'hidden' }}
              >
                <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>
                        {career.name}
                      </h2>
                    </div>
                    
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {career.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <Target size={18} />
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{career.sector}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Stream: {career.stream}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-offset)', padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>SALARY RANGE</p>
                    <p style={{ fontWeight: '700', color: 'var(--primary)' }}>₹{career.salaryRangeMin}L - ₹{career.salaryRangeMax}L /yr</p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button onClick={() => removeBookmark(career.id)} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '10px', color: '#ef4444', borderColor: '#ef4444' }}>
                      <Bookmark size={18} fill="currentColor" />
                    </button>
                    <Link href={`/career/${career.slug || career.id}`} className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                      View Roadmap <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
