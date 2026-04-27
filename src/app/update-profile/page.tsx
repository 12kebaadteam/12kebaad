import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { updateProfile, deleteAccount } from './actions'

export default async function UpdateProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const c = await cookies()
  const userId = c.get('user_id')?.value
  const currentState = c.get('user_state')?.value || ''
  const currentStream = c.get('user_stream')?.value || ''

  const user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null

  const groupedStates = await prisma.college.groupBy({
    by: ['state'],
    orderBy: { state: 'asc' },
  })
  const stateList = groupedStates
    .map(s => s.state)
    .filter((s): s is string => !!s && s !== 'Unknown')

  return (
    <div className="animate-fade-in" style={{ maxWidth: '520px', margin: '2rem auto' }}>
      <div className="glass-panel animate-slide-up">
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Update Your Preferences</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Change your state or stream to get updated recommendations.
        </p>

        {error === 'LimitReached' && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '0.8rem 1rem', marginBottom: '1.5rem', color: '#f87171', fontSize: '0.85rem' }}>
            ⚠️ Error: You have already changed your stream 5 times. Further changes are restricted to ensure data accuracy.
          </div>
        )}

        <form action={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label htmlFor="state">State / UT</label>
            <select id="state" name="state" className="form-control" defaultValue={currentState}>
              <option value="">All States</option>
              {stateList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="stream">Stream</label>
            <select id="stream" name="stream" className="form-control" defaultValue={currentStream}>
              <option value="">All Streams</option>
              <option value="SCIENCE">Science</option>
              <option value="COMMERCE">Commerce</option>
              <option value="ARTS">Arts</option>
              <option value="VOCATIONAL">Vocational</option>
            </select>
            {user && (
              <span style={{ fontSize: '0.75rem', color: user.streamChanges >= 4 ? '#f59e0b' : 'var(--text-muted)', marginTop: '0.3rem' }}>
                 {5 - user.streamChanges} stream changes remaining
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button type="submit" className="btn-primary">Save &amp; Browse Careers</button>
            <a href="/colleges" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', alignSelf: 'center', textDecoration: 'none' }}>
              Explore Colleges instead →
            </a>
          </div>
        </form>

        {(currentState || currentStream) ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
            Current Preference: <strong style={{ color: 'var(--text-main)' }}>{currentState || 'All States'}</strong> ·{' '}
            <strong style={{ color: 'var(--text-main)' }}>{currentStream || 'All Streams'}</strong>
          </p>
        ) : null}
      </div>
    </div>
  )
}
