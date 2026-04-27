'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, LogOut, User } from 'lucide-react'
import SearchBar from './SearchBar'

const links = [
  { href: '/', label: 'Home' },
  { href: '/quiz-intro', label: 'Career Quiz' },
  { href: '/careers', label: 'Browse Careers' },
  { href: '/about', label: 'About' },
]

export default function NavBar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar-top" style={{ gap: '2rem' }}>
        {/* Logo - Left Aligned */}
        <Link href="/" className="logo" id="navbar-logo" style={{ flexShrink: 0 }}>
          <img src="/logo.png" alt="12kebaad Logo" className="logo-img" />
          <span className="logo-text">12kebaad</span>
        </Link>

        {/* Desktop Nav Links - Center */}
        <div className="nav-desktop-links" style={{ flex: 1, justifyContent: 'center' }}>
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link href={session ? "/quiz-intro" : "/form"} className={`nav-link ${pathname === '/quiz-intro' ? 'active' : ''}`}>Career Quiz</Link>
          <Link href={session ? "/careers" : "/form"} className={`nav-link ${pathname === '/careers' ? 'active' : ''}`}>Browse Careers</Link>
          <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
        </div>

        {/* Right Side - Search + Auth */}
        <div className="nav-right" style={{ flexShrink: 0, overflow: 'hidden' }}>
          <div className="hide-mobile">
            <SearchBar />
          </div>
          
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/update-profile" className="nav-avatar-link" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  width: '40px', height: '40px', 
                  borderRadius: '12px', 
                  background: 'var(--primary)', 
                  color: '#fff', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', fontSize: '1rem',
                  boxShadow: '0 4px 10px rgba(30, 58, 95, 0.2)'
                }}>
                  {session.user?.name?.charAt(0)}
                </div>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  border: 'none', 
                  color: '#ef4444', 
                  cursor: 'pointer',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/form" className="nav-signin-btn" style={{ padding: '0.7rem 1.5rem', borderRadius: '12px' }}>
              Start Now →
            </Link>
          )}
          
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="logo-text">12kebaad</span>
              <button 
                onClick={() => setMobileOpen(false)} 
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.5rem' }}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <SearchBar />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="/" className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
              <Link href={session ? "/quiz-intro" : "/form"} className={`mobile-nav-link ${pathname === '/quiz-intro' ? 'active' : ''}`}>Career Quiz</Link>
              <Link href={session ? "/careers" : "/form"} className={`mobile-nav-link ${pathname === '/careers' ? 'active' : ''}`}>Browse Careers</Link>
              <Link href="/about" className={`mobile-nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
              {session && (
                <>
                  <Link href="/results" className="mobile-nav-link">My Matches</Link>
                  <Link href="/questions" className="mobile-nav-link">Q&A</Link>
                  <Link href="/update-profile" className="mobile-nav-link">My Profile</Link>
                </>
              )}
            </div>

            <div style={{ marginTop: 'auto' }}>
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-secondary"
                  style={{ width: '100%' }}
                >
                  Logout
                </button>
              ) : (
                <Link href="/form" className="btn-primary" style={{ width: '100%' }}>
                  Sign In with Google
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar--scrolled {
          padding-top: 0;
          box-shadow: var(--shadow-md);
          background: rgba(255, 255, 255, 0.95);
        }
      `}</style>
    </nav>
  )
}
