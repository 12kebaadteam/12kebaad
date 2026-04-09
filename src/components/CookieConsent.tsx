'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div 
      className="glass-panel animate-slide-up" 
      style={{ 
        position: 'fixed', 
        bottom: '2rem', 
        left: '2rem', 
        right: '2rem', 
        maxWidth: '500px', 
        zIndex: 1000,
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem'
      }}
    >
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '1.5rem' }}>🍪</div>
        <div>
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.3rem' }}>Cookie Preference</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            We use cookies to improve your experience and remember your preferences (like your selected state for course guidance). 
            By continuing to browse, you agree to our use of cookies.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button 
          onClick={accept} 
          className="btn-primary" 
          style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
        >
          Got it!
        </button>
      </div>
    </div>
  )
}
