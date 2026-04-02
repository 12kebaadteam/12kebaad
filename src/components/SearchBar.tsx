'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(e.target.value.length > 0) }}
          placeholder="Search courses, colleges, tests…"
          className="form-control search-input"
          style={{ width: open ? '220px' : '160px', transition: 'width 0.3s ease', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        />
        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontSize: '1.1rem', padding: '0.2rem' }}>
          🔍
        </button>
      </form>
    </div>
  )
}
