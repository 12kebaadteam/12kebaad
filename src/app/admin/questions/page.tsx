import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@/lib/prisma";
import { answerQuestion, deleteQuestion } from "../actions";

export default async function AdminQuestionsPage() {
  const questions = await prisma.question.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <AdminLayout>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ color: "var(--primary)" }}>Q&A Manager</h1>
      </div>
      <div className="glass-panel" style={{ overflowX: "auto" }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>User Info</th>
              <th style={{ padding: '1rem' }}>Question</th>
              <th style={{ padding: '1rem' }}>Status / Answer</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.length === 0 && (
               <tr><td colSpan={4} style={{ padding: '1rem', textAlign: 'center' }}>No questions</td></tr>
            )}
            {questions.map(q => (
              <tr key={q.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{q.user?.name || q.userEmail || 'Anonymous'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{q.user?.email || ''}</div>
                </td>
                <td style={{ padding: '1rem' }}>{q.text}</td>
                <td style={{ padding: '1rem' }}>
                  {q.isAnswered ? (
                    <div style={{ color: '#10b981', fontSize: '0.9rem' }}>{q.answer}</div>
                  ) : (
                    <form action={answerQuestion} style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                      <input type="hidden" name="id" value={q.id} />
                      <textarea name="answer" required className="form-control" placeholder="Type answer..." rows={2}></textarea>
                      <button className="btn-primary" style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem' }}>Answer</button>
                    </form>
                  )}
                </td>
                <td style={{ padding: '1rem' }}>
                   <form action={deleteQuestion}>
                      <input type="hidden" name="id" value={q.id} />
                      <button className="btn-secondary" style={{ color: '#ef4444', borderColor: '#ef4444', padding: '0.3rem 0.5rem', fontSize: '0.8rem' }}>Delete</button>
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
