import prisma from '../../../lib/prisma'

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const resolvedParams = await searchParams;
  const sort = resolvedParams.sort || 'ranking_asc';

  let orderBy: any = {};
  if (sort === 'ranking_asc') orderBy = { ranking: 'asc' };
  else if (sort === 'ranking_desc') orderBy = { ranking: 'desc' };
  else if (sort === 'name_asc') orderBy = { name: 'asc' };
  else if (sort === 'state_asc') orderBy = { state: 'asc' };

  const colleges = await prisma.college.findMany({
    orderBy,
    include: {
      courses: {
        include: {
          course: true
        }
      }
    }
  });

  return (
    <div className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ color: "var(--accent)" }}>Top Colleges</h1>
        <form method="GET" style={{ display: "flex", gap: "1rem" }}>
          <select name="sort" className="form-control" defaultValue={sort} style={{ width: "220px" }}>
            <option value="ranking_asc">Rank (Highest First)</option>
            <option value="ranking_desc">Rank (Lowest First)</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="state_asc">State (A-Z)</option>
          </select>
          <button type="submit" className="btn-primary" style={{ padding: "0.5rem 1rem" }}>Sort / Rank</button>
        </form>
      </div>

      <div className="grid-cards">
        {colleges.map((college) => (
          <div key={college.id} className="glass-panel animate-slide-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <h3 style={{ maxWidth: "70%" }}>{college.name}</h3>
              {college.ranking && (
                <span style={{ background: "var(--primary)", padding: "0.2rem 0.8rem", borderRadius: "99px", fontSize: "0.8rem", fontWeight: "bold" }}>
                  Rank #{college.ranking}
                </span>
              )}
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>
              <strong style={{ color: "var(--text-main)" }}>State:</strong> {college.state}
            </p>
            {college.address && (
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                <strong style={{ color: "var(--text-main)" }}>Address:</strong> {college.address}
              </p>
            )}
            {!college.address && <div style={{ marginBottom: "1rem" }} />}
            <div style={{ marginTop: "1rem", borderTop: "1px solid var(--glass-border)", paddingTop: "1rem" }}>
              <strong style={{ fontSize: "0.9rem" }}>Popular Courses:</strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                {college.courses.slice(0, 4).map(cc => (
                  <span key={cc.courseId} style={{ background: "rgba(255,255,255,0.1)", padding: "0.3rem 0.6rem", borderRadius: "4px", fontSize: "0.75rem" }}>
                    {cc.course.title}
                  </span>
                ))}
                {college.courses.length === 0 && <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>None listed</span>}
              </div>
            </div>
          </div>
        ))}
        {colleges.length === 0 && (
          <p style={{ color: "var(--text-muted)" }}>No colleges available in the database.</p>
        )}
      </div>
    </div>
  )
}
