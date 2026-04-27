'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import OnboardingProgress from '@/components/OnboardingProgress'
import { ArrowRight, GraduationCap, School, BookOpen } from 'lucide-react'

const educationLevels = [
  { id: '10th', label: 'Class 10th', icon: <School size={24} /> },
  { id: '12th', label: 'Class 12th', icon: <GraduationCap size={24} /> },
  { id: 'grad1', label: 'Graduation (1st Year)', icon: <BookOpen size={24} /> },
  { id: 'grad2', label: 'Graduation (2nd Year+)', icon: <BookOpen size={24} /> },
  { id: 'other', label: 'Other', icon: <School size={24} /> },
]

const streams = [
  { id: 'Science_PCM', label: 'Science (PCM)' },
  { id: 'Science_PCB', label: 'Science (PCB)' },
  { id: 'Commerce', label: 'Commerce' },
  { id: 'Arts', label: 'Arts / Humanities' },
  { id: 'NotSure', label: 'Not Sure' },
]

export default function QualificationPage() {
  const router = useRouter()
  const [level, setLevel] = useState('')
  const [stream, setStream] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNext = async () => {
    if (!level) return
    if (['12th', 'grad1', 'grad2'].includes(level) && !stream) return

    setLoading(true)
    try {
      // Save to local storage for now, will sync to DB at the end of onboarding or per step
      localStorage.setItem('onboarding_level', level)
      localStorage.setItem('onboarding_stream', stream)
      router.push('/onboarding/interests')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const showStream = ['12th', 'grad1', 'grad2'].includes(level)

  return (
    <div className="main-content" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      <OnboardingProgress currentStep={2} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginTop: '4rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>
          What is your current education level?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
          This helps us tailor career recommendations to your current stage.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '4rem' }}>
          {educationLevels.map((item) => (
            <button
              key={item.id}
              onClick={() => setLevel(item.id)}
              style={{
                background: level === item.id ? 'var(--primary)' : '#fff',
                color: level === item.id ? '#fff' : 'var(--text-main)',
                border: '2px solid',
                borderColor: level === item.id ? 'var(--primary)' : 'var(--border)',
                borderRadius: '16px',
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: level === item.id ? '0 10px 20px rgba(30, 58, 95, 0.15)' : 'none'
              }}
            >
              <div style={{ color: level === item.id ? '#fff' : 'var(--primary)' }}>
                {item.icon}
              </div>
              <span style={{ fontWeight: '600' }}>{item.label}</span>
            </button>
          ))}
        </div>

        {showStream && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{ marginBottom: '4rem' }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1.5rem' }}>
              Select your stream:
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {streams.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStream(s.id)}
                  style={{
                    background: stream === s.id ? 'var(--accent)' : '#fff',
                    color: stream === s.id ? '#fff' : 'var(--text-main)',
                    border: '2px solid',
                    borderColor: stream === s.id ? 'var(--accent)' : 'var(--border)',
                    borderRadius: '99px',
                    padding: '0.75rem 1.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleNext}
            disabled={!level || (showStream && !stream) || loading}
            className="btn-primary"
            style={{ 
              padding: '1rem 3rem', 
              fontSize: '1.1rem',
              opacity: (!level || (showStream && !stream)) ? 0.5 : 1,
              cursor: (!level || (showStream && !stream)) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : 'Next Step'} <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
