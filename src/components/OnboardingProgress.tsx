'use client'

import { motion } from 'framer-motion'

interface OnboardingProgressProps {
  currentStep: number // 1 to 7 (based on the blueprint steps)
  totalSteps?: number
}

export default function OnboardingProgress({ currentStep, totalSteps = 7 }: OnboardingProgressProps) {
  const percentage = (currentStep / totalSteps) * 100

  return (
    <div style={{ 
      position: 'fixed', 
      top: 'var(--navbar-height)', 
      left: 0, 
      right: 0, 
      height: '4px', 
      background: 'var(--bg-offset)',
      zIndex: 100,
      borderBottom: '1px solid var(--border)'
    }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ 
          height: '100%', 
          background: 'linear-gradient(to right, var(--primary), var(--accent))',
          borderRadius: '0 2px 2px 0'
        }}
      />
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        right: '5%', 
        fontSize: '0.75rem', 
        fontWeight: '700', 
        color: 'var(--text-muted)',
        letterSpacing: '0.05em'
      }}>
        STEP {currentStep} OF {totalSteps}
      </div>
    </div>
  )
}
