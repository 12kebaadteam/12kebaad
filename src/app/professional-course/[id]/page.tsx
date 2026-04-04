import prisma from '../../../../lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ProfessionalCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const course = await prisma.professionalCourse.findUnique({
    where: { id },
  })

  if (!course) notFound()

  return (
    <div className="animate-fade-in" style={{ maxWidth: '860px', margin: '0 auto' }}>
      <Link href="/professional-courses" className="back-link">← Back to all professional courses</Link>

      {/* Header */}
      <div className="glass-panel animate-slide-up" style={{ marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', background: 'rgba(59,130,246,0.1)', borderRadius: '0 0 0 12px', borderLeft: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
           <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.05em' }}>PROFESSIONAL CERTIFIED</span>
        </div>
        
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem', color: 'var(--text-main)' }}>{course.name}</h1>
        <p style={{ color: 'var(--accent)', fontSize: '1.05rem', fontWeight: 500, marginBottom: '1.5rem' }}>{course.fullForm}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Estimated Fees</h4>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>{course.fees}</div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Estimated Time</h4>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>{course.duration}</div>
          </div>
        </div>
      </div>

      {/* Main Details */}
      <div className="grid-cards" style={{ gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        
        <div className="glass-panel animate-slide-up">
           <h2 style={{ fontSize: '1.1rem', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <span>🎓</span> Eligibility Criteria
           </h2>
           <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>{course.eligibility}</p>
        </div>

        <div className="glass-panel animate-slide-up">
           <h2 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <span>💼</span> Career Opportunities
           </h2>
           <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>{course.opportunities}</p>
        </div>

        {course.extraRemarks && (
          <div className="glass-panel animate-slide-up" style={{ background: 'rgba(255,255,255,0.02)' }}>
             <h2 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <span>📝</span> Extra Remarks
             </h2>
             <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem', fontStyle: 'italic' }}>{course.extraRemarks}</p>
          </div>
        )}

      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <Link href="/professional-courses" className="btn-secondary">← Back to Listing</Link>
        <Link href="/update-profile" className="btn-secondary">Change State / Stream</Link>
      </div>
    </div>
  )
}
