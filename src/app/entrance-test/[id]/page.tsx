import prisma from '../../../../lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function EntranceTestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const test = await prisma.entranceTest.findUnique({
    where: { id },
  })

  if (!test) notFound()

  return (
    <div className="animate-fade-in" style={{ maxWidth: '860px', margin: '0 auto' }}>
      <Link href="/entrance-tests" className="back-link">← Back to all entrance tests</Link>

      {/* Header */}
      <div className="glass-panel animate-slide-up" style={{ marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', background: 'rgba(139,92,246,0.1)', borderRadius: '0 0 0 12px', borderLeft: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
           <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.05em' }}>NATIONAL ENTRANCE EXAM</span>
        </div>
        
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem', color: 'var(--text-main)' }}>{test.name}</h1>
        <p style={{ color: 'var(--primary)', fontSize: '1.05rem', fontWeight: 500, marginBottom: '1.5rem' }}>{test.fullForm}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Suitability</h4>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>{test.suitability}</div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Eligibility</h4>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>{test.eligibility}</div>
          </div>
        </div>
      </div>

      {/* Main Details */}
      <div className="grid-cards" style={{ gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        
        <div className="glass-panel animate-slide-up">
           <h2 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <span>📋</span> Eligibility Details
           </h2>
           <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>{test.eligibility}</p>
        </div>

        {test.extraRemarks && (
          <div className="glass-panel animate-slide-up">
             <h2 style={{ fontSize: '1.1rem', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <span>📝</span> Extra Remarks & Info
             </h2>
             <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>{test.extraRemarks}</p>
          </div>
        )}

      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <Link href="/entrance-tests" className="btn-secondary">← Back to Listing</Link>
        <Link href="/update-profile" className="btn-secondary">Change State / Stream</Link>
      </div>
    </div>
  )
}
