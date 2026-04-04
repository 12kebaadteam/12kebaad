'use client'
import { useState } from 'react'
import Link from 'next/link'

type Course = { id: string; title: string; stream: string }
type CollegeCourse = { courseId: string; fee: string | null; timeInvolved: string | null; remarks: string | null; course: Course }
type College = {
  id: string; name: string; state: string; address: string | null; ranking: number | null
  courses: CollegeCourse[]
}

export default function ExpandableCollegeCard({ college }: { college: College }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="glass-panel animate-slide-up expandable-card" style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
        <Link href={`/college/${college.id}`} style={{ textDecoration: 'none', flex: 1 }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', maxWidth: '75%' }}>{college.name}</h3>
        </Link>
        {college.ranking && <span className="rank-badge">#{college.ranking}</span>}
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>📍 {college.state}</p>

      {/* Course count summary — details on click */}
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
        {college.courses.length} course{college.courses.length !== 1 ? 's' : ''} offered
      </p>

      {/* Expand to show course names only */}
      {expanded && (
        <div className="expanded-details" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem', marginTop: '0.4rem' }}>
          {college.address && (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>{college.address}</p>
          )}
          <strong style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Courses:</strong>
          <ul className="college-list" style={{ marginTop: '0.4rem' }}>
            {college.courses.map(cc => (
              <li key={cc.courseId} style={{ fontSize: '0.82rem', paddingBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-main)' }}>• {cc.course.title}</span>
                <span style={{ color: 'var(--primary)', marginLeft: '0.4rem', fontSize: '0.75rem' }}>[{cc.course.stream}]</span>
              </li>
            ))}
            {college.courses.length === 0 && <li style={{ color: 'var(--text-muted)' }}>None listed</li>}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
        <button onClick={() => setExpanded(!expanded)} className="expand-btn">
          {expanded ? '▲ Less' : '▼ Preview Courses'}
        </button>
        <Link href={`/college/${college.id}`} className="expand-btn" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
          Full Details →
        </Link>
      </div>
    </div>
  )
}
