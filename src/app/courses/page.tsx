import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import ExpandableCourseCard from '../../components/ExpandableCourseCard'

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ stream?: string; sort?: string; state?: string; feeMax?: string }>
}) {
  const resolvedParams = await searchParams
  const c = await cookies()

  // State: prefer URL param, then cookie, then no filter
  const stateParam = resolvedParams.state || c.get('user_state')?.value || ''
  const stream = resolvedParams.stream || undefined
  const sort = resolvedParams.sort || 'title_asc'
  const feeMax = resolvedParams.feeMax ? parseInt(resolvedParams.feeMax) : undefined

  let orderBy: any = { title: 'asc' }
  if (sort === 'title_desc') orderBy = { title: 'desc' }

  const courses = await prisma.course.findMany({
    where: {
      ...(stream ? { stream } : {}),
    },
    orderBy,
    include: {
      colleges: {
        include: { college: true },
        where: stateParam ? { college: { state: stateParam } } : undefined,
      }
    }
  })

  // Filter out courses with no colleges in state (when state filter is active)
  const filteredCourses = stateParam
    ? courses.filter(course => course.colleges.length > 0)
    : courses

  // Further filter by fee if provided
  const displayCourses = feeMax
    ? filteredCourses.map(course => ({
        ...course,
        colleges: course.colleges.filter(cc => {
          if (!cc.fee || cc.fee === 'Not Specified') return true
          const feeNum = parseInt(cc.fee.replace(/[^0-9]/g, ''))
          return isNaN(feeNum) || feeNum <= feeMax
        })
      })).filter(c => c.colleges.length > 0)
    : filteredCourses

  // Collect all unique states from current results for filter dropdown
  const allStates = await prisma.college.groupBy({ by: ['state'], orderBy: { state: 'asc' } })
  const stateList = allStates.map(s => s.state).filter((s): s is string => !!s && s !== 'Unknown')

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'var(--primary)' }}>
            Available Courses {stream ? `— ${stream}` : ''}
          </h1>
          {stateParam && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
              Showing colleges in: <strong style={{ color: 'var(--accent)' }}>{stateParam}</strong>
              &nbsp;·&nbsp;<a href={`/courses${stream ? `?stream=${stream}` : ''}`} style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>Show all states</a>
            </p>
          )}
        </div>
      </div>

      {/* Filters bar */}
      <form method="GET" className="filters-bar">
        {stream && <input type="hidden" name="stream" value={stream} />}
        <select name="sort" className="form-control filter-input" defaultValue={sort}>
          <option value="title_asc">Name A→Z</option>
          <option value="title_desc">Name Z→A</option>
        </select>
        <select name="state" className="form-control filter-input" defaultValue={stateParam}>
          <option value="">All States</option>
          {stateList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="stream" className="form-control filter-input" defaultValue={stream || ''}>
          <option value="">All Streams</option>
          <option value="SCIENCE">Science</option>
          <option value="COMMERCE">Commerce</option>
          <option value="ARTS">Arts</option>
          <option value="VOCATIONAL">Vocational</option>
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

      {displayCourses.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', marginTop: '2rem' }}>
          No courses found for the selected filters.
          {stateParam && <> Try removing the state filter or <a href="/courses" style={{ color: 'var(--primary)' }}>view all</a>.</>}
        </p>
      ) : (
        <div className="grid-cards">
          {displayCourses.map((course) => (
            <div key={course.id} className="glass-panel animate-slide-up" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>{course.title}</h3>
                <span className="stream-badge">{course.stream}</span>
                {course.basicSubjects && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.8rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {course.basicSubjects}
                  </p>
                )}
              </div>
              <a href={`/course/${course.id}`} className="btn-primary" style={{ marginTop: '1.2rem', textDecoration: 'none', fontSize: '0.83rem', padding: '0.5rem 1rem' }}>
                View Course Details →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
