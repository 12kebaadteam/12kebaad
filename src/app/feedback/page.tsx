'use client'

import FeedbackSection from '@/components/FeedbackSection'
import { motion } from 'framer-motion'
import { MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function FeedbackPage() {
  return (
    <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Link href="/" className="back-link" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '24px', 
            background: 'var(--bg-offset)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--primary)', margin: '0 auto 2rem auto'
          }}>
            <MessageSquare size={40} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>
            We Value Your Voice
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Help us build the most accurate career guidance engine in India.
          </p>
        </motion.div>

        <FeedbackSection />
      </div>
    </main>
  )
}
