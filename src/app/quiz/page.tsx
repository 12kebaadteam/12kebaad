'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingProgress from '@/components/OnboardingProgress'
import { TrendingUp, AlertCircle, Loader2 } from 'lucide-react'

export default function QuizPage() {
  const router = useRouter()
  const [pairs, setPairs] = useState<any[][]>([])
  const [currentRound, setCurrentRound] = useState(0)
  const [selections, setSelections] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPairs = async () => {
      const stream = localStorage.getItem('onboarding_stream') || 'Any'
      const interests = localStorage.getItem('onboarding_interests') || '[]'
      const interestList = JSON.parse(interests).join(',')
      
      try {
        const res = await fetch(`/api/quiz/pairs?stream=${stream}&interests=${interestList}`)
        const data = await res.json()
        setPairs(data.pairs)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPairs()
  }, [])

  const handleSelect = (careerId: string) => {
    const newSelections = [...selections, careerId]
    setSelections(newSelections)
    
    if (currentRound < 19) {
      setCurrentRound(currentRound + 1)
    } else {
      // Quiz finished
      localStorage.setItem('quiz_selections', JSON.stringify(newSelections))
      router.push('/quiz-loading')
    }
  }

  if (loading) {
    return (
      <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={48} className="animate-spin" style={{ color: 'var(--primary)', margin: '0 auto 1rem auto' }} />
          <p style={{ color: 'var(--text-muted)' }}>Preparing your specialized quiz...</p>
        </div>
      </div>
    )
  }

  if (!pairs || pairs.length === 0) {
    return (
      <div className="main-content" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>No careers found matching your profile</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Try selecting a different stream or more interests.</p>
        <button onClick={() => router.push('/onboarding/qualification')} className="btn-primary">
          Back to Onboarding
        </button>
      </div>
    )
  }

  const [c1, c2] = pairs[currentRound]

  return (
    <div className="main-content" style={{ maxWidth: '100%' }}>
      <OnboardingProgress currentStep={5} totalSteps={20} />
      
      <div style={{ marginTop: '2rem', textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Round {currentRound + 1} of 20
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>
          Which career interests you more?
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <AnimatePresence mode="wait">
          {[c1, c2].map((career, idx) => (
            <motion.div
              key={`${currentRound}-${career.id}`}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(career.id)}
              className="glass-panel"
              style={{ 
                cursor: 'pointer', 
                padding: '3rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '400px',
                border: '2px solid transparent',
                textAlign: 'center'
              }}
            >
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                  {career.name}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {career.description.substring(0, 100)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ 
                    background: 'var(--bg-offset)', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '99px', 
                    fontSize: '0.85rem', 
                    fontWeight: '600' 
                  }}>
                    ₹{career.salaryRangeMin}L - ₹{career.salaryRangeMax}L /yr
                  </span>
                  <span style={{ 
                    background: 'rgba(232, 99, 10, 0.1)', 
                    color: 'var(--accent)',
                    padding: '0.5rem 1rem', 
                    borderRadius: '99px', 
                    fontSize: '0.85rem', 
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <TrendingUp size={16} /> High Demand
                  </span>
                </div>
              </div>
              
              <div style={{ marginTop: '3rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                  Click to select
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Don't overthink. Choose the one that feels more "you".
        </p>
      </div>
    </div>
  )
}
