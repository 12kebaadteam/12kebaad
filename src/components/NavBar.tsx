'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, Menu, X } from 'lucide-react'
import SearchBar from './SearchBar'

export default function NavBar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: session ? "/careers" : "/form", label: 'Browse Careers' },
    { href: "/colleges", label: 'Top Colleges' },
    { href: "/entrance-tests", label: 'Exams' },
    { href: "/compare-careers", label: 'Compare' },
    { href: "/bookmarks", label: 'Bookmarks' },
    { href: "/about", label: 'About' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-top">
            <Link href="/" className="logo">
              <img src="/logo.png" alt="Logo" className="logo-img" />
              <span className="logo-text">12kebaad</span>
            </Link>

            <div className="nav-desktop-links">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="nav-right">
              <div className="desktop-search-wrapper">
                <SearchBar />
              </div>
              
              {session ? (
                <div className="nav-auth-group">
                  <Link href="/results" className="nav-avatar hide-mobile">
                    {session.user?.name?.charAt(0)}
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="nav-logout-btn hide-mobile" title="Logout">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link href="/form" className="nav-signin-btn hide-mobile">
                  Start Now →
                </Link>
              )}

              <button 
                className="hamburger-btn" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-search">
            <SearchBar />
          </div>
          
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link 
                key={`mobile-${link.href}`} 
                href={link.href} 
                className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mobile-menu-footer">
            {session ? (
              <div className="mobile-auth-section">
                <Link href="/results" className="mobile-profile-link">
                  <div className="nav-avatar">{session.user?.name?.charAt(0)}</div>
                  <span>My Results</span>
                </Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="mobile-logout-btn">
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/form" className="mobile-signin-btn">
                Start Now →
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
