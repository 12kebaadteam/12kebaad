import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { submitForm } from './actions'
import { prisma } from '@/lib/prisma'
import LoginButton from '../../components/LoginButton'

export default async function FormPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const resolvedParams = await searchParams
  const callbackUrl = resolvedParams.callbackUrl
  const session = await getServerSession(authOptions)
  
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
      {callbackUrl && !session && (
        <div className="glass-panel animate-slide-up" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)', padding: '1rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
            <strong>Sign in required:</strong> Please tell us about yourself or sign in with Google to explore the website's features.
          </p>
        </div>
      )}
      <div className="glass-panel animate-slide-up">
        {session ? (
          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', border: '1px solid var(--primary)', wordBreak: 'break-word' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              👋 Logged in as <strong>{session.user?.name}</strong><br/>
              <span style={{opacity: 0.8, fontSize: '0.8rem'}}>{session.user?.email}</span>
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
              We've pre-filled your details below. Just tell us your state and stream!
            </p>
          </div>
        ) : (
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Tell us about yourself</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              We'll use this to recommend the best courses and colleges tailored for you.
            </p>
            <LoginButton />
            <LoginButton />
          </div>
        )}

        {session && (
          <form action={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <input type="hidden" name="callbackUrl" value={callbackUrl || ''} />
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" className="form-control" placeholder="Your full name" defaultValue={session?.user?.name || ''} required />
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo">Email Address</label>
            <input type="text" id="contactInfo" name="contactInfo" className="form-control" placeholder="you@example.com" defaultValue={session?.user?.email || ''} required />
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
        )}
      </div>
    </div>
  )
}
