import prisma from '../../../lib/prisma'

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ stream?: string, sort?: string }>
}) {
  const resolvedParams = await searchParams;
  const stream = resolvedParams.stream || undefined;
  const sort = resolvedParams.sort || 'title_asc';

  let orderBy: any = { title: 'asc' };
  if (sort === 'title_desc') orderBy = { title: 'desc' };

  const courses = await prisma.course.findMany({
    where: {
      ...(stream ? { stream } : {})
    },
    orderBy,
    include: {
      colleges: {
        include: {
          college: true
        }
      }
    }
  });

  return (
    <div className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ color: "var(--primary)" }}>Available Courses {stream ? `for ${stream}` : ''}</h1>
        <form method="GET" style={{ display: "flex", gap: "1rem" }}>
          {stream && <input type="hidden" name="stream" value={stream} />}
          <select name="sort" className="form-control" defaultValue={sort} style={{ width: "200px" }}>
            <option value="title_asc">Name (A-Z)</option>
            <option value="title_desc">Name (Z-A)</option>
          </select>
          <button type="submit" className="btn-primary" style={{ padding: "0.5rem 1rem" }}>Sort</button>
        </form>
      </div>

      {courses.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>No courses found in the database. (Admin can add them!)</p>
      ) : (
        <div className="grid-cards">
          {courses.map((course) => (
            <div key={course.id} className="glass-panel animate-slide-up">
              <h3 style={{ marginBottom: "0.5rem" }}>{course.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--primary)", marginBottom: "1rem" }}>Stream: {course.stream}</p>
              
              {course.basicSubjects && (
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  <strong style={{ color: "var(--text-main)" }}>Subjects:</strong> {course.basicSubjects}
                </p>
              )}
              {course.useCase && (
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                  <strong style={{ color: "var(--text-main)" }}>Career/Job Uses:</strong> {course.useCase}
                </p>
              )}
              
              <div style={{ marginTop: "1rem", borderTop: "1px solid var(--glass-border)", paddingTop: "1rem" }}>
                <strong style={{ fontSize: "0.9rem" }}>Colleges Offering ({course.colleges.length}):</strong>
                <ul style={{ fontSize: "0.85rem", color: "var(--text-muted)", listStyleType: "none", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {course.colleges.slice(0, 3).map(cc => (
                    <li key={cc.collegeId}>
                      • {cc.college.name} {cc.fee && cc.fee !== 'Not Specified' ? `| Est. Fee: ${cc.fee}` : ''} {cc.timeInvolved && cc.timeInvolved !== 'Not Specified' ? `| Time: ${cc.timeInvolved}` : ''}
                      {cc.remarks && <div style={{marginLeft: "1rem", fontSize: "0.8rem", color: "var(--accent)"}}>Remark: {cc.remarks}</div>}
                    </li>
                  ))}
                  {course.colleges.length > 3 && <li>...and {course.colleges.length - 3} more</li>}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
