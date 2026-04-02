import prisma from '../../../lib/prisma'
import Link from 'next/link'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() || ''

  if (!query) {
    return (
      <div className="animate-fade-in">
        <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Search</h1>
        <p style={{ color: 'var(--text-muted)' }}>Enter a search term to find colleges, courses, or entrance tests.</p>
      </div>
    )
  }

  const [colleges, courses, tests] = await Promise.all([
    prisma.college.findMany({
      where: { OR: [{ name: { contains: query } }, { state: { contains: query } }] },
      take: 6,
    }),
    prisma.course.findMany({
      where: { OR: [{ title: { contains: query } }, { stream: { contains: query } }] },
      take: 6,
    }),
    prisma.entranceTest.findMany({
      where: { OR: [{ name: { contains: query } }, { fullForm: { contains: query } }, { suitability: { contains: query } }] },
      take: 6,
    }),
  ])

  const total = colleges.length + courses.length + tests.length

  return (
    <div className="animate-fade-in">
      <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Search Results</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        {total} result{total !== 1 ? 's' : ''} for &ldquo;<strong style={{ color: 'var(--text-main)' }}>{query}</strong>&rdquo;
      </p>

      {colleges.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '1.1rem' }}>Colleges ({colleges.length})</h2>
          <div className="grid-cards">
            {colleges.map(c => (
              <div key={c.id} className="glass-panel" style={{ padding: '1.2rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{c.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.state}</p>
                {c.address && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{c.address}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {courses.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Courses ({courses.length})</h2>
          <div className="grid-cards">
            {courses.map(c => (
              <div key={c.id} className="glass-panel" style={{ padding: '1.2rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{c.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Stream: {c.stream}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tests.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '1.1rem' }}>Entrance Tests ({tests.length})</h2>
          <div className="grid-cards">
            {tests.map(t => (
              <div key={t.id} className="glass-panel" style={{ padding: '1.2rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{t.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.fullForm}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.3rem' }}>{t.suitability}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {total === 0 && (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No results found for &ldquo;{query}&rdquo;</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Try a different keyword or browse the tabs above.</p>
        </div>
      )}
    </div>
  )
}
