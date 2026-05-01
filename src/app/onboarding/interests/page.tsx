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
  Target,
  Cpu,
  Brush,
  Wheat,
  BarChart,
  Building2,
  BookOpen,
  Globe,
  Lock,
  Activity,
  Heart,
  Scale as LawIcon,
  Microscope,
  Music,
  Rocket,
  Coffee,
  Languages,
  PenTool,
  Brain,
  Search,
  Gavel,
  CheckCircle,
  Lightbulb,
  TreePine,
  Timer,
  BicepsFlexed,
  Layout,
  Microchip,
  Truck,
  Edit3
} from 'lucide-react'

const interestCategories = [
  { id: 'AI', label: 'AI', icon: <Cpu size={24} /> },
  { id: 'Aesthetics', label: 'Aesthetics', icon: <Palette size={24} /> },
  { id: 'Agriculture', label: 'Agriculture', icon: <Wheat size={24} /> },
  { id: 'Analysis', label: 'Analysis', icon: <BarChart size={24} /> },
  { id: 'Architecture', label: 'Architecture', icon: <Building2 size={24} /> },
  { id: 'Art', label: 'Art', icon: <Brush size={24} /> },
  { id: 'Aviation', label: 'Aviation', icon: <Plane size={24} /> },
  { id: 'Biology', label: 'Biology', icon: <Microscope size={24} /> },
  { id: 'Business', label: 'Business', icon: <Briefcase size={24} /> },
  { id: 'Coding', label: 'Coding', icon: <Monitor size={24} /> },
  { id: 'Communication', label: 'Communication', icon: <Languages size={24} /> },
  { id: 'Construction', label: 'Construction', icon: <Hammer size={24} /> },
  { id: 'Creativity', label: 'Creativity', icon: <Palette size={24} /> },
  { id: 'Culture', label: 'Culture', icon: <Globe size={24} /> },
  { id: 'Current Affairs', label: 'Current Affairs', icon: <BookOpen size={24} /> },
  { id: 'Cybersecurity', label: 'Cybersecurity', icon: <Lock size={24} /> },
  { id: 'Data Analysis', label: 'Data Analysis', icon: <BarChart size={24} /> },
  { id: 'Data Science', label: 'Data Science', icon: <Microchip size={24} /> },
  { id: 'Defence', label: 'Defence', icon: <Shield size={24} /> },
  { id: 'Design', label: 'Design', icon: <Palette size={24} /> },
  { id: 'Discipline', label: 'Discipline', icon: <Target size={24} /> },
  { id: 'Economics', label: 'Economics', icon: <TrendingUp size={24} /> },
  { id: 'Empathy', label: 'Empathy', icon: <Heart size={24} /> },
  { id: 'Engineering', label: 'Engineering', icon: <Zap size={24} /> },
  { id: 'Environment', label: 'Environment', icon: <Leaf size={24} /> },
  { id: 'Expression', label: 'Expression', icon: <Music size={24} /> },
  { id: 'Finance', label: 'Finance', icon: <Briefcase size={24} /> },
  { id: 'Food', label: 'Food', icon: <Utensils size={24} /> },
  { id: 'Growth', label: 'Growth', icon: <TrendingUp size={24} /> },
  { id: 'Hands-on Work', label: 'Hands-on Work', icon: <Hammer size={24} /> },
  { id: 'Health', label: 'Health', icon: <Activity size={24} /> },
  { id: 'Healthcare', label: 'Healthcare', icon: <Stethoscope size={24} /> },
  { id: 'History', label: 'History', icon: <BookOpen size={24} /> },
  { id: 'Hospitality', label: 'Hospitality', icon: <Utensils size={24} /> },
  { id: 'Investigation', label: 'Investigation', icon: <Search size={24} /> },
  { id: 'Justice', label: 'Justice', icon: <LawIcon size={24} /> },
  { id: 'Law', label: 'Law', icon: <Gavel size={24} /> },
  { id: 'Leadership', label: 'Leadership', icon: <Users size={24} /> },
  { id: 'Learning', label: 'Learning', icon: <GraduationCap size={24} /> },
  { id: 'Logic', label: 'Logic', icon: <Brain size={24} /> },
  { id: 'Mathematics', label: 'Mathematics', icon: <Activity size={24} /> },
  { id: 'Nature', label: 'Nature', icon: <TreePine size={24} /> },
  { id: 'Numbers', label: 'Numbers', icon: <Activity size={24} /> },
  { id: 'Organization', label: 'Organization', icon: <Layout size={24} /> },
  { id: 'Patience', label: 'Patience', icon: <Timer size={24} /> },
  { id: 'Philosophy', label: 'Philosophy', icon: <BookOpen size={24} /> },
  { id: 'Physical Fitness', label: 'Physical Fitness', icon: <Dumbbell size={24} /> },
  { id: 'Physics', label: 'Physics', icon: <Zap size={24} /> },
  { id: 'Policy', label: 'Policy', icon: <FileText size={24} /> },
  { id: 'Precision', label: 'Precision', icon: <CheckCircle size={24} /> },
  { id: 'Problem Solving', label: 'Problem Solving', icon: <Lightbulb size={24} /> },
  { id: 'Psychology', label: 'Psychology', icon: <Brain size={24} /> },
  { id: 'Research', label: 'Research', icon: <Search size={24} /> },
  { id: 'Science', label: 'Science', icon: <Beaker size={24} /> },
  { id: 'Service', label: 'Service', icon: <Users size={24} /> },
  { id: 'Social Science', label: 'Social Science', icon: <Users size={24} /> },
  { id: 'Social Service', label: 'Social Service', icon: <Heart size={24} /> },
  { id: 'Software', label: 'Software', icon: <Monitor size={24} /> },
  { id: 'Space', label: 'Space', icon: <Rocket size={24} /> },
  { id: 'Sports', label: 'Sports', icon: <Dumbbell size={24} /> },
  { id: 'Subject Expertise', label: 'Subject Expertise', icon: <GraduationCap size={24} /> },
  { id: 'Sustainability', label: 'Sustainability', icon: <Leaf size={24} /> },
  { id: 'Teaching', label: 'Teaching', icon: <GraduationCap size={24} /> },
  { id: 'Technical Skills', label: 'Technical Skills', icon: <Hammer size={24} /> },
  { id: 'Technology', label: 'Technology', icon: <Monitor size={24} /> },
  { id: 'Travel', label: 'Travel', icon: <Truck size={24} /> },
  { id: 'Work', icon: <Briefcase size={24} />, label: 'Work' },
  { id: 'Writing', label: 'Writing', icon: <Edit3 size={24} /> },
]

export default function InterestsPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const toggleInterest = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id))
    } else {
      setSelected([...selected, id])
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
          Select 3 or more areas that excite you. This narrows down 1,200+ careers to your perfect matches.
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
              : `${selected.length} areas selected`}
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
