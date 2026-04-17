'use client'
import { useState } from 'react'
import Link from 'next/link'

type ProfessionalCourse = {
  id: string
  name: string
  fullForm: string
  eligibility: string
  fees: string
  duration: string
  opportunities: string
  extraRemarks: string | null
}

export default function ExpandableProfCourseCard({ course }: { course: ProfessionalCourse }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="glass-panel animate-slide-up expandable-card" style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
        <Link href={`/professional-course/${course.id}`} style={{ textDecoration: 'none', flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', maxWidth: '85%' }}>{course.name}</h3>
        </Link>
      </div>
      <p style={{ color: 'var(--accent)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.8rem' }}>{course.fullForm}</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '99px', color: 'var(--text-muted)' }}>
          ⏱ {course.duration}
        </span>
        <span style={{ fontSize: '0.75rem', background: 'rgba(59,130,246,0.1)', padding: '0.2rem 0.6rem', borderRadius: '99px', color: 'var(--primary)' }}>
          💰 {course.fees}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
        <button onClick={() => setExpanded(!expanded)} className="expand-btn">
          {expanded ? '▲ Less' : '▼ Preview Details'}
        </button>
        <Link href={`/professional-course/${course.id}`} className="expand-btn" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
           View Full Screen →
        </Link>
      </div>

      {expanded && (
        <div className="expanded-details" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem', marginTop: '0.4rem' }}>
          <p style={{ fontSize: '0.88rem', marginBottom: '0.6rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>Eligibility:</strong>{' '}
            <span style={{ color: 'var(--text-muted)' }}>{course.eligibility}</span>
          </p>
          <p style={{ fontSize: '0.88rem', marginBottom: '0.6rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>Potential:</strong>{' '}
            <span style={{ color: 'var(--text-muted)' }}>{course.opportunities.length > 120 ? course.opportunities.slice(0, 120) + '...' : course.opportunities}</span>
          </p>
          {course.extraRemarks && (
             <p style={{ fontSize: '0.88rem', fontStyle: 'italic', borderLeft: '2px solid var(--accent)', paddingLeft: '0.8rem', marginTop: '0.8rem', color: 'var(--text-muted)' }}>
                "{course.extraRemarks}"
             </p>
          )}
        </div>
      )}
    </div>
  )
}
