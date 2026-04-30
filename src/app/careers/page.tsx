'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Bookmark, 
  TrendingUp, 
  Target,
  ArrowRight,
  Zap
} from 'lucide-react'
import Link from 'next/link'

const streams = ['Science_PCM', 'Science_PCB', 'Commerce', 'Arts', 'Any']
const sectors = ['Tech', 'Healthcare', 'Business', 'Creative', 'Education', 'Law', 'Engineering', 'Other']
const salaryRanges = ['Under ₹5L', '₹5L—₹15L', '₹15L—₹50L', '₹50L+']

export default function BrowseCareersPage() {
  const [careers, setCareers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterBy, setFilterBy] = useState('None')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('Salary')
  const [searchQuery, setSearchQuery] = useState('')
  const [bookmarkedCareers, setBookmarkedCareers] = useState<string[]>([])

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/careers')
        const data = await res.json()
        if (Array.isArray(data)) {
          setCareers(data)
        } else {
          console.error("API returned non-array data:", data)
          setCareers([])
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    
    const fetchBookmarks = async () => {
      try {
        const res = await fetch('/api/user/bookmarks')
        const data = await res.json()
        if (data.bookmarks) {
          setBookmarkedCareers(data.bookmarks)
        }
      } catch (e) {
        console.error("Error fetching bookmarks:", e)
      }
    }

    fetchCareers()
    fetchBookmarks()
  }, [])

  const toggleBookmark = async (careerId: string) => {
    const isBookmarked = bookmarkedCareers.includes(careerId)
    const action = isBookmarked ? 'remove' : 'add'
    
    // Optimistic update
    setBookmarkedCareers(prev => 
      isBookmarked ? prev.filter(id => id !== careerId) : [...prev, careerId]
    )

    try {
      await fetch('/api/user/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerId, action })
      })
    } catch (e) {
      console.error(e)
      // Revert if failed
      setBookmarkedCareers(prev => 
        isBookmarked ? [...prev, careerId] : prev.filter(id => id !== careerId)
      )
    }
  }

  // Filtering & Sorting Logic
  const filteredCareers = careers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filterBy === 'Stream' && activeFilter) return matchesSearch && c.stream === activeFilter
    if (filterBy === 'Sector' && activeFilter) return matchesSearch && c.sector === activeFilter
    if (filterBy === 'Salary' && activeFilter) {
      if (activeFilter === 'Under ₹5L') return matchesSearch && c.salaryRangeMax < 5
      if (activeFilter === '₹5L—₹15L') return matchesSearch && c.salaryRangeMax >= 5 && c.salaryRangeMin <= 15
      if (activeFilter === '₹15L—₹50L') return matchesSearch && c.salaryRangeMax >= 15 && c.salaryRangeMin <= 50
      if (activeFilter === '₹50L+') return matchesSearch && c.salaryRangeMax >= 50
    }
    
    return matchesSearch
  }).sort((a, b) => {
    if (sortBy === 'Salary') return b.salaryRangeMax - a.salaryRangeMax
    if (sortBy === 'Demand') return b.demand - a.demand
    if (sortBy === 'Growth') return b.growth - a.growth
    if (sortBy === 'Difficulty') return a.difficulty - b.difficulty
    return 0
  })

  return (
    <div className="main-content">
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>
          Explore Careers
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
          Browse 1,270+ careers and find your perfect path.
        </p>
      </div>

      {/* Filters Section */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem', background: 'var(--bg-offset)', maxWidth: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
          
          {/* Search */}
          <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search careers by name or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '1rem 1rem 1rem 3.5rem', 
                borderRadius: '16px', 
                border: '1px solid var(--border)',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Filter Type */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem' }}>FILTER BY:</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['None', 'Stream', 'Sector', 'Salary'].map(f => (
                <button
                  key={f}
                  onClick={() => { setFilterBy(f); setActiveFilter(null); }}
                  style={{ 
                    padding: '0.6rem 1.2rem', 
                    borderRadius: '99px', 
                    border: '1px solid',
                    borderColor: filterBy === f ? 'var(--primary)' : 'var(--border)',
                    background: filterBy === f ? 'var(--primary)' : '#fff',
                    color: filterBy === f ? '#fff' : 'var(--text-main)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem' }}>SORT BY:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ 
                padding: '0.6rem 1.2rem', 
                borderRadius: '99px', 
                border: '1px solid var(--border)',
                fontWeight: '600',
                fontSize: '0.85rem'
              }}
            >
              <option>Salary</option>
              <option>Demand</option>
              <option>Growth</option>
              <option>Difficulty</option>
            </select>
          </div>
        </div>

        {/* Sub-filters (Dynamic) */}
        <AnimatePresence>
          {filterBy !== 'None' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ marginTop: '2rem', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', gap: '0.75rem', borderTop: '1px solid var(--border)', paddingTop: '2rem', paddingBottom: '0.5rem' }}
            >
              {(filterBy === 'Stream' ? streams : filterBy === 'Sector' ? sectors : salaryRanges).map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveFilter(sub)}
                  style={{ 
                    padding: '0.5rem 1.2rem', 
                    borderRadius: '99px', 
                    border: '1px solid',
                    borderColor: activeFilter === sub ? 'var(--accent)' : 'var(--border)',
                    background: activeFilter === sub ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
                    color: activeFilter === sub ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {sub}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Careers Grid */}
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
        {loading ? (
          <p>Loading careers...</p>
        ) : filteredCareers.map((career, idx) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel"
            style={{ 
              padding: '2rem', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <span style={{ 
                  background: 'rgba(30, 58, 95, 0.08)', 
                  color: 'var(--primary)', 
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '8px', 
                  fontSize: '0.75rem', 
                  fontWeight: '700' 
                }}>
                  {career.stream}
                </span>
                <button 
                  onClick={() => toggleBookmark(career.id)}
                  style={{ background: 'none', border: 'none', color: bookmarkedCareers.includes(career.id) ? 'var(--accent)' : 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <Bookmark size={20} fill={bookmarkedCareers.includes(career.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>
                {career.name}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', minHeight: '3rem' }}>
                {career.description.substring(0, 100)}...
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontWeight: '700', fontSize: '0.85rem' }}>
                  <TrendingUp size={16} style={{ color: 'var(--success)' }} /> ₹{career.salaryRangeMax}L+
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontWeight: '700', fontSize: '0.85rem' }}>
                  <Zap size={16} style={{ color: 'var(--accent)' }} /> {career.demand}/10 Demand
                </div>
              </div>
            </div>

            <Link href={`/career/${career.slug || career.id}`} className="btn-secondary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}>
              View Details <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
