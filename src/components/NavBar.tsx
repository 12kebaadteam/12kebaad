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
  { href: '/colleges', label: 'Top Colleges' },
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
  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar-container">
        <div className="navbar-top">
          {/* Logo - Left Aligned */}
          <Link href="/" className="logo" id="navbar-logo" style={{ flexShrink: 0 }}>
            <img src="/logo.png" alt="12kebaad Logo" className="logo-img" />
            <span className="logo-text">12kebaad</span>
          </Link>

          {/* Desktop Nav Links - Center (Hidden on mobile) */}
          <div className="nav-desktop-links">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link href={session ? "/quiz-intro" : "/form"} className={`nav-link ${pathname === '/quiz-intro' ? 'active' : ''}`}>Career Quiz</Link>
            <Link href={session ? "/careers" : "/form"} className={`nav-link ${pathname === '/careers' ? 'active' : ''}`}>Browse Careers</Link>
            <Link href="/colleges" className={`nav-link ${pathname === '/colleges' ? 'active' : ''}`}>Top Colleges</Link>
            <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
          </div>

          {/* Right Side - Search + Auth */}
          <div className="nav-right" style={{ flexShrink: 0 }}>
            <div className="hide-mobile">
              <SearchBar />
            </div>
            
            {session ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/results" className="nav-avatar-link" style={{ textDecoration: 'none' }}>
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
              <Link href="/form" className="nav-signin-btn">
                Start Now →
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Scrollable Links */}
        <div className="nav-mobile-scrollable">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link href={session ? "/quiz-intro" : "/form"} className={`nav-link ${pathname === '/quiz-intro' ? 'active' : ''}`}>Career Quiz</Link>
          <Link href={session ? "/careers" : "/form"} className={`nav-link ${pathname === '/careers' ? 'active' : ''}`}>Browse Careers</Link>
          <Link href="/colleges" className={`nav-link ${pathname === '/colleges' ? 'active' : ''}`}>Colleges</Link>
          <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link href="/search" className={`nav-link ${pathname === '/search' ? 'active' : ''}`}>Search</Link>
        </div>
      </div>

      <style jsx>{`
        .navbar--scrolled {
          box-shadow: var(--shadow-md);
          background: rgba(255, 255, 255, 0.95);
        }
        .navbar-container {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .navbar-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 3%;
          height: 72px;
          width: 100%;
        }
        .nav-desktop-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          flex: 1;
          justify-content: center;
        }
        .nav-mobile-scrollable {
          display: none;
        }
        
        @media (max-width: 1024px) {
          .nav-desktop-links {
            display: none;
          }
          .navbar-top {
            height: 64px;
            padding: 0 1rem;
          }
          .nav-mobile-scrollable {
            display: flex;
            overflow-x: auto;
            white-space: nowrap;
            padding: 0.5rem 1rem 0.5rem 1rem;
            gap: 1rem;
            -webkit-overflow-scrolling: touch;
            border-top: 1px solid var(--glass-border);
          }
          .nav-mobile-scrollable::-webkit-scrollbar {
            display: none;
          }
          .nav-mobile-scrollable {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        }
      `}</style>
    </nav>
  )
}
