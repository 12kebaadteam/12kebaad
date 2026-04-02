'use client'
import { useState } from 'react'

type Course = { id: string; title: string; stream: string }
type CollegeCourse = { courseId: string; fee: string | null; timeInvolved: string | null; remarks: string | null; course: Course }
type College = {
  id: string; name: string; state: string; address: string | null; ranking: number | null
  courses: CollegeCourse[]
}

export default function ExpandableCollegeCard({ college }: { college: College }) {
  const [expanded, setExpanded] = useState(false)
  const previewCourses = college.courses.slice(0, 3)
  const extraCourses = college.courses.slice(3)

  return (
    <div className="glass-panel animate-slide-up expandable-card" style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
        <h3 style={{ maxWidth: '75%', fontSize: '1rem' }}>{college.name}</h3>
        {college.ranking && (
          <span className="rank-badge">#{college.ranking}</span>
        )}
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
        <strong style={{ color: 'var(--text-main)' }}>📍</strong> {college.state}
      </p>
      {college.address && (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>{college.address}</p>
      )}

      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem', marginTop: '0.8rem' }}>
        <strong style={{ fontSize: '0.88rem' }}>Courses ({college.courses.length}):</strong>
        <ul className="college-list" style={{ marginTop: '0.5rem' }}>
          {previewCourses.map(cc => (
            <CourseEntry key={cc.courseId} cc={cc} />
          ))}
          {expanded && extraCourses.map(cc => (
            <CourseEntry key={cc.courseId} cc={cc} />
          ))}
        </ul>
        {college.courses.length === 0 && (
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>No courses listed.</p>
        )}
      </div>

      <button onClick={() => setExpanded(!expanded)} className="expand-btn">
        {expanded
          ? '▲ Show Less'
          : extraCourses.length > 0
            ? `▼ Show ${extraCourses.length} More Courses`
            : '▼ Details'}
      </button>

      {expanded && (
        <div className="expanded-details">
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem', marginTop: '0.8rem' }}>
            {college.address && (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <strong style={{ color: 'var(--text-main)' }}>Full Address:</strong> {college.address}
              </p>
            )}
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-main)' }}>State:</strong> {college.state}
            </p>
            {college.ranking && (
              <p style={{ fontSize: '0.82rem', color: 'var(--accent)', marginTop: '0.4rem' }}>
                🏆 National Rank #{college.ranking}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CourseEntry({ cc }: { cc: CollegeCourse }) {
  return (
    <li style={{ wordBreak: 'break-word', overflow: 'hidden', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-main)' }}>• {cc.course.title}</span>
      <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginLeft: '0.4rem' }}>[{cc.course.stream}]</span>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '0.2rem', paddingLeft: '0.8rem' }}>
        {cc.fee && cc.fee !== 'Not Specified' && (
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>💰 {cc.fee}</span>
        )}
        {cc.timeInvolved && cc.timeInvolved !== 'Not Specified' && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⏱ {cc.timeInvolved}</span>
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
