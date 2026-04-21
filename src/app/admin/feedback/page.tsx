import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@/lib/prisma";

export default async function FeedbackPage() {
  const feedbacks = await prisma.feedback.findMany({
    include: { career: true, user: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <AdminLayout>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ color: "var(--primary)" }}>AI Feedback Logs</h1>
      </div>
      <div className="glass-panel" style={{ overflowX: "auto" }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>User</th>
              <th style={{ padding: '1rem' }}>Career</th>
              <th style={{ padding: '1rem' }}>Sentiment</th>
              <th style={{ padding: '1rem' }}>Reason</th>
              <th style={{ padding: '1rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '1rem', textAlign: 'center' }}>No feedback yet</td></tr>
            )}
            {feedbacks.map(f => (
              <tr key={f.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{f.user?.email || 'Anonymous'}</td>
                <td style={{ padding: '1rem' }}>{f.career?.name || 'Unknown'}</td>
                <td style={{ padding: '1rem', color: f.isPositive ? '#10b981' : '#ef4444' }}>
                  {f.isPositive ? '👍 Positive' : '👎 Negative'}
                </td>
                <td style={{ padding: '1rem' }}>{f.reason || '-'}</td>
                <td style={{ padding: '1rem' }}>{f.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
