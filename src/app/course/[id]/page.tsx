import prisma from '../../../../lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      colleges: {
        include: { college: true },
        orderBy: { college: { ranking: 'asc' } },
      }
    }
  })

  if (!course) notFound()

  return (
    <div className="animate-fade-in" style={{ maxWidth: '860px', margin: '0 auto' }}>
      <Link href="/courses" className="back-link">← Back to all courses</Link>

      {/* Header */}
      <div className="glass-panel animate-slide-up" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{course.title}</h1>
        <span className="stream-badge" style={{ fontSize: '0.85rem' }}>{course.stream}</span>
        {course.basicSubjects && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '1rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>Core Subjects:</strong> {course.basicSubjects}
          </p>
        )}
        {course.useCase && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.6rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>Career Paths:</strong> {course.useCase}
          </p>
        )}
      </div>

      {/* Colleges offering this course */}
      <div className="glass-panel animate-slide-up" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.2rem', fontSize: '1.1rem' }}>
          Colleges Offering This Course ({course.colleges.length})
        </h2>
        {course.colleges.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No colleges listed for this course yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {course.colleges.map(cc => (
              <div key={cc.collegeId} style={{ padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '0.98rem', marginBottom: '0.2rem' }}>
                      <Link href={`/college/${cc.collegeId}`} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>
                        {cc.college.name}
                      </Link>
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>📍 {cc.college.state}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {cc.college.ranking && (
                      <span className="rank-badge">#{cc.college.ranking}</span>
                    )}
                    {cc.fee && cc.fee !== 'Not Specified' && (
                      <span style={{ fontSize: '0.82rem', color: 'var(--primary)', background: 'rgba(59,130,246,0.1)', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>💰 {cc.fee}</span>
                    )}
                    {cc.timeInvolved && cc.timeInvolved !== 'Not Specified' && (
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>⏱ {cc.timeInvolved}</span>
                    )}
                  </div>
                </div>
                {cc.remarks && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--accent)', marginTop: '0.5rem' }}>↳ {cc.remarks}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/courses" className="btn-secondary">← All Courses</Link>
        <Link href="/update-profile" className="btn-secondary">Change State / Stream</Link>
      </div>
    </div>
  )
}
