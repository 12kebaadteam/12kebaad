'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import OnboardingProgress from '@/components/OnboardingProgress'
import { ArrowRight, Music, TrendingUp, Zap, Dumbbell, Palette, Globe, Cpu, Heart, Book, Coffee, Plane, Camera, Mic2, Gamepad2, TreePine, Building, Beaker, Scale } from 'lucide-react'

const passionFields = [
  { id: 'Music', label: 'Music', icon: <Music size={28} />, desc: 'Performing, composing, or music production' },
  { id: 'Entrepreneurship', label: 'Entrepreneurship', icon: <TrendingUp size={28} />, desc: 'Starting and scaling businesses' },
  { id: 'Dance', label: 'Dance', icon: <Zap size={28} />, desc: 'Classical, contemporary, or choreography' },
  { id: 'Sports', label: 'Sports', icon: <Dumbbell size={28} />, desc: 'Athletics, coaching, or sports management' },
  { id: 'Art', label: 'Art & Design', icon: <Palette size={28} />, desc: 'Visual arts, illustration, or design' },
  { id: 'Technology', label: 'Technology', icon: <Cpu size={28} />, desc: 'Coding, AI, cybersecurity, or gadgets' },
  { id: 'Travel', label: 'Travel & Tourism', icon: <Plane size={28} />, desc: 'Hospitality, travel blogging, or aviation' },
  { id: 'Social Work', label: 'Social Work', icon: <Heart size={28} />, desc: 'NGO, community service, or policy' },
  { id: 'Writing', label: 'Writing & Media', icon: <Book size={28} />, desc: 'Journalism, content, or storytelling' },
  { id: 'Gaming', label: 'Gaming & Esports', icon: <Gamepad2 size={28} />, desc: 'Game design, streaming, or esports' },
  { id: 'Environment', label: 'Environment', icon: <TreePine size={28} />, desc: 'Sustainability, ecology, or climate' },
  { id: 'Fashion', label: 'Fashion & Beauty', icon: <Camera size={28} />, desc: 'Styling, modelling, or beauty industry' },
  { id: 'Food', label: 'Food & Culinary', icon: <Coffee size={28} />, desc: 'Cooking, nutrition, or food business' },
  { id: 'Science', label: 'Science & Research', icon: <Beaker size={28} />, desc: 'Labs, discovery, and innovation' },
  { id: 'Law', label: 'Law & Justice', icon: <Scale size={28} />, desc: 'Legal practice or policy making' },
  { id: 'Content Creation', label: 'Content Creation', icon: <Mic2 size={28} />, desc: 'YouTube, podcasting, or social media' },
  { id: 'Real Estate', label: 'Real Estate', icon: <Building size={28} />, desc: 'Property, urban planning, or construction' },
  { id: 'None', label: 'No specific passion yet', icon: <Globe size={28} />, desc: 'Still exploring all options' },
]

export default function PassionPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleNext = async () => {
    if (!selected) return
    setLoading(true)
    try {
      localStorage.setItem('onboarding_passion', selected)
      router.push('/quiz-intro')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
      <OnboardingProgress currentStep={4} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginTop: '3rem' }}
      >
        <div style={{ 
          display: 'inline-block', 
          background: 'linear-gradient(135deg, rgba(232,99,10,0.1), rgba(30,58,95,0.1))',
          border: '1px solid rgba(232,99,10,0.2)',
          borderRadius: '99px',
          padding: '0.4rem 1.2rem',
          marginBottom: '1.5rem'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent)', letterSpacing: '0.05em' }}>
            STEP 4 OF 4 — PASSION CHECK
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', 
          fontWeight: '800', 
          color: 'var(--primary)', 
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          Are you passionate about<br />a particular field?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Your passion matters — even if it's not directly tied to a "career". 
          This helps us find unexpected paths that could excite you.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginBottom: '3rem' 
        }}>
          {passionFields.map((field) => {
            const isSelected = selected === field.id
            return (
              <motion.button
                key={field.id}
                onClick={() => setSelected(field.id)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: isSelected 
                    ? 'linear-gradient(135deg, var(--primary), var(--accent))' 
                    : 'rgba(255,255,255,0.05)',
                  color: isSelected ? '#fff' : 'var(--text-main)',
                  border: '2px solid',
                  borderColor: isSelected ? 'transparent' : 'var(--border)',
                  borderRadius: '20px',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  boxShadow: isSelected ? '0 8px 24px rgba(232,99,10,0.25)' : 'none'
                }}
              >
                <div style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : 'var(--accent)' }}>
                  {field.icon}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.3rem' }}>{field.label}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.75, lineHeight: '1.3' }}>{field.desc}</div>
                </div>
              </motion.button>
            )
          })}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'var(--bg-offset)',
          padding: '1.5rem 2.5rem',
          borderRadius: '24px',
          border: '1px solid var(--border)'
        }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>
            {selected 
              ? selected === 'None' 
                ? "You'll explore all options — that's fine!" 
                : `Passion: ${selected} selected ✓` 
              : 'Select one passion field to continue'}
          </p>
          <button
            onClick={handleNext}
            disabled={!selected || loading}
            className="btn-primary"
            style={{ 
              padding: '1rem 3rem', 
              fontSize: '1.1rem',
              opacity: !selected ? 0.5 : 1,
              cursor: !selected ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : 'Start Career Quiz'} <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
