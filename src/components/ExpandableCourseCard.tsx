'use client'
import { useState } from 'react'
import Link from 'next/link'

type College = { id: string; name: string; state: string; address: string | null; ranking: number | null }
type CollegeCourse = { collegeId: string; fee: string | null; timeInvolved: string | null; remarks: string | null; college: College }
type Course = {
  id: string; title: string; stream: string
  basicSubjects?: string | null; useCase?: string | null
  colleges: CollegeCourse[]
}

const sanitizeFee = (fee: string | null) => {
  if (!fee) return fee
  return fee.replace(/\s*\(\s*Full Year\s*\)|\s*\(\s*Semester\s*\)|\/ Semester|\/ Year/gi, '').trim()
}

export default function ExpandableCourseCard({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false)
  const preview = course.colleges.slice(0, 3)
  const extra = course.colleges.slice(3)

  return (
    <div className="glass-panel animate-slide-up expandable-card" style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <Link href={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
        <h3 style={{ marginBottom: '0.4rem', color: 'var(--text-main)' }}>{course.title}</h3>
      </Link>
      <span className="stream-badge">{course.stream}</span>

      {course.basicSubjects && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.7rem', marginBottom: '0.3rem' }}>
          <strong style={{ color: 'var(--text-main)' }}>Subjects:</strong> {course.basicSubjects}
        </p>
      )}

      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem', marginTop: '0.8rem' }}>
        <strong style={{ fontSize: '0.85rem' }}>Colleges ({course.colleges.length}):</strong>
        <ul className="college-list">
          {preview.map(cc => (
            <li key={cc.collegeId} style={{ wordBreak: 'break-word' }}>
              <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-main)' }}>• {cc.college.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.3rem' }}>({cc.college.state})</span>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.2rem', paddingLeft: '0.8rem' }}>
                {cc.fee && cc.fee !== 'Not Specified' && <span style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>💰 {sanitizeFee(cc.fee)}</span>}
                {cc.timeInvolved && cc.timeInvolved !== 'Not Specified' && <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>⏱ {cc.timeInvolved}</span>}
              </div>
              {cc.remarks && <div style={{ paddingLeft: '0.8rem', marginTop: '0.15rem', fontSize: '0.72rem', color: 'var(--accent)' }}>↳ {cc.remarks}</div>}
            </li>
          ))}
          {expanded && extra.map(cc => (
            <li key={cc.collegeId} style={{ wordBreak: 'break-word' }}>
              <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-main)' }}>• {cc.college.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.3rem' }}>({cc.college.state})</span>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.2rem', paddingLeft: '0.8rem' }}>
                {cc.fee && cc.fee !== 'Not Specified' && <span style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>💰 {cc.fee}</span>}
                {cc.timeInvolved && cc.timeInvolved !== 'Not Specified' && <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>⏱ {cc.timeInvolved}</span>}
              </div>
              {cc.remarks && <div style={{ paddingLeft: '0.8rem', marginTop: '0.15rem', fontSize: '0.72rem', color: 'var(--accent)' }}>↳ {cc.remarks}</div>}
            </li>
          ))}
          {course.colleges.length === 0 && <li style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>No colleges in selected state.</li>}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem', flexWrap: 'wrap' }}>
        {extra.length > 0 && (
          <button onClick={() => setExpanded(!expanded)} className="expand-btn">
            {expanded ? '▲ Show Less' : `▼ +${extra.length} More`}
          </button>
        )}
        <Link href={`/course/${course.id}`} className="expand-btn" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
          Full Details →
        </Link>
      </div>
    </div>
  )
}
