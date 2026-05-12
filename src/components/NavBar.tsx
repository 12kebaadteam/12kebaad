'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, Search } from 'lucide-react'
import SearchBar from './SearchBar'

export default function NavBar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Update scrolled state for background change
      setScrolled(currentScrollY > 20)

      // Only apply hide/show logic on mobile (width <= 1024px)
      if (window.innerWidth <= 1024) {
        if (currentScrollY < 10) {
          setVisible(true)
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and past threshold
          setVisible(false)
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setVisible(true)
        }
      } else {
        // Always visible on desktop
        setVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: session ? "/quiz-intro" : "/form", label: 'Career Quiz' },
    { href: session ? "/careers" : "/form", label: 'Browse Careers' },
    { href: "/colleges", label: 'Top Colleges' },
    { href: "/entrance-tests", label: 'Exams' },
    { href: "/compare-careers", label: 'Compare' },
    { href: "/bookmarks", label: 'Bookmarks' },
    { href: "/about", label: 'About' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${!visible ? 'navbar--hidden' : ''}`}>
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
                <Link href="/results" className="nav-avatar">
                  {session.user?.name?.charAt(0)}
                </Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="nav-logout-btn" title="Logout">
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

        <div className="nav-mobile-scrollable">
          <div className="mobile-search-wrapper">
            <SearchBar />
          </div>
          {navLinks.map((link) => (
            <Link 
              key={`mobile-${link.href}`} 
              href={link.href} 
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
