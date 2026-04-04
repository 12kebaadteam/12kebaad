import prisma from '../../../lib/prisma'

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

  // Case-insensitive: mode: 'insensitive' works on PostgreSQL.
  // For SQLite, contains is already case-insensitive by default for ASCII.
  // We also do a JS-level filter as a fallback for both engines.
  const lower = query.toLowerCase()

  const [allColleges, allCourses, allTests, allProfCourses] = await Promise.all([
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

  const total = colleges.length + courses.length + tests.length + profCourses.length

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
      )}

      {courses.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Courses ({courses.length})</h2>
          <div className="grid-cards">
            {courses.map(c => (
              <a key={c.id} href={`/course/${c.id}`} style={{ textDecoration: 'none' }}>
                <div className="glass-panel search-result-card">
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{c.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Stream: {c.stream}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.5rem', display: 'block' }}>View details →</span>
                </div>
              </a>
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
                <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.3rem' }}>{t.suitability}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {profCourses.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Prof. Courses ({profCourses.length})</h2>
          <div className="grid-cards">
            {profCourses.map(p => (
              <a key={p.id} href={`/professional-course/${p.id}`} style={{ textDecoration: 'none' }}>
                <div className="glass-panel search-result-card">
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{p.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>{p.fullForm}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{p.duration}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.5rem', display: 'block' }}>View details →</span>
                </div>
              </a>
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
