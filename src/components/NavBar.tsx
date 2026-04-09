'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchBar from './SearchBar'

const links = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/professional-courses', label: 'Prof. Courses' },
  { href: '/colleges', label: 'Colleges' },
  { href: '/entrance-tests', label: 'Entrance Tests' },
  { href: '/recommendations', label: 'Recommendations' },
  { href: '/about', label: 'About' },
  { href: '/update-profile', label: 'My Profile' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link href="/" className="logo">12kebaad</Link>
        <SearchBar />
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
