import prisma from '../../../lib/prisma'
import ExpandableProfCourseCard from '../../components/ExpandableProfCourseCard'

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
            <ExpandableProfCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
