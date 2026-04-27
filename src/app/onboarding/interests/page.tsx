'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import OnboardingProgress from '@/components/OnboardingProgress'
import { 
  ArrowRight, 
  Monitor, 
  Stethoscope, 
  Briefcase, 
  Palette, 
  GraduationCap, 
  Scale, 
  Beaker, 
  Film, 
  Dumbbell, 
  Leaf, 
  Hammer, 
  Plane,
  Shield,
  Utensils,
  Users,
  TrendingUp,
  Zap,
  ShoppingBag,
  Target
} from 'lucide-react'

const interestCategories = [
  { id: 'Tech_Coding', label: 'Tech & Coding', icon: <Monitor size={24} /> },
  { id: 'AI_Data', label: 'AI & Data Science', icon: <Monitor size={24} /> },
  { id: 'Medical_Pharma', label: 'Medicine & Pharma', icon: <Stethoscope size={24} /> },
  { id: 'Healthcare_Mgmt', label: 'Healthcare Mgmt', icon: <Stethoscope size={24} /> },
  { id: 'Fintech_Banking', label: 'Fintech & Banking', icon: <Briefcase size={24} /> },
  { id: 'Stock_Markets', label: 'Stock Markets', icon: <TrendingUp size={24} /> },
  { id: 'Entrepreneurship', label: 'Entrepreneurship', icon: <Zap size={24} /> },
  { id: 'Ecommerce_D2C', label: 'E-commerce & D2C', icon: <ShoppingBag size={24} /> },
  { id: 'Marketing_Ads', label: 'Marketing & Ads', icon: <Target size={24} /> },
  { id: 'Management_HR', label: 'Management & HR', icon: <Users size={24} /> },
  { id: 'Accounting_Audit', label: 'Accounting & Tax', icon: <Scale size={24} /> },
  { id: 'Design_VFX', label: 'Design & VFX', icon: <Palette size={24} /> },
  { id: 'Content_Journalism', label: 'Content & Media', icon: <Film size={24} /> },
  { id: 'Law_Judiciary', label: 'Law & Judiciary', icon: <Scale size={24} /> },
  { id: 'Pure_Science', label: 'Pure Science & R&D', icon: <Beaker size={24} /> },
  { id: 'Engineering_Robotics', label: 'Robotics & Engg', icon: <Hammer size={24} /> },
  { id: 'Defense_Army', label: 'Defense & Police', icon: <Shield size={24} /> },
  { id: 'Aviation_Pilot', label: 'Pilot & Aviation', icon: <Plane size={24} /> },
  { id: 'Culinary_Bakery', label: 'Culinary & Hotels', icon: <Utensils size={24} /> },
]

export default function InterestsPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const toggleInterest = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id))
    } else {
      if (selected.length < 6) {
        setSelected([...selected, id])
      }
    }
  }

  const handleNext = async () => {
    if (selected.length < 3) return

    setLoading(true)
    try {
      localStorage.setItem('onboarding_interests', JSON.stringify(selected))
      router.push('/quiz-intro')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <OnboardingProgress currentStep={3} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginTop: '4rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>
          What are your career interest areas?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
          Select 3 to 6 areas that excite you. This narrows down 1,200+ careers to your perfect matches.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '1.25rem', 
          marginBottom: '4rem' 
        }}>
          {interestCategories.map((item) => {
            const isSelected = selected.includes(item.id)
            return (
              <button
                key={item.id}
                onClick={() => toggleInterest(item.id)}
                style={{
                  background: isSelected ? 'var(--primary)' : '#fff',
                  color: isSelected ? '#fff' : 'var(--text-main)',
                  border: '2px solid',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  boxShadow: isSelected ? '0 8px 16px rgba(30, 58, 95, 0.15)' : 'none'
                }}
              >
                <div style={{ color: isSelected ? '#fff' : 'var(--primary)' }}>
                  {item.icon}
                </div>
                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{item.label}</span>
              </button>
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
            {selected.length < 3 
              ? `Select ${3 - selected.length} more to continue` 
              : `${selected.length} areas selected (Max 6)`}
          </p>
          <button
            onClick={handleNext}
            disabled={selected.length < 3 || loading}
            className="btn-primary"
            style={{ 
              padding: '1rem 3rem', 
              fontSize: '1.1rem',
              opacity: selected.length < 3 ? 0.5 : 1,
              cursor: selected.length < 3 ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : 'Start Career Quiz'} <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
