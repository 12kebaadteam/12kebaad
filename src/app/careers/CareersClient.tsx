'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bookmark, 
  TrendingUp, 
  ArrowRight, 
  Zap 
} from 'lucide-react'
import Link from 'next/link'

const streams = ['Science_PCM', 'Science_PCB', 'Commerce', 'Arts', 'Any']
const sectors = ['Tech', 'Healthcare', 'Business', 'Creative', 'Education', 'Law', 'Engineering', 'Other']
const salaryRanges = ['Under ₹5L', '₹5L—₹15L', '₹15L—₹50L', '₹50L+']

export default function CareersClient({ initialCareers = [] }: { initialCareers?: any[] }) {
  const [careers, setCareers] = useState<any[]>(initialCareers)
  const [loading, setLoading] = useState(initialCareers.length === 0)
  const [filterBy, setFilterBy] = useState('None')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('Salary')
  const [searchQuery, setSearchQuery] = useState('')
  const [bookmarkedCareers, setBookmarkedCareers] = useState<string[]>([])

  useEffect(() => {
    if (initialCareers.length === 0) {
      const fetchCareers = async () => {
        setLoading(true)
        try {
          const res = await fetch('/api/careers')
          const data = await res.json()
          if (Array.isArray(data)) {
            setCareers(data)
          } else {
            setCareers([])
          }
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
      fetchCareers()
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

    fetchBookmarks()
  }, [initialCareers])

  const toggleBookmark = async (careerId: string) => {
    const isBookmarked = bookmarkedCareers.includes(careerId)
    const action = isBookmarked ? 'remove' : 'add'
    
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
      setBookmarkedCareers(prev => 
        isBookmarked ? [...prev, careerId] : prev.filter(id => id !== careerId)
      )
    }
  }

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
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem', lineHeight: '1.2' }}>
          Explore Career Roadmaps
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>
          Detailed salary insights, eligibility, required entrance exams, and college pathways for {careers.length}+ careers after Class 12.
        </p>
      </div>

      {/* Filters Section */}
      <div className="glass-panel career-filters-panel">
        <div className="career-filters-container">
          
          {/* Search */}
          <div className="career-search-box">
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search careers by name or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="career-search-input"
            />
          </div>

          {/* Filter Type */}
          <div className="career-filter-group">
            <span className="career-filter-label">FILTER BY:</span>
            <div className="career-filter-buttons">
              {['None', 'Stream', 'Sector', 'Salary'].map(f => (
                <button
                  key={f}
                  onClick={() => { setFilterBy(f); setActiveFilter(null); }}
                  className={`career-filter-btn ${filterBy === f ? 'active' : ''}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="career-sort-group">
            <span className="career-filter-label">SORT BY:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="career-sort-select"
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
              className="career-subfilters-row"
            >
              {(filterBy === 'Stream' ? streams : filterBy === 'Sector' ? sectors : salaryRanges).map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveFilter(sub)}
                  className={`career-subfilter-btn ${activeFilter === sub ? 'active' : ''}`}
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
            transition={{ delay: Math.min(idx * 0.02, 0.5) }}
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
                  aria-label={`Bookmark ${career.name}`}
                >
                  <Bookmark size={20} fill={bookmarkedCareers.includes(career.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.75rem' }}>
                {career.name}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem', minHeight: '3rem' }}>
                {career.description.substring(0, 110)}...
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontWeight: '700', fontSize: '0.85rem' }}>
                  <TrendingUp size={16} style={{ color: 'var(--success)' }} /> ₹{career.salaryRangeMax}L+ Max
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontWeight: '700', fontSize: '0.85rem' }}>
                  <Zap size={16} style={{ color: 'var(--accent)' }} /> {career.demand}/10 Demand
                </div>
              </div>
            </div>

            <Link href={`/career/${career.slug || career.id}`} className="btn-secondary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', textAlign: 'center' }}>
              View Career Roadmap <ArrowRight size={16} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
