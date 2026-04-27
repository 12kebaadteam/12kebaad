'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import OnboardingProgress from '@/components/OnboardingProgress'
import { Loader2, CheckCircle2 } from 'lucide-react'

const loadingSteps = [
  "Analysing your preferences...",
  "Matching with 1,270+ Indian careers...",
  "Building your personalised roadmap...",
  "Finalising your recommendations..."
]

export default function QuizLoadingPage() {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    // 1. Progress Step Animation
    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < loadingSteps.length - 1) return prev + 1
        return prev
      })
    }, 1500)

    // 2. Perform Analysis
    const runAnalysis = async () => {
      const selections = JSON.parse(localStorage.getItem('quiz_selections') || '[]')
      const stream = localStorage.getItem('onboarding_stream') || 'Any'
      const interests = JSON.parse(localStorage.getItem('onboarding_interests') || '[]')
      const level = localStorage.getItem('onboarding_level') || '12th'

      try {
        const res = await fetch('/api/quiz/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selections, stream, interests, educationLevel: level })
        })
        const data = await res.json()
        
        // Store results for the next page
        localStorage.setItem('quiz_results', JSON.stringify(data))
        
        setCompleted(true)
        setTimeout(() => {
          router.push('/results')
        }, 1000)
      } catch (error) {
        console.error(error)
      }
    }

    runAnalysis()

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
      <OnboardingProgress currentStep={6} />
      
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ marginBottom: '2rem' }}
        >
          {completed ? (
            <CheckCircle2 size={80} style={{ color: 'var(--success)' }} />
          ) : (
            <Loader2 size={80} style={{ color: 'var(--primary)' }} />
          )}
        </motion.div>

        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem' }}>
          {completed ? "Analysis Complete!" : "Calculating Your Future..."}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {loadingSteps.map((step, idx) => {
            const isActive = idx === stepIndex
            const isDone = idx < stepIndex || completed
            
            return (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  opacity: isActive || isDone ? 1 : 0.3,
                  transition: 'opacity 0.5s ease'
                }}
              >
                <div style={{ 
                  width: '12px', height: '12px', 
                  borderRadius: '50%', 
                  background: isDone ? 'var(--success)' : 'var(--primary)',
                  boxShadow: isActive ? '0 0 10px var(--primary)' : 'none'
                }} />
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: isActive ? '700' : '500',
                  color: isDone ? 'var(--success)' : 'var(--text-main)'
                }}>
                  {step}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
