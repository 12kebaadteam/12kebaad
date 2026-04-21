import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@/lib/prisma";
import { approveComment, deleteComment } from "../actions";

export default async function CommentsPage() {
  const comments = await prisma.comment.findMany({
    include: { career: true, course: true, user: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <AdminLayout>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ color: "var(--primary)" }}>Moderation: Comments</h1>
      </div>
      <div className="glass-panel" style={{ overflowX: "auto" }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>User / Email</th>
              <th style={{ padding: '1rem' }}>Target</th>
              <th style={{ padding: '1rem' }}>Comment</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '1rem', textAlign: 'center' }}>No comments yet</td></tr>
            )}
            {comments.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{c.user?.name || 'Anonymous'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.user?.email || 'N/A'}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                  {c.career ? `Career: ${c.career.name}` : (c.course ? `Course: ${c.course.title}` : 'Unknown')}
                </td>
                <td style={{ padding: '1rem', maxWidth: '300px' }}>{c.text}</td>
                <td style={{ padding: '1rem', color: c.status === 'APPROVED' ? '#10b981' : '#f59e0b' }}>{c.status}</td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                   {c.status === 'PENDING' && (
                     <form action={approveComment}>
                        <input type="hidden" name="id" value={c.id} />
                        <button className="btn-primary" style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: '100%' }}>Approve</button>
                     </form>
                   )}
                   <form action={deleteComment}>
                      <input type="hidden" name="id" value={c.id} />
                      <button className="btn-secondary" style={{ color: '#ef4444', borderColor: '#ef4444', padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: '100%' }}>Delete un-pleasant</button>
                   </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
