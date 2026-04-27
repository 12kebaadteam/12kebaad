'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
    setFocused(false)
    inputRef.current?.blur()
  }

  return (
    <div ref={ref} className="search-wrapper">
      <form onSubmit={handleSearch} className={`search-form${focused ? ' search-form--active' : ''}`}>
        <SearchIcon className="search-icon" size={18} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search..."
          className="search-field"
          aria-label="Search"
        />
        {query && (
          <button type="button" className="search-clear" onClick={() => { setQuery(''); inputRef.current?.focus() }}>
            <X size={14} />
          </button>
        )}
      </form>
    </div>
  )
}
