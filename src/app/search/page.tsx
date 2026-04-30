import { prisma } from '@/lib/prisma'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tab?: string }>
}) {
  const resolved = await searchParams
  const query = resolved.q?.trim() || ''
  const tab = resolved.tab || 'careers'

  if (!query) {
    return (
      <div className="animate-fade-in">
        <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Search</h1>
        <p style={{ color: 'var(--text-muted)' }}>Enter a search term to find colleges, courses, or entrance tests.</p>
      </div>
    )
  }

  // Case-insensitive: mode: 'insensitive' works on PostgreSQL.
  // For SQLite, contains is already case-insensitive by default for ASCII.
  // We also do a JS-level filter as a fallback for both engines.
  const lower = query.toLowerCase()

  const [allColleges, allCourses, allTests, allProfCourses, allCareers] = await Promise.all([
    prisma.college.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { state: { contains: query, mode: 'insensitive' } },
        ]
      },
      take: 20,
    }),
    prisma.course.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { stream: { contains: query, mode: 'insensitive' } },
          { basicSubjects: { contains: query, mode: 'insensitive' } },
          { useCase: { contains: query, mode: 'insensitive' } },
        ]
      },
      take: 20,
    }),
    prisma.entranceTest.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { fullForm: { contains: query, mode: 'insensitive' } },
          { suitability: { contains: query, mode: 'insensitive' } },
          { eligibility: { contains: query, mode: 'insensitive' } },
        ]
      },
      take: 20,
    }),
    prisma.professionalCourse.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { fullForm: { contains: query, mode: 'insensitive' } },
          { opportunities: { contains: query, mode: 'insensitive' } },
          { eligibility: { contains: query, mode: 'insensitive' } },
        ]
      },
      take: 20,
    }),
    prisma.career.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ]
      },
      take: 20,
    }),
  ])

  // JS-level fallback for SQLite which ignores 'mode'
  const colleges = allColleges.filter(c =>
    c.name.toLowerCase().includes(lower) || (c.state || '').toLowerCase().includes(lower)
  )

  const courses = allCourses.filter(c =>
    c.title.toLowerCase().includes(lower) ||
    c.stream.toLowerCase().includes(lower) ||
    (c.basicSubjects || '').toLowerCase().includes(lower) ||
    (c.useCase || '').toLowerCase().includes(lower)
  )

  const tests = allTests.filter(t =>
    t.name.toLowerCase().includes(lower) ||
    t.fullForm.toLowerCase().includes(lower) ||
    t.suitability.toLowerCase().includes(lower) ||
    t.eligibility.toLowerCase().includes(lower)
  )

  const profCourses = allProfCourses.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.fullForm.toLowerCase().includes(lower) ||
    p.opportunities.toLowerCase().includes(lower) ||
    p.eligibility.toLowerCase().includes(lower)
  )

  const careers = allCareers.filter(c =>
    c.name.toLowerCase().includes(lower) ||
    c.description.toLowerCase().includes(lower)
  )

  const total = colleges.length + courses.length + tests.length + profCourses.length + careers.length

  return (
    <div className="animate-fade-in">
      <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Search Results</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Results for &ldquo;<strong style={{ color: 'var(--text-main)' }}>{query}</strong>&rdquo;
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <a 
          href={`/search?q=${encodeURIComponent(query)}&tab=careers`} 
          style={{ 
            padding: '0.5rem 1rem', 
            textDecoration: 'none', 
            color: tab === 'careers' ? 'var(--primary)' : 'var(--text-muted)', 
            borderBottom: tab === 'careers' ? '2px solid var(--primary)' : '2px solid transparent',
            fontWeight: tab === 'careers' ? 'bold' : 'normal'
          }}
        >
          Careers ({careers.length})
        </a>
        <a 
          href={`/search?q=${encodeURIComponent(query)}&tab=colleges`} 
          style={{ 
            padding: '0.5rem 1rem', 
            textDecoration: 'none', 
            color: tab === 'colleges' ? 'var(--primary)' : 'var(--text-muted)', 
            borderBottom: tab === 'colleges' ? '2px solid var(--primary)' : '2px solid transparent',
            fontWeight: tab === 'colleges' ? 'bold' : 'normal'
          }}
        >
          Colleges ({colleges.length})
        </a>
      </div>

      {tab === 'colleges' && (
        <>
          {colleges.length > 0 ? (
            <section style={{ marginBottom: '2.5rem' }}>
              <div className="grid-cards">
                {colleges.map(c => (
                  <a key={c.id} href={`/college/${c.id}`} style={{ textDecoration: 'none' }}>
                    <div className="glass-panel search-result-card">
                      <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{c.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.state}</p>
                      {c.address && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{c.address}</p>}
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.5rem', display: 'block' }}>View details →</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No colleges found.</p>
          )}
        </>
      )}

      {tab === 'careers' && (
        <>
          {careers.length > 0 ? (
            <section style={{ marginBottom: '2.5rem' }}>
              <div className="grid-cards">
                {careers.map(c => (
                  <a key={c.id} href={`/career/${c.id}`} style={{ textDecoration: 'none' }}>
                    <div className="glass-panel search-result-card">
                      <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{c.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Stream: {c.stream}</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.5rem', display: 'block' }}>View details →</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No careers found.</p>
          )}
        </>
      )}

      {(tab === 'careers' && careers.length === 0) || (tab === 'colleges' && colleges.length === 0) ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', marginTop: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Try a different keyword or browse the tabs above.</p>
        </div>
      ) : null}
    </div>
  )
}
