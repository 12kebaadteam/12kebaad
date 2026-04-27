'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import OnboardingProgress from '@/components/OnboardingProgress'
import { 
  TrendingUp, 
  Map, 
  Download, 
  Bookmark, 
  ChevronRight, 
  Star,
  Zap,
  Target,
  Globe
} from 'lucide-react'
import Link from 'next/link'
import { exportToPDF } from '@/lib/pdfExport'
import { useSession } from 'next-auth/react'

export default function ResultsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [results, setResults] = useState<any>(null)
  const [careers, setCareers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [bookmarked, setBookmarked] = useState<string[]>([])

  const handleExport = async () => {
    setExporting(true)
    await exportToPDF('results-report', '12kebaad-career-report.pdf')
    setExporting(false)
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('quiz_results') || 'null')
    if (!data) {
      router.push('/')
      return
    }
    setResults(data)
    
    // Load bookmarks from localStorage
    const saved = JSON.parse(localStorage.getItem('bookmarked_careers') || '[]')
    setBookmarked(saved)

    const fetchCareerDetails = async () => {
      const ids = data.recommendations.map((r: any) => r.careerId)
      try {
        const res = await fetch(`/api/careers/batch`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids })
        })
        const careerData = await res.json()
        setCareers(careerData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCareerDetails()
  }, [])

  if (loading) return null

  return (
    <div className="main-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <OnboardingProgress currentStep={7} />

      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
              Your Results Are Ready
            </p>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)' }}>
              My Top 10 Career Matches
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleExport}
              disabled={exporting}
              className="btn-secondary" 
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
            >
              <Download size={16} style={{ marginRight: '6px' }} /> 
              {exporting ? 'Generating...' : 'Download PDF'}
            </button>
            <Link href="/quiz-intro" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
              Retake Quiz
            </Link>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {results.recommendations.map((rec: any, idx: number) => {
          const career = careers.find(c => c.id === rec.careerId)
          if (!career) return null

          const isBookmarked = bookmarked.includes(career.id)
          const toggleBookmark = async () => {
            const updated = isBookmarked
              ? bookmarked.filter(id => id !== career.id)
              : [...bookmarked, career.id]
            setBookmarked(updated)
            localStorage.setItem('bookmarked_careers', JSON.stringify(updated))

            if (session?.user?.id) {
              await fetch('/api/user/bookmarks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ careerId: career.id, action: isBookmarked ? 'remove' : 'add' })
              })
            }
          }

          return (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel"
              style={{ 
                padding: '0', 
                overflow: 'hidden', 
                display: 'flex',
                flexDirection: 'column'
              }}
            >
            <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {/* Rank Badge */}
                <div style={{ 
                  width: '60px', height: '60px', 
                  background: 'var(--bg-offset)', 
                  borderRadius: '14px', 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--border)',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)' }}>RANK</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>#{idx + 1}</span>
                </div>

                <div style={{ flex: '1', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>
                      {career.name}
                    </h2>
                    <div style={{ 
                      background: 'var(--success)', 
                      color: '#fff', 
                      padding: '0.4rem 1rem', 
                      borderRadius: '99px', 
                      fontSize: '0.9rem', 
                      fontWeight: '700',
                      display: 'flex', alignItems: 'center', gap: '0.4rem'
                    }}>
                      <Zap size={16} fill="white" /> {rec.matchScore}% Match
                    </div>
                  </div>
                  
                  <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: '500', marginBottom: '1rem', lineHeight: '1.6' }}>
                    {rec.whyItFits}
                  </p>

                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <TrendingUp size={18} />
                      <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>High Growth</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <Target size={18} />
                      <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{career.sector}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Stream: {career.stream}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer / Quick Info */}
              <div style={{ 
                background: 'var(--bg-offset)', 
                padding: '1.5rem 2rem', 
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem'
              }}>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>SALARY RANGE</p>
                    <p style={{ fontWeight: '700', color: 'var(--primary)' }}>₹{career.salaryRangeMin}L - ₹{career.salaryRangeMax}L /yr</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>DIFFICULTY</p>
                    <p style={{ fontWeight: '700', color: 'var(--primary)' }}>{career.difficulty}/10</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={toggleBookmark}
                    style={{ 
                      background: isBookmarked ? 'rgba(30, 58, 95, 0.1)' : 'none', 
                      border: '1px solid var(--border)', 
                      padding: '0.5rem', borderRadius: '10px', 
                      color: isBookmarked ? 'var(--primary)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark this career'}
                  >
                    <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                  <Link href={`/career/${career.slug || career.id}`} className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                    View Roadmap <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Hidden PDF Report Template */}
      <div id="results-report" style={{ 
        position: 'absolute', left: '-9999px', top: 0,
        width: '794px', // A4 width at 96 DPI
        padding: '40px',
        background: '#fff',
        color: '#000'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1E3A5F', paddingBottom: '20px', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: '#1E3A5F', margin: 0 }}>12kebaad.in</h1>
            <p style={{ margin: 0, opacity: 0.6 }}>Personalized Career Roadmap Report</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Date: {new Date().toLocaleDateString()}</p>
            <p style={{ margin: 0 }}>Stream: {localStorage.getItem('onboarding_stream')}</p>
          </div>
        </div>

        {results.recommendations.map((rec: any, idx: number) => {
          const career = careers.find(c => c.id === rec.careerId)
          if (!career) return null
          return (
            <div key={idx} style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ margin: 0 }}>{idx + 1}. {career.name}</h3>
                <span style={{ fontWeight: 'bold', color: '#E8630A' }}>{rec.matchScore}% Match</span>
              </div>
              <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{rec.whyItFits}</p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#666' }}>
                <span>Salary: ₹{career.salaryRangeMin}L - ₹{career.salaryRangeMax}L</span>
                <span>Sector: {career.sector}</span>
              </div>
            </div>
          )
        })}

        <div style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <p style={{ margin: 0, fontSize: '12px' }}>This report was generated by 12kebaad.in - India's smartest career predictor.</p>
        </div>
      </div>
    </div>
  )
}
