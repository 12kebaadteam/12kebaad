import prisma from '../../../lib/prisma'
import Link from 'next/link'

export default async function ProfessionalCoursesPage() {
  const courses = await prisma.professionalCourse.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent)' }}>Professional Courses</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>
          Explore specialized professional certifications and career-oriented programs.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No professional courses found in the database yet.</p>
        </div>
      ) : (
        <div className="grid-cards">
          {courses.map((course) => (
            <div key={course.id} className="glass-panel animate-slide-up" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>{course.name}</h3>
                <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>{course.fullForm}</p>
                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                   <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '99px', color: 'var(--text-muted)' }}>
                    ⏱ {course.duration}
                  </span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(59,130,246,0.1)', padding: '0.2rem 0.6rem', borderRadius: '99px', color: 'var(--primary)' }}>
                    💰 {course.fees}
                  </span>
                </div>
              </div>
              <Link href={`/professional-course/${course.id}`} className="btn-primary" style={{ marginTop: '1.5rem', textDecoration: 'none', fontSize: '0.83rem', padding: '0.5rem 1rem' }}>
                View Full Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
