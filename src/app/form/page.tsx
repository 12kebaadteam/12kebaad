import { submitForm } from './actions'
import prisma from '../../../lib/prisma'

export default async function FormPage() {
  // Dynamically fetch only states that actually have colleges in the database
  // Using groupBy instead of distinct to reliably get unique states
  const groupedStates = await prisma.college.groupBy({
    by: ['state'],
    orderBy: { state: 'asc' },
  })

  // Filter out any blank states and sort them
  const validStates = groupedStates
    .map(c => c.state)
    .filter((s): s is string => !!s && s !== 'Unknown')

  // Fallback state if database is entirely empty so the component still renders cleanly
  const states = validStates.length > 0 ? validStates : [
    "No states with data available yet"
  ]

  return (
    <div className="animate-fade-in" style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <div className="glass-panel animate-slide-up">
        <h2 style={{ color: "var(--primary)", marginBottom: "1rem" }}>Tell us about yourself</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          We will use this information to recommend the best courses and colleges tailored exactly for you.
        </p>

        <form action={submitForm} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" className="form-control" placeholder="John Doe" required />
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo">Contact Info (Email/Phone)</label>
            <input type="text" id="contactInfo" name="contactInfo" className="form-control" placeholder="john@example.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="state">State / UT</label>
            <select id="state" name="state" className="form-control" required defaultValue="">
              <option value="" disabled>Select your state or UT</option>
              {states.map(s => <option key={s} value={s} disabled={s === "No states with data available yet"}>{s}</option>)}
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

          <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>
            Find My Path
          </button>
        </form>
      </div>
    </div>
  )
}
