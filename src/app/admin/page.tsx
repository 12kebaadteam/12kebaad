import { cookies } from 'next/headers'
import { login, logout, uploadCSV, uploadTestsCSV, updateCourse, deleteCourse, addRecommendation, deleteRecommendation } from './actions'
import prisma from '../../../lib/prisma'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedParams = await searchParams
  const c = await cookies()
  const auth = c.get('admin_auth')?.value

  if (auth !== 'true') {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '400px', margin: '4rem auto' }}>
        <div className="glass-panel">
          <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Admin Secure Login</h2>
          {resolvedParams.error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', background: 'rgba(239,68,68,0.1)', padding: '0.5rem', borderRadius: '4px' }}>Invalid credentials</p>}
          <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Username</label>
              <input type="text" name="username" className="form-control" placeholder="Default: admin" required />
            </div>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Password</label>
              <input type="password" name="password" className="form-control" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Authenticate</button>
          </form>
        </div>
      </div>
    )
  }

  const [dbUsers, dbCourses, dbColleges, dbTests, dbRecs] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.college.count(),
    prisma.entranceTest.count(),
    prisma.recommendation.count(),
  ])

  const [recentUsers, allCourses, allColleges, allTests, allRecs] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
    prisma.course.findMany({ orderBy: { title: 'asc' } }),
    prisma.college.findMany({ orderBy: { name: 'asc' } }),
    prisma.entranceTest.findMany({ orderBy: { name: 'asc' } }),
    prisma.recommendation.findMany({ orderBy: { adminRank: 'asc' }, include: { college: true } }),
  ])

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ color: 'var(--primary)' }}>Database Dashboard</h1>
        <form action={logout}>
          <button type="submit" className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>Secure Logout</button>
        </form>
      </div>

      {/* Stats */}
      <div className="grid-cards" style={{ marginBottom: '3rem' }}>
        {[
          { label: 'Students Registered', value: dbUsers, color: 'var(--primary)' },
          { label: 'Courses in DB', value: dbCourses, color: 'var(--accent)' },
          { label: 'Colleges in DB', value: dbColleges, color: 'var(--primary)' },
          { label: 'Entrance Tests', value: dbTests, color: 'var(--accent)' },
          { label: 'Recommendations', value: dbRecs, color: 'var(--primary)' },
        ].map(s => (
          <div key={s.label} className="glass-panel" style={{ borderTop: `4px solid ${s.color}`, padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.label}</h3>
            <p style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Students */}
      <div className="glass-panel" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Recent Student Registrations</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                {['Name', 'Contact', 'Stream', 'State', 'Registered'].map(h => (
                  <th key={h} style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.8rem' }}>{u.name}</td>
                  <td style={{ padding: '0.8rem' }}>{u.contactInfo}</td>
                  <td style={{ padding: '0.8rem' }}>{u.stream}</td>
                  <td style={{ padding: '0.8rem' }}>{u.state}</td>
                  <td style={{ padding: '0.8rem', color: 'var(--accent)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentUsers.length === 0 && <tr><td colSpan={5} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No students yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Courses */}
      <div className="glass-panel" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Manage Courses</h2>
        <div style={{ overflowX: 'auto', maxHeight: '380px' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-color)' }}>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>Title</th>
                <th style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>Stream</th>
                <th style={{ padding: '0.8rem', color: 'var(--text-muted)', width: '140px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCourses.map(course => (
                <tr key={course.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.8rem' }}>
                    <form id={`edit-${course.id}`} action={updateCourse}>
                      <input type="hidden" name="id" value={course.id} />
                      <input type="text" name="title" defaultValue={course.title} className="form-control" style={{ width: '100%', padding: '0.3rem' }} required />
                    </form>
                  </td>
                  <td style={{ padding: '0.8rem' }}>
                    <select name="stream" form={`edit-${course.id}`} defaultValue={course.stream} className="form-control" style={{ padding: '0.3rem' }}>
                      {['SCIENCE','COMMERCE','ARTS','VOCATIONAL'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                    <button type="submit" form={`edit-${course.id}`} className="btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Save</button>
                    <form action={deleteCourse}>
                      <input type="hidden" name="id" value={course.id} />
                      <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '99px', fontSize: '0.8rem', cursor: 'pointer' }}>Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
              {allCourses.length === 0 && <tr><td colSpan={3} style={{ padding: '1rem', color: 'var(--text-muted)' }}>No courses.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entrance Tests Table */}
      <div className="glass-panel" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Entrance Tests in Database</h2>
        <div style={{ overflowX: 'auto', maxHeight: '300px' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-color)' }}>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                {['Name', 'Full Form', 'Suitability', 'Eligibility', 'Remarks'].map(h => (
                  <th key={h} style={{ padding: '0.7rem', color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allTests.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.7rem', fontWeight: 600 }}>{t.name}</td>
                  <td style={{ padding: '0.7rem', color: 'var(--text-muted)' }}>{t.fullForm}</td>
                  <td style={{ padding: '0.7rem', color: 'var(--accent)' }}>{t.suitability}</td>
                  <td style={{ padding: '0.7rem', color: 'var(--text-muted)' }}>{t.eligibility}</td>
                  <td style={{ padding: '0.7rem', color: 'var(--text-muted)' }}>{t.extraRemarks || '—'}</td>
                </tr>
              ))}
              {allTests.length === 0 && <tr><td colSpan={5} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No entrance tests yet. Upload CSV below.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Colleges CSV */}
      <div className="glass-panel" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Upload Colleges &amp; Courses CSV</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
          Columns: <code>collegeName, state, courseTitle, stream, fee, timeInvolved, remarks, detailedAddress</code>
        </p>
        <form action={uploadCSV} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <input type="file" name="csv" accept=".csv" className="form-control" style={{ flex: 1, minWidth: '250px' }} required />
          <button type="submit" className="btn-primary">Import to Database</button>
        </form>
      </div>

      {/* Upload Entrance Tests CSV */}
      <div className="glass-panel" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Upload Entrance Tests CSV</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
          Columns: <code>NAME, FULL FORM, SUITABILITY, ELIGIBILITY, EXTRA REMARKS</code>
        </p>
        <form action={uploadTestsCSV} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <input type="file" name="testsCsv" accept=".csv" className="form-control" style={{ flex: 1, minWidth: '250px' }} required />
          <button type="submit" className="btn-primary">Import Entrance Tests</button>
        </form>
      </div>

      {/* Recommendations Manager */}
      <div className="glass-panel" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Manage Recommendations</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          Rank colleges for students. These appear in the &ldquo;Our Recommendations&rdquo; tab, filtered by student's state and stream.
        </p>

        {/* Add recommendation form */}
        <form action={addRecommendation} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'flex-end', marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: '2', minWidth: '180px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>College</label>
            <select name="collegeId" className="form-control" required style={{ padding: '0.5rem' }}>
              <option value="">Select college…</option>
              {allColleges.map(col => <option key={col.id} value={col.id}>{col.name} — {col.state}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '80px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rank</label>
            <input type="number" name="adminRank" className="form-control" placeholder="1" min={1} required style={{ padding: '0.5rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: '1', minWidth: '130px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stream (optional)</label>
            <select name="targetStream" className="form-control" style={{ padding: '0.5rem' }}>
              <option value="">All Streams</option>
              {['SCIENCE','COMMERCE','ARTS','VOCATIONAL'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: '3', minWidth: '200px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reason / Note</label>
            <input type="text" name="reason" className="form-control" placeholder="Why we recommend this college…" style={{ padding: '0.5rem' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.2rem', alignSelf: 'flex-end' }}>Add</button>
        </form>

        {/* Existing recommendations */}
        {allRecs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {allRecs.map(r => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--accent)', minWidth: '2rem' }}>#{r.adminRank}</span>
                <span style={{ flex: 1, fontSize: '0.9rem' }}>{r.college.name}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.college.state}</span>
                {r.targetStream && <span className="stream-badge">{r.targetStream}</span>}
                {r.reason && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', flex: 2 }}>&ldquo;{r.reason}&rdquo;</span>}
                <form action={deleteRecommendation}>
                  <input type="hidden" name="id" value={r.id} />
                  <button type="submit" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '99px', fontSize: '0.78rem', cursor: 'pointer' }}>Remove</button>
                </form>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No recommendations yet. Add one above.</p>
        )}
      </div>
    </div>
  )
}
