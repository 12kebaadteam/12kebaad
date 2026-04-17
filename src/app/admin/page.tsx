import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"
import { uploadCSV, uploadTestsCSV, uploadProfessionalCSV, updateCourse, deleteCourse, addRecommendation, deleteRecommendation, deleteCollegesByState, deleteEntranceTest, deleteProfessionalCourse, answerQuestion, deleteQuestion, deleteAllProfessionalCourses, deleteAllEntranceTests } from './actions'
import prisma from '../../../lib/prisma'
import AdminLogin from './AdminLogin'
import LogoutButton from './LogoutButton'

const BinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

const binBtnStyle: React.CSSProperties = {
  background: 'rgba(239,68,68,0.12)',
  color: '#ef4444',
  border: '1px solid rgba(239,68,68,0.25)',
  padding: '0.35rem 0.55rem',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s',
  lineHeight: 1,
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; deleteError?: string; deleteSuccess?: string; tab?: string }>
}) {
  const resolvedParams = await searchParams
  const session = await getServerSession(authOptions)
  const activeTab = resolvedParams.tab || 'overview'

  if (!session) {
    return (
      <AdminLogin error={resolvedParams.error} />
    )
  }

  const [dbUsers, dbCourses, dbColleges, dbTests, dbRecs, dbProfCourses, dbQuestions] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.college.count(),
    prisma.entranceTest.count(),
    prisma.recommendation.count(),
    prisma.professionalCourse.count(),
    prisma.question.count({ where: { isAnswered: false } }),
  ])

  const [allUsers, allCourses, allColleges, allTests, allRecs, stateGroups, allProfCourses, pendingQuestions, answeredQuestions] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.course.findMany({ orderBy: { title: 'asc' } }),
    prisma.college.findMany({ orderBy: { name: 'asc' } }),
    prisma.entranceTest.findMany({ orderBy: { name: 'asc' } }),
    prisma.recommendation.findMany({ orderBy: { adminRank: 'asc' }, include: { college: true } }),
    prisma.college.groupBy({ by: ['state'], orderBy: { state: 'asc' } }),
    prisma.professionalCourse.findMany({ orderBy: { name: 'asc' } }),
    prisma.question.findMany({ where: { isAnswered: false }, orderBy: { createdAt: 'asc' }, include: { user: { select: { name: true } } } }),
    prisma.question.findMany({ where: { isAnswered: true }, orderBy: { answeredAt: 'desc' }, take: 20, include: { user: { select: { name: true } } } }),
  ])

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: `Students (${dbUsers})` },
    { id: 'questions', label: `Q&A${dbQuestions > 0 ? ` 🔴 ${dbQuestions}` : ''}` },
    { id: 'courses', label: 'Courses' },
    { id: 'tests', label: 'Tests' },
    { id: 'profcourses', label: 'Prof. Courses' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'upload', label: 'Upload CSV' },
    { id: 'danger', label: '⚠️ Danger' },
  ]

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1050px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ color: 'var(--primary)' }}>Database Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
        {tabs.map(tab => (
          <a
            key={tab.id}
            href={`/admin?tab=${tab.id}`}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: activeTab === tab.id ? 700 : 500,
              textDecoration: 'none',
              color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
              background: activeTab === tab.id ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'transparent',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </a>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="grid-cards" style={{ marginBottom: '3rem' }}>
          {[
            { label: 'Students Registered', value: dbUsers, color: 'var(--primary)' },
            { label: 'Courses in DB', value: dbCourses, color: 'var(--accent)' },
            { label: 'Colleges in DB', value: dbColleges, color: 'var(--primary)' },
            { label: 'Entrance Tests', value: dbTests, color: 'var(--accent)' },
            { label: 'Prof. Courses', value: dbProfCourses, color: 'var(--primary)' },
            { label: 'Pending Questions', value: dbQuestions, color: dbQuestions > 0 ? '#ef4444' : 'var(--accent)' },
          ].map(s => (
            <div key={s.label} className="glass-panel" style={{ borderTop: `4px solid ${s.color}`, padding: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.label}</h3>
              <p style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── STUDENTS TAB ── */}
      {activeTab === 'users' && (
        <div className="glass-panel" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <h2 style={{ color: 'var(--accent)' }}>All Students ({allUsers.length})</h2>
            <a
              href="/api/admin/export-users"
              className="btn-primary"
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.82rem', textDecoration: 'none' }}
            >
              ⬇ Export CSV
            </a>
          </div>
          <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '480px' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-color)', zIndex: 1 }}>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  {['Name', 'Contact', 'Mobile', 'Stream', 'State', 'Registered'].map(h => (
                    <th key={h} style={{ padding: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allUsers.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.8rem', whiteSpace: 'nowrap' }}>{u.name}</td>
                    <td style={{ padding: '0.8rem', wordBreak: 'break-all', fontSize: '0.85rem' }}>{u.contactInfo}</td>
                    <td style={{ padding: '0.8rem', whiteSpace: 'nowrap', fontFamily: 'monospace', letterSpacing: '0.03em' }}>
                      {u.mobile || <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>—</span>}
                    </td>
                    <td style={{ padding: '0.8rem', whiteSpace: 'nowrap' }}>{u.stream}</td>
                    <td style={{ padding: '0.8rem', whiteSpace: 'nowrap' }}>{u.state}</td>
                    <td style={{ padding: '0.8rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
                {allUsers.length === 0 && <tr><td colSpan={6} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No students yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Q&A TAB ── */}
      {activeTab === 'questions' && (
        <div style={{ marginBottom: '3rem' }}>
          {/* Pending questions */}
          <div className="glass-panel" style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>⏳ Pending Questions ({pendingQuestions.length})</h2>
            {pendingQuestions.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No pending questions. 🎉</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {pendingQuestions.map(q => (
                  <div key={q.id} style={{ padding: '1rem', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px' }}>
                    <p style={{ fontWeight: 600, marginBottom: '0.3rem', fontSize: '0.92rem' }}>{q.question}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                      Asked by <strong>{q.user.name}</strong> · {new Date(q.createdAt).toLocaleDateString('en-IN')}
                    </p>
                    <form action={answerQuestion} style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                      <input type="hidden" name="id" value={q.id} />
                      <textarea
                        name="answer"
                        className="form-control"
                        placeholder="Type your answer here…"
                        required
                        rows={2}
                        style={{ flex: 1, minWidth: '220px', resize: 'vertical', fontSize: '0.85rem', padding: '0.5rem 0.8rem' }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button type="submit" className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>Answer</button>
                        <form action={deleteQuestion}>
                          <input type="hidden" name="id" value={q.id} />
                          <button type="submit" aria-label="Delete question" title="Delete question" style={binBtnStyle}><BinIcon /></button>
                        </form>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Answered questions */}
          <div className="glass-panel">
            <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>✅ Answered Questions ({answeredQuestions.length})</h2>
            {answeredQuestions.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No answered questions yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '480px', overflowY: 'auto' }}>
                {answeredQuestions.map(q => (
                  <div key={q.id} style={{ padding: '1rem', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>Q: {q.question}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>A: {q.answer}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {q.user.name} · {q.answeredAt ? new Date(q.answeredAt).toLocaleDateString('en-IN') : ''}
                      </p>
                    </div>
                    <form action={deleteQuestion}>
                      <input type="hidden" name="id" value={q.id} />
                      <button type="submit" aria-label="Delete" title="Delete" style={binBtnStyle}><BinIcon /></button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MANAGE COURSES TAB ── */}
      {activeTab === 'courses' && (
        <div className="glass-panel" style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Manage Courses</h2>
          <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '460px' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-color)', zIndex: 1 }}>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>Title</th>
                  <th style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>Stream</th>
                  <th style={{ padding: '0.8rem', color: 'var(--text-muted)', width: '120px' }}>Actions</th>
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
                        {['SCIENCE', 'COMMERCE', 'ARTS', 'VOCATIONAL'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button type="submit" form={`edit-${course.id}`} className="btn-primary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}>Save</button>
                      <form action={deleteCourse}>
                        <input type="hidden" name="id" value={course.id} />
                        <button type="submit" aria-label="Delete course" title="Delete course" style={binBtnStyle}><BinIcon /></button>
                      </form>
                    </td>
                  </tr>
                ))}
                {allCourses.length === 0 && <tr><td colSpan={3} style={{ padding: '1rem', color: 'var(--text-muted)' }}>No courses.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── ENTRANCE TESTS TAB ── */}
      {activeTab === 'tests' && (
        <div className="glass-panel" style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Entrance Tests in Database</h2>
          <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '460px' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.88rem', minWidth: '500px' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-color)', zIndex: 1 }}>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  {['Name', 'Full Form', 'Suitability', 'Eligibility', 'Remarks', ''].map(h => (
                    <th key={h} style={{ padding: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allTests.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.7rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{t.name}</td>
                    <td style={{ padding: '0.7rem', color: 'var(--text-muted)' }}>{t.fullForm}</td>
                    <td style={{ padding: '0.7rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{t.suitability}</td>
                    <td style={{ padding: '0.7rem', color: 'var(--text-muted)' }}>{t.eligibility}</td>
                    <td style={{ padding: '0.7rem', color: 'var(--text-muted)' }}>{t.extraRemarks || '—'}</td>
                    <td style={{ padding: '0.7rem' }}>
                      <form action={deleteEntranceTest}>
                        <input type="hidden" name="id" value={t.id} />
                        <button type="submit" aria-label="Delete test" title="Delete test" style={binBtnStyle}><BinIcon /></button>
                      </form>
                    </td>
                  </tr>
                ))}
                {allTests.length === 0 && <tr><td colSpan={6} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No entrance tests yet. Upload CSV below.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PROFESSIONAL COURSES TAB ── */}
      {activeTab === 'profcourses' && (
        <div className="glass-panel" style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Professional Courses in Database</h2>
          <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '460px' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.88rem', minWidth: '500px' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-color)', zIndex: 1 }}>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  {['Name', 'Full Form', 'Eligibility', 'Fees', 'Duration', ''].map(h => (
                    <th key={h} style={{ padding: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allProfCourses.map((p: any) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.7rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.name}</td>
                    <td style={{ padding: '0.7rem', color: 'var(--text-muted)' }}>{p.fullForm}</td>
                    <td style={{ padding: '0.7rem', color: 'var(--text-muted)' }}>{p.eligibility}</td>
                    <td style={{ padding: '0.7rem', color: 'var(--primary)', whiteSpace: 'nowrap' }}>{p.fees}</td>
                    <td style={{ padding: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{p.duration}</td>
                    <td style={{ padding: '0.7rem' }}>
                      <form action={deleteProfessionalCourse}>
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit" aria-label="Delete" title="Delete" style={binBtnStyle}><BinIcon /></button>
                      </form>
                    </td>
                  </tr>
                ))}
                {allProfCourses.length === 0 && <tr><td colSpan={6} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No professional courses yet. Upload CSV below.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── RECOMMENDATIONS TAB ── */}
      {activeTab === 'recommendations' && (
        <div className="glass-panel" style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Manage Recommendations</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            Rank colleges for students. These appear in the &ldquo;Our Recommendations&rdquo; tab.
          </p>

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
                {['SCIENCE', 'COMMERCE', 'ARTS', 'VOCATIONAL'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: '3', minWidth: '200px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reason / Note</label>
              <input type="text" name="reason" className="form-control" placeholder="Why we recommend this college…" style={{ padding: '0.5rem' }} />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.2rem', alignSelf: 'flex-end' }}>Add</button>
          </form>

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
                    <button type="submit" aria-label="Remove" title="Remove" style={binBtnStyle}><BinIcon /></button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No recommendations yet. Add one above.</p>
          )}
        </div>
      )}

      {/* ── UPLOAD TAB ── */}
      {activeTab === 'upload' && (
        <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <div className="glass-panel">
            <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Upload Professional Courses CSV</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              Columns: <code>NAME, FULL FORM, ELIGIBILITY, ESTIMATED FEES, ESTIMATED TIME, CAREER OPPORTUNITIES, EXTRA REMARKS</code>
            </p>
            <form action={uploadProfessionalCSV} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <input type="file" name="profCsv" accept=".csv" className="form-control" style={{ flex: 1, minWidth: '250px' }} required />
              <button type="submit" className="btn-primary">Import Prof. Courses</button>
            </form>
          </div>

          <div className="glass-panel">
            <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Upload Colleges &amp; Courses CSV</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              Columns: <code>collegeName, state, courseTitle, stream, fee, timeInvolved, remarks, detailedAddress</code>
            </p>
            <form action={uploadCSV} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <input type="file" name="csv" accept=".csv" className="form-control" style={{ flex: 1, minWidth: '250px' }} required />
              <button type="submit" className="btn-primary">Import to Database</button>
            </form>
          </div>

          <div className="glass-panel">
            <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Upload Entrance Tests CSV</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              Columns: <code>NAME, FULL FORM, SUITABILITY, ELIGIBILITY, EXTRA REMARKS</code>
            </p>
            <form action={uploadTestsCSV} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <input type="file" name="testsCsv" accept=".csv" className="form-control" style={{ flex: 1, minWidth: '250px' }} required />
              <button type="submit" className="btn-primary">Import Entrance Tests</button>
            </form>
          </div>
        </div>
      )}

      {/* ── DANGER TAB ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ borderLeft: '4px solid #ef4444' }}>
            <h2 style={{ color: '#ef4444', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚠️</span> Administrative Actions
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              To remove all data for a specific state, select it from the menu and confirm by typing the required text.
            </p>

            {resolvedParams.deleteError && (
              <p style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.6rem 1rem', borderRadius: '8px', marginBottom: '1.2rem', fontSize: '0.88rem', border: '1px solid rgba(239,68,68,0.2)' }}>
                ✕ Confirmation text did not match. No data was deleted.
              </p>
            )}
            {resolvedParams.deleteSuccess && (
              <p style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '0.6rem 1rem', borderRadius: '8px', marginBottom: '1.2rem', fontSize: '0.88rem', border: '1px solid rgba(34,197,94,0.2)' }}>
                ✓ State data deleted successfully.
              </p>
            )}

            <form action={deleteCollegesByState} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', alignItems: 'flex-end' }}>
              <div className="form-group">
                <label>Select State to Delete</label>
                <select name="state" className="form-control" required>
                  <option value="">Choose state…</option>
                  {stateGroups.map((sg: any) => (
                    <option key={sg.state} value={sg.state}>{sg.state}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Type <code>DELETE [state]</code> to confirm</label>
                <input type="text" name="confirm" className="form-control" placeholder="e.g. DELETE Punjab" required />
              </div>
              <div className="form-group">
                <label>Verify Admin Password (2FA)</label>
                <input type="password" name="verifyPassword" className="form-control" placeholder="Your password" required />
              </div>
              <button type="submit" className="btn-primary" style={{ background: '#ef4444', border: 'none', height: '48px', fontWeight: 700 }}>
                Permanently Delete Data
              </button>
            </form>
          </div>

          <div className="grid-cards" style={{ gap: '1.5rem' }}>
            <div className="glass-panel" style={{ borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Nuke Prof. Courses</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.2rem' }}>Immediately delete all data in the Professional Courses table.</p>
              <form action={deleteAllProfessionalCourses}>
                <button type="submit" className="btn-primary" style={{ background: '#ef4444', border: 'none', width: '100%' }} onClick={(e) => !confirm('QUITE SURE? This wipes ALL Professional Courses!') && e.preventDefault()}>
                  DELETE ALL PROF. COURSES
                </button>
              </form>
            </div>
            <div className="glass-panel" style={{ borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Nuke Entrance Tests</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.2rem' }}>Immediately delete all data in the Entrance Tests table.</p>
              <form action={deleteAllEntranceTests}>
                <button type="submit" className="btn-primary" style={{ background: '#ef4444', border: 'none', width: '100%' }} onClick={(e) => !confirm('QUITE SURE? This wipes ALL Entrance Tests!') && e.preventDefault()}>
                  DELETE ALL ENTRANCE TESTS
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
