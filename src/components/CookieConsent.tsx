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
    <div className="glass-panel cookie-consent-panel animate-slide-up">
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>🍪</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '0.95rem', fontWeight: '700' }}>
            Cookie Preference
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
            We use cookies to improve your experience and remember your preferences (like your selected state for course guidance). By continuing to browse, you agree to our use of cookies.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
        <button 
          onClick={accept} 
          className="btn-primary" 
          style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem', minHeight: '36px' }}
        >
          Got it!
        </button>
      </div>
    </div>
  )
}
