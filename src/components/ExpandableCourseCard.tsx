'use client'
import { useState } from 'react'

type College = { id: string; name: string; state: string; address: string | null; ranking: number | null }
type CollegeCourse = { collegeId: string; fee: string | null; timeInvolved: string | null; remarks: string | null; college: College }
type Course = {
  id: string; title: string; stream: string;
  basicSubjects?: string | null; useCase?: string | null;
  colleges: CollegeCourse[]
}

export default function ExpandableCourseCard({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false)
  const previewColleges = course.colleges.slice(0, 3)
  const extraColleges = course.colleges.slice(3)

  return (
    <div className="glass-panel animate-slide-up expandable-card" style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <h3 style={{ marginBottom: '0.4rem' }}>{course.title}</h3>
      <span className="stream-badge">{course.stream}</span>

      {course.basicSubjects && (
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.8rem', marginBottom: '0.4rem' }}>
          <strong style={{ color: 'var(--text-main)' }}>Subjects:</strong> {course.basicSubjects}
        </p>
      )}
      {course.useCase && (
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
          <strong style={{ color: 'var(--text-main)' }}>Career Uses:</strong> {course.useCase}
        </p>
      )}

      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem', marginTop: '0.8rem' }}>
        <strong style={{ fontSize: '0.88rem' }}>Colleges Offering ({course.colleges.length}):</strong>
        <ul className="college-list">
          {previewColleges.map(cc => (
            <CollegeEntry key={cc.collegeId} cc={cc} />
          ))}
          {expanded && extraColleges.map(cc => (
            <CollegeEntry key={cc.collegeId} cc={cc} />
          ))}
        </ul>

        {course.colleges.length === 0 && (
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>No colleges in selected state.</p>
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="expand-btn"
      >
        {expanded ? '▲ Show Less' : `▼ ${extraColleges.length > 0 ? `Show ${extraColleges.length} More` : 'Details'}`}
      </button>

      {expanded && (
        <div className="expanded-details">
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem', marginTop: '0.8rem' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-main)' }}>Stream:</strong> {course.stream}
            </p>
            {course.basicSubjects && (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <strong style={{ color: 'var(--text-main)' }}>Full Subjects List:</strong> {course.basicSubjects}
              </p>
            )}
            {course.useCase && (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <strong style={{ color: 'var(--text-main)' }}>All Career Uses:</strong> {course.useCase}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CollegeEntry({ cc }: { cc: CollegeCourse }) {
  return (
    <li style={{ wordBreak: 'break-word', overflow: 'hidden', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-main)' }}>• {cc.college.name}</span>
      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.3rem' }}>({cc.college.state})</span>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '0.2rem', paddingLeft: '0.8rem' }}>
        {cc.fee && cc.fee !== 'Not Specified' && (
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>💰 {cc.fee}</span>
        )}
        {cc.timeInvolved && cc.timeInvolved !== 'Not Specified' && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⏱ {cc.timeInvolved}</span>
        )}
        {cc.college.ranking && (
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>🏆 Rank #{cc.college.ranking}</span>
        )}
      </div>
      {cc.remarks && (
        <div style={{ paddingLeft: '0.8rem', marginTop: '0.2rem', fontSize: '0.75rem', color: 'var(--accent)', whiteSpace: 'normal' }}>
          ↳ {cc.remarks}
        </div>
      )}
    </li>
  )
}
