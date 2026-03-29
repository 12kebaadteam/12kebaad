import { cookies } from 'next/headers'
import { login, logout, uploadCSV, updateCourse, deleteCourse } from './actions'
import prisma from '../../../lib/prisma'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedParams = await searchParams;
  const c = await cookies()
  const auth = c.get('admin_auth')?.value

  if (auth !== 'true') {
    return (
      <div className="animate-fade-in" style={{ maxWidth: "400px", margin: "4rem auto" }}>
        <div className="glass-panel">
          <h2 style={{ color: "var(--accent)", marginBottom: "1.5rem" }}>Admin Secure Login</h2>
          {resolvedParams.error && <p style={{ color: "#ef4444", marginBottom: "1rem", fontSize: "0.9rem", background: "rgba(239, 68, 68, 0.1)", padding: "0.5rem", borderRadius: "4px" }}>Invalid credentials</p>}
          <form action={login} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div className="form-group" style={{ marginBottom: "0" }}>
              <label>Username</label>
              <input type="text" name="username" className="form-control" placeholder="Default: admin" required />
            </div>
            <div className="form-group" style={{ marginBottom: "0" }}>
              <label>Password</label>
              <input type="password" name="password" className="form-control" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>Authenticate</button>
          </form>
        </div>
      </div>
    )
  }

  // Admin Dashboard View
  const dbUsers = await prisma.user.count()
  const dbCourses = await prisma.course.count()
  const dbColleges = await prisma.college.count()
  
  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  })

  const allCourses = await prisma.course.findMany({
    orderBy: { title: 'asc' }
  })

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1000px", margin: "2rem auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ color: "var(--primary)" }}>Database Dashboard</h1>
        <form action={logout}>
          <button type="submit" className="btn-primary" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", color: "var(--text-main)" }}>Secure Logout</button>
        </form>
      </div>

      <div className="grid-cards" style={{ marginBottom: "3rem" }}>
        <div className="glass-panel" style={{ borderTop: "4px solid var(--primary)", padding: "1.5rem" }}>
           <h3 style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Total Students Registered</h3>
           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--text-main)" }}>{dbUsers}</p>
        </div>
        <div className="glass-panel" style={{ borderTop: "4px solid var(--accent)", padding: "1.5rem" }}>
           <h3 style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Total Courses in DB</h3>
           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--text-main)" }}>{dbCourses}</p>
        </div>
        <div className="glass-panel" style={{ borderTop: "4px solid var(--primary)", padding: "1.5rem" }}>
           <h3 style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Total Colleges in DB</h3>
           <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--text-main)" }}>{dbColleges}</p>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "var(--accent)", marginBottom: "1rem" }}>Recent Student Registrations (Traffic Insight)</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <th style={{ padding: "0.8rem", color: "var(--text-muted)" }}>Name</th>
                <th style={{ padding: "0.8rem", color: "var(--text-muted)" }}>Contact</th>
                <th style={{ padding: "0.8rem", color: "var(--text-muted)" }}>Stream</th>
                <th style={{ padding: "0.8rem", color: "var(--text-muted)" }}>State</th>
                <th style={{ padding: "0.8rem", color: "var(--text-muted)" }}>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.8rem" }}>{u.name}</td>
                  <td style={{ padding: "0.8rem" }}>{u.contactInfo}</td>
                  <td style={{ padding: "0.8rem" }}>{u.stream}</td>
                  <td style={{ padding: "0.8rem" }}>{u.state}</td>
                  <td style={{ padding: "0.8rem", color: "var(--accent)" }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr><td colSpan={5} style={{ padding: "1rem", textAlign: "center", color: "var(--text-muted)" }}>No students registered yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "var(--accent)", marginBottom: "1rem" }}>Manage Courses</h2>
        <div style={{ overflowX: "auto", maxHeight: "400px" }}>
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", top: 0, background: "var(--bg-color)" }}>
              <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <th style={{ padding: "0.8rem", color: "var(--text-muted)" }}>Course Title</th>
                <th style={{ padding: "0.8rem", color: "var(--text-muted)" }}>Stream</th>
                <th style={{ padding: "0.8rem", color: "var(--text-muted)", width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCourses.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.8rem" }}>
                    <form id={`edit-${c.id}`} action={updateCourse}>
                      <input type="hidden" name="id" value={c.id} />
                      <input type="text" name="title" defaultValue={c.title} className="form-control" style={{ width: "100%", padding: "0.3rem" }} required />
                    </form>
                  </td>
                  <td style={{ padding: "0.8rem" }}>
                    <select name="stream" form={`edit-${c.id}`} defaultValue={c.stream} className="form-control" style={{ padding: "0.3rem" }}>
                      <option value="SCIENCE">SCIENCE</option>
                      <option value="COMMERCE">COMMERCE</option>
                      <option value="ARTS">ARTS</option>
                      <option value="VOCATIONAL">VOCATIONAL</option>
                    </select>
                  </td>
                  <td style={{ padding: "0.8rem", display: "flex", gap: "0.5rem" }}>
                    <button type="submit" form={`edit-${c.id}`} className="btn-primary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>Save</button>
                    <form action={deleteCourse}>
                      <input type="hidden" name="id" value={c.id} />
                      <button type="submit" style={{ background: "#ef4444", color: "#fff", border: "none", padding: "0.3rem 0.6rem", borderRadius: "99px", fontSize: "0.8rem", cursor: "pointer" }}>Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
              {allCourses.length === 0 && <tr><td colSpan={3} style={{ padding: "1rem" }}>No courses found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-panel">
        <h2 style={{ color: "var(--accent)", marginBottom: "1rem" }}>Upload Dataset (CSV)</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          Upload a CSV file to batch insert Colleges and Courses. Required columns: <code>collegeName, state, courseTitle, stream, fee, timeInvolved, remarks</code>. Empty columns will be assigned a default fallback value.
        </p>
        <form action={uploadCSV} style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <input type="file" name="csv" accept=".csv" className="form-control" style={{ flex: 1, minWidth: "250px" }} required />
          <button type="submit" className="btn-primary">
            Import to Database
          </button>
        </form>
      </div>
    </div>
  )
}
