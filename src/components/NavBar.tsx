'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import SearchBar from './SearchBar'

const links = [
  { href: '/', label: 'Home' },
  { href: '/predictor', label: 'Career Predictor' },
  { href: '/results', label: 'My Matches' },
  { href: '/questions', label: 'Q&A' },
  { href: '/about', label: 'About Us' },
]

export default function NavBar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', letterSpacing: '0.5px' }}>12kebaad</span>
        </Link>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <SearchBar />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/update-profile" style={{ color: 'var(--text-main)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {session.user?.name?.charAt(0)}
                </div>
                <span className="hide-mobile">{session.user?.name?.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', cursor: 'pointer', padding: '0.4rem' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/form" className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.82rem', textDecoration: 'none' }}>
              Sign In
            </Link>
          )}
        </div>
      </div>
      <div className="nav-scroll-wrapper">
        <div className="nav-links">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${pathname === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
