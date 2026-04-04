import { submitForm } from './actions'
import prisma from '../../../lib/prisma'

export default async function FormPage() {
  const groupedStates = await prisma.college.groupBy({
    by: ['state'],
    orderBy: { state: 'asc' },
  })

  const validStates = groupedStates
    .map(c => c.state)
    .filter((s): s is string => !!s && s !== 'Unknown')

  const states = validStates.length > 0 ? validStates : ['No states with data available yet']

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="glass-panel animate-slide-up">
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Tell us about yourself</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          We'll use this to recommend the best courses and colleges tailored for you.
        </p>

        <form action={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" className="form-control" placeholder="Your full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo">Email Address</label>
            <input type="text" id="contactInfo" name="contactInfo" className="form-control" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              className="form-control"
              placeholder="+91 9876543210"
              pattern="[0-9+\s\-]{7,15}"
              title="Enter a valid mobile number"
            />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Optional</span>
          </div>

          <div className="form-group">
            <label htmlFor="state">State / UT</label>
            <select id="state" name="state" className="form-control" defaultValue="">
              <option value="">All States (show everything)</option>
              {states.map(s => (
                <option key={s} value={s} disabled={s === 'No states with data available yet'}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="stream">Stream in 12th</label>
            <select id="stream" name="stream" className="form-control" required defaultValue="">
              <option value="" disabled>Select your stream</option>
              <option value="SCIENCE">Science</option>
              <option value="COMMERCE">Commerce</option>
              <option value="ARTS">Arts</option>
              <option value="VOCATIONAL">Vocational</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            Find My Path →
          </button>
        </form>
      </div>
    </div>
  )
}
