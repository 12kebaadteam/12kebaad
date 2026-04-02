import prisma from '../../../lib/prisma'
import { cookies } from 'next/headers'

export default async function RecommendationsPage() {
  const c = await cookies()
  const userState = c.get('user_state')?.value || ''
  const userStream = c.get('user_stream')?.value || ''

  // Get admin-curated recommendations, ordered by their adminRank
  const recommendations = await prisma.recommendation.findMany({
    orderBy: { adminRank: 'asc' },
    include: { college: true },
  })

  // Filter by user's state and stream if available
  const filtered = recommendations.filter(r => {
    const stateMatch = !userState || r.college.state === userState
    const streamMatch = !userStream || !r.targetStream || r.targetStream === userStream
    return stateMatch && streamMatch
  })

  const hasUserContext = userState || userStream

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ color: 'var(--accent)' }}>Our Recommendations</h1>
        {hasUserContext ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            Personalised for your profile
            {userState && <> · <strong style={{ color: 'var(--accent)' }}>{userState}</strong></>}
            {userStream && <> · <strong style={{ color: 'var(--primary)' }}>{userStream}</strong></>}
            &nbsp;·&nbsp;<a href="/form" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>Change profile</a>
          </p>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            <a href="/form" style={{ color: 'var(--primary)' }}>Fill your profile</a> to get personalised recommendations.
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            {hasUserContext
              ? 'No recommendations for your state/stream yet. Admin is working on it!'
              : 'No recommendations added yet.'}
          </p>
          {hasUserContext && (
            <a href="/colleges" style={{ color: 'var(--primary)', fontSize: '0.9rem', display: 'block', marginTop: '0.8rem' }}>
              Browse all colleges instead →
            </a>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1rem' }}>
          {filtered.map((rec, idx) => (
            <div key={rec.id} className="glass-panel animate-slide-up" style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', overflow: 'hidden', wordBreak: 'break-word' }}>
              <div style={{ minWidth: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem', flexShrink: 0 }}>
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{rec.college.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  📍 {rec.college.state}
                  {rec.college.ranking && <span style={{ marginLeft: '0.8rem', color: 'var(--accent)' }}>🏆 Rank #{rec.college.ranking}</span>}
                </p>
                {rec.targetStream && (
                  <span className="stream-badge" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>{rec.targetStream}</span>
                )}
                {rec.reason && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontStyle: 'italic' }}>
                    &ldquo;{rec.reason}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
