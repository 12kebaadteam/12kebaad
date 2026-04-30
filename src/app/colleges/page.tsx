import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import ExpandableCollegeCard from '../../components/ExpandableCollegeCard'

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; state?: string; feeMax?: string }>
}) {
  const resolvedParams = await searchParams
  const c = await cookies()

  const stateParam = resolvedParams.state || c.get('user_state')?.value || ''
  const sort = resolvedParams.sort || 'name_asc'
  const feeMax = resolvedParams.feeMax ? parseInt(resolvedParams.feeMax) : undefined

  let orderBy: any = {}
  if (sort === 'name_asc') orderBy = { name: 'asc' }
  else if (sort === 'state_asc') orderBy = { state: 'asc' }
  else if (sort === 'placements_desc') orderBy = { placements: 'desc' }
  else if (sort === 'fees_asc') orderBy = { fees: 'asc' }

  const colleges = await prisma.college.findMany({
    where: stateParam ? { state: stateParam } : undefined,
    orderBy,
    include: {
      courses: {
        include: { course: true }
      }
    }
  })

  // Fee filter: keep colleges that have at least one course within fee range
  const displayColleges = feeMax
    ? colleges.filter(college =>
        college.courses.some(cc => {
          if (!cc.fee || cc.fee === 'Not Specified') return true
          const n = parseInt(cc.fee.replace(/[^0-9]/g, ''))
          return isNaN(n) || n <= feeMax
        })
      )
    : colleges

  const allStates = await prisma.college.groupBy({ by: ['state'], orderBy: { state: 'asc' } })
  const stateList = allStates.map(s => s.state).filter((s): s is string => !!s && s !== 'Unknown')

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'var(--accent)' }}>Top Colleges</h1>
          {stateParam && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
              Filtered by state: <strong style={{ color: 'var(--accent)' }}>{stateParam}</strong>
              &nbsp;·&nbsp;<a href="/colleges" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>Show all states</a>
            </p>
          )}
        </div>
      </div>

      {/* Filters bar */}
      <form method="GET" className="filters-bar">
        <select name="sort" className="form-control filter-input" defaultValue={sort}>
          <option value="name_asc">Name A→Z</option>
          <option value="state_asc">State A→Z</option>
          <option value="placements_desc">Highest Placements</option>
          <option value="fees_asc">Lowest Fees</option>
        </select>
        <select name="state" className="form-control filter-input" defaultValue={stateParam}>
          <option value="">All States</option>
          {stateList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="feeMax" className="form-control filter-input" defaultValue={resolvedParams.feeMax || ''}>
          <option value="">Any Fee</option>
          <option value="50000">Under ₹50,000</option>
          <option value="100000">Under ₹1 Lakh</option>
          <option value="200000">Under ₹2 Lakh</option>
          <option value="500000">Under ₹5 Lakh</option>
        </select>
        <button type="submit" className="btn-primary filter-btn">Apply Filters</button>
      </form>

      {displayColleges.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', marginTop: '2rem' }}>
          No colleges found for the selected filters.
          {stateParam && <> <a href="/colleges" style={{ color: 'var(--primary)' }}>Clear filters</a>.</>}
        </p>
      ) : (
        <div className="grid-cards">
          {displayColleges.map((college) => (
            <div key={college.id} className="glass-panel animate-slide-up" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{college.name}</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>📍 {college.location}, {college.state}</p>
              </div>
              <a href={`/college/${college.id}`} className="btn-primary" style={{ marginTop: '1.2rem', textDecoration: 'none', fontSize: '0.83rem', padding: '0.5rem 1rem' }}>
                View College Details →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
