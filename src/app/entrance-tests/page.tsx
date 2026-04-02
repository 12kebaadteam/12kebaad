import prisma from '../../../lib/prisma'
import ExpandableTestCard from '../../components/ExpandableTestCard'

export default async function EntranceTestsPage({
  searchParams,
}: {
  searchParams: Promise<{ stream?: string; sort?: string }>
}) {
  const { stream, sort = 'name_asc' } = await searchParams

  let orderBy: any = { name: 'asc' }
  if (sort === 'name_desc') orderBy = { name: 'desc' }

  const tests = await prisma.entranceTest.findMany({
    where: stream ? { suitability: { contains: stream } } : undefined,
    orderBy,
  })

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ color: 'var(--primary)' }}>Entrance Tests</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem', fontSize: '0.9rem' }}>
          All major entrance examinations — eligibility, suitability, and key details.
        </p>
      </div>

      <form method="GET" className="filters-bar">
        <select name="sort" className="form-control filter-input" defaultValue={sort}>
          <option value="name_asc">Name A→Z</option>
          <option value="name_desc">Name Z→A</option>
        </select>
        <select name="stream" className="form-control filter-input" defaultValue={stream || ''}>
          <option value="">All Streams</option>
          <option value="SCIENCE">Science</option>
          <option value="COMMERCE">Commerce</option>
          <option value="ARTS">Arts</option>
          <option value="VOCATIONAL">Vocational</option>
        </select>
        <button type="submit" className="btn-primary filter-btn">Filter</button>
      </form>

      {tests.length === 0 ? (
        <div className="glass-panel" style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No entrance tests in database yet.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Admin can add them via the Admin panel.</p>
        </div>
      ) : (
        <div className="grid-cards">
          {tests.map(test => (
            <ExpandableTestCard key={test.id} test={test} />
          ))}
        </div>
      )}
    </div>
  )
}
