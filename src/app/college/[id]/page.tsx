import prisma from '../../../../lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      courses: {
        include: { course: true },
        orderBy: { fee: 'asc' },
      }
    }
  })

  if (!college) notFound()

  return (
    <div className="animate-fade-in" style={{ maxWidth: '860px', margin: '0 auto' }}>
      {/* Back button */}
      <Link href="/colleges" className="back-link">← Back to all colleges</Link>

      {/* Header */}
      <div className="glass-panel animate-slide-up" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{college.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>📍 {college.state}</p>
            {college.address && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.3rem' }}>{college.address}</p>
            )}
          </div>
          {college.ranking && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '12px', padding: '0.8rem 1.2rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.1rem' }}>NATIONAL RANK</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>#{college.ranking}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Courses offered */}
      <div className="glass-panel animate-slide-up" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.2rem', fontSize: '1.1rem' }}>
          Courses Offered ({college.courses.length})
        </h2>
        {college.courses.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No courses listed for this college yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {college.courses.map(cc => (
              <div key={cc.courseId} style={{ padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '0.98rem', marginBottom: '0.3rem' }}>
                      <Link href={`/course/${cc.courseId}`} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>
                        {cc.course.title}
                      </Link>
                    </h3>
                    <span className="stream-badge">{cc.course.stream}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
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
        <Link href="/colleges" className="btn-secondary">← All Colleges</Link>
        <Link href="/update-profile" className="btn-secondary">Change State / Stream</Link>
      </div>
    </div>
  )
}
