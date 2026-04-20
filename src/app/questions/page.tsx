import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { submitQuestion } from './actions'

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>
}) {
  const { submitted } = await searchParams
  const c = await cookies()
  const userId = c.get('user_id')?.value

  // Fetch all answered questions (visible to everyone, no personal info)
  const answeredQuestions = await prisma.question.findMany({
    where: { isAnswered: true },
    orderBy: { answeredAt: 'desc' },
    select: {
      id: true,
      text: true,
      answer: true,
      answeredAt: true,
    },
  })

  // If user is logged in, fetch their own questions (including unanswered)
  const myQuestions = userId
    ? await prisma.question.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { id: true, text: true, answer: true, isAnswered: true, createdAt: true, answeredAt: true },
      })
    : []

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)' }}>Ask a Question</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
          Have doubts about courses, colleges or career paths? Ask our team — we'll answer shortly.
        </p>
      </div>

      {/* Success message */}
      {submitted && (
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '12px', padding: '1rem 1.4rem', marginBottom: '2rem', color: '#4ade80', fontSize: '0.92rem' }}>
          ✓ Your question has been submitted! We'll answer it soon and you'll be able to see the response here.
        </div>
      )}

      {/* Ask a question form (users only) */}
      {userId ? (
        <div className="glass-panel animate-slide-up" style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '1.1rem' }}>Submit Your Question</h2>
          <form action={submitQuestion} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <textarea
              name="question"
              className="form-control"
              placeholder="Type your question about courses, colleges, entrance tests, career paths…"
              required
              minLength={10}
              maxLength={500}
              rows={3}
              style={{ resize: 'vertical' }}
            />
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              Submit Question →
            </button>
          </form>
        </div>
      ) : (
        <div className="glass-panel" style={{ marginBottom: '2.5rem', textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            You need to register first to submit a question.
          </p>
          <a href="/form" className="btn-primary">Register / Sign In</a>
        </div>
      )}

      {/* My Questions */}
      {myQuestions.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '1.05rem' }}>Your Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myQuestions.map(q => (
              <div key={q.id} className="glass-panel" style={{ padding: '1.2rem' }}>
                <p style={{ fontWeight: 600, marginBottom: q.isAnswered ? '0.8rem' : '0.3rem' }}>
                  🙋 {q.text}
                </p>
                {q.isAnswered ? (
                  <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', padding: '0.9rem 1.1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, marginBottom: '0.3rem' }}>✅ Answered by Team 12kebaad</p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>{q.answer}</p>
                    {q.answeredAt && (
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                        {new Date(q.answeredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏳ Awaiting response from our team…</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All answered Q&A visible to everyone */}
      <div>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1.2rem', fontSize: '1.05rem' }}>
          Community Q&amp;A ({answeredQuestions.length})
        </h2>
        {answeredQuestions.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>No answered questions yet. Be the first to ask!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {answeredQuestions.map((q, i) => (
              <div key={q.id} className="glass-panel animate-slide-up" style={{ padding: '1.4rem', animationDelay: `${i * 0.04}s` }}>
                <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.8rem', fontSize: '0.97rem' }}>
                  Q: {q.text}
                </p>
                <div style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', padding: '0.9rem 1.1rem' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.3rem' }}>A: Team 12kebaad</p>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>{q.answer}</p>
                </div>
                {q.answeredAt && (
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
                    {new Date(q.answeredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
