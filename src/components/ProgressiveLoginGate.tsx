'use client'

/**
 * ProgressiveLoginGate
 *
 * Shows a full-screen, non-dismissible login prompt after a visitor has
 * engaged meaningfully with a career detail page (≥65% scroll depth OR
 * opening a second career page). Once shown it cannot be dismissed —
 * there is intentionally no close button, backdrop-click handler, or
 * Escape key binding.
 *
 * SEO note: This is a UI-only gate. The server-rendered career content is
 * returned in the initial HTML for all visitors including Googlebot.
 * The gate is appended client-side only and never hides server HTML.
 */

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import LoginButton from './LoginButton'
import Link from 'next/link'

const GATE_FIRED_KEY = '12kb_gate_fired'
const CAREER_VISITS_KEY = '12kb_career_visits'
const SCROLL_THRESHOLD = 0.65 // 65% scroll depth

export default function ProgressiveLoginGate() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const firedRef = useRef(false)
  const scrollListenerRef = useRef<(() => void) | null>(null)

  // Only active on /career/[slug] pages
  const isCareerPage = /^\/career\/[^/]+$/.test(pathname)

  useEffect(() => {
    // Skip entirely if user is authenticated or status still loading
    if (status === 'loading') return
    if (session) return
    // Skip if not on a career detail page
    if (!isCareerPage) return

    // Skip if the gate has already been shown in this session
    if (sessionStorage.getItem(GATE_FIRED_KEY) === '1') return
    if (firedRef.current) return

    // Count how many distinct career pages have been visited
    const existingVisits = JSON.parse(sessionStorage.getItem(CAREER_VISITS_KEY) || '[]') as string[]
    if (!existingVisits.includes(pathname)) {
      existingVisits.push(pathname)
      sessionStorage.setItem(CAREER_VISITS_KEY, JSON.stringify(existingVisits))
    }

    // If this is the SECOND distinct career page, fire the gate immediately
    if (existingVisits.length >= 2 && !firedRef.current) {
      firedRef.current = true
      sessionStorage.setItem(GATE_FIRED_KEY, '1')
      setVisible(true)
      return
    }

    // Otherwise set up a scroll depth listener for the first career page
    const handleScroll = () => {
      if (firedRef.current) return
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      const ratio = scrolled / total
      if (ratio >= SCROLL_THRESHOLD) {
        firedRef.current = true
        sessionStorage.setItem(GATE_FIRED_KEY, '1')
        setVisible(true)
        // Remove scroll listener immediately
        if (scrollListenerRef.current) {
          window.removeEventListener('scroll', scrollListenerRef.current)
          scrollListenerRef.current = null
        }
      }
    }

    scrollListenerRef.current = handleScroll
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup on unmount or route change
    return () => {
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current)
        scrollListenerRef.current = null
      }
    }
  }, [session, status, isCareerPage, pathname])

  // Trap Escape key — intentionally prevent dismissal
  useEffect(() => {
    if (!visible) return
    const trapEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') e.preventDefault()
    }
    window.addEventListener('keydown', trapEscape, true)
    return () => window.removeEventListener('keydown', trapEscape, true)
  }, [visible])

  // Manage focus when gate becomes visible
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (visible && headingRef.current) {
      headingRef.current.focus()
    }
  }, [visible])

  if (!visible) return null

  // Build a safe, internal-only callbackUrl
  const safeCallback = pathname.startsWith('/career/') ? pathname : '/careers'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-gate-title"
      aria-describedby="login-gate-desc"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        // Backdrop
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'gateIn 0.35s ease',
      }}
    >
      <style>{`
        @keyframes gateIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cardSlide {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        #login-gate-card { animation: cardSlide 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>

      <div
        id="login-gate-card"
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          borderTop: '4px solid var(--accent)',
          position: 'relative',
        }}
      >
        {/* Accent icon */}
        <div style={{
          width: '56px', height: '56px',
          borderRadius: '16px',
          background: 'rgba(232, 99, 10, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          fontSize: '1.5rem',
        }} aria-hidden="true">
          🗺️
        </div>

        <h2
          id="login-gate-title"
          ref={headingRef}
          tabIndex={-1}
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: 'var(--primary)',
            marginBottom: '0.6rem',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            outline: 'none',
          }}
        >
          Get your complete career roadmap
        </h2>

        <p
          id="login-gate-desc"
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}
        >
          You've discovered what this career looks like. Create a free account
          to unlock your step-by-step roadmap, salary data, and top colleges
          — matched to your stream and interests.
        </p>

        {/* Benefits */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '1.75rem',
          textAlign: 'left',
        }}>
          {[
            '✦ Personalized top-10 career matches',
            '✦ Save and compare careers across streams',
            '✦ Matched college and entrance exam guidance',
          ].map((pt, i) => (
            <div key={i} style={{
              fontSize: '0.83rem',
              color: 'var(--text-muted)',
              padding: '0.45rem 0.7rem',
              background: 'var(--bg-offset)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
            }}>
              {pt}
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <LoginButton
          callbackUrl={safeCallback}
          label="Create Free Account with Google"
        />

        {/* Secondary: already have account */}
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link
            href={`/form?callbackUrl=${encodeURIComponent(safeCallback)}`}
            style={{ color: 'var(--primary)', fontWeight: '600' }}
          >
            Sign in
          </Link>
        </p>

        {/* Legal */}
        <p style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Free forever · Google sign-in only · No spam ·{' '}
          <Link href="/privacy" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}
