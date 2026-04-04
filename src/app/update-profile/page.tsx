import prisma from '../../../lib/prisma'
import { cookies } from 'next/headers'
import { updateProfile } from './actions'

export default async function UpdateProfilePage() {
  const c = await cookies()
  const currentState = c.get('user_state')?.value || ''
  const currentStream = c.get('user_stream')?.value || ''

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
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Change your state or stream to get updated recommendations.
        </p>
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
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button type="submit" className="btn-primary">Save &amp; Browse Courses</button>
            <a href="/colleges" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', alignSelf: 'center', textDecoration: 'none' }}>
              Browse Colleges instead →
            </a>
          </div>
        </form>

        {currentState || currentStream ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
            Current: <strong style={{ color: 'var(--text-main)' }}>{currentState || 'All States'}</strong> ·{' '}
            <strong style={{ color: 'var(--text-main)' }}>{currentStream || 'All Streams'}</strong>
          </p>
        ) : null}
      </div>
    </div>
  )
}
