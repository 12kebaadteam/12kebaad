'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import OnboardingProgress from '@/components/OnboardingProgress'
import { Zap, Heart, RefreshCw, Save, Rocket } from 'lucide-react'

const tips = [
  { 
    title: 'Trust your first instinct!', 
    text: "You'll be answering fast questions. Don't overthink. Go with your gut.",
    icon: <Zap size={24} />
  },
  { 
    title: 'Pick what excites you', 
    text: "Even if a career feels far-fetched, choose it if it genuinely interests you. We're mapping your drive, not your limitations.",
    icon: <Heart size={24} />
  },
  { 
    title: 'Repetition is key', 
    text: "You may see the same career more than once — this is intentional. It helps us gauge how strongly you feel about it compared to other options.",
    icon: <RefreshCw size={24} />
  },
  { 
    title: 'Progress is saved', 
    text: "No rushing needed. Everything is stored as you go. You can stop and come back anytime.",
    icon: <Save size={24} />
  },
]

export default function QuizIntroPage() {
  const router = useRouter()

  return (
    <div style={{ maxWidth: '100%' }}>
      <OnboardingProgress currentStep={4} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginTop: '4rem', textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem' }}>
          Career Quiz — How It Works
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
          Ready to find your path? Here's how to get the most accurate results from our decision engine.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '4rem', textAlign: 'left' }}>
          {tips.map((tip, index) => (
            <div key={index} className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
                {tip.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>{tip.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{tip.text}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push('/quiz')}
          className="btn-primary"
          style={{ padding: '1.25rem 5rem', fontSize: '1.25rem' }}
        >
          Let's Go! <Rocket size={24} style={{ marginLeft: '0.5rem' }} />
        </button>
      </motion.div>
    </div>
  )
}
