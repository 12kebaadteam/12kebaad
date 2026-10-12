import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import LoginButton from '../../components/LoginButton'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sign In to 12kebaad | Your Career Journey Starts Here",
  description: "Sign in to access your personalized career roadmap, saved careers, and college recommendations.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function FormPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const resolvedParams = await searchParams
  const callbackUrl = resolvedParams.callbackUrl
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect(callbackUrl || "/onboarding/qualification")
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'radial-gradient(circle at top right, rgba(232, 99, 10, 0.06), transparent 50%), radial-gradient(circle at bottom left, rgba(30, 58, 95, 0.06), transparent 50%)',
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Card */}
        <div className="glass-panel animate-fade-in" style={{
          padding: '2.5rem 2rem',
          textAlign: 'center',
          borderTop: '4px solid var(--primary)',
        }}>

          {/* Logo & Brand */}
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
            <img src="/logo.png" alt="12kebaad Logo" style={{ height: '40px', borderRadius: '8px' }} />
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.03em' }}>12kebaad</span>
          </Link>

          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            color: 'var(--primary)',
            marginBottom: '0.6rem',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
          }}>
            Your career roadmap<br />
            <span style={{ color: 'var(--accent)' }}>awaits you.</span>
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}>
            Sign in with Google to save your personalized career matches,
            bookmark opportunities, and track your progress — completely free.
          </p>

          {/* Value points */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            marginBottom: '2rem',
            textAlign: 'left',
          }}>
            {[
              '✦ Personalized career roadmap based on your interests',
              '✦ Save and compare 1,270+ careers across all streams',
              '✦ Top college recommendations matched to your profile',
            ].map((point, i) => (
              <div key={i} style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                padding: '0.5rem 0.75rem',
                background: 'var(--bg-offset)',
                borderRadius: '10px',
                border: '1px solid var(--border)',
              }}>
                {point}
              </div>
            ))}
          </div>

          {/* Sign-in button */}
          <LoginButton callbackUrl={callbackUrl} />

          {/* Legal */}
          <p style={{
            marginTop: '1.5rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
          }}>
            By signing in, you agree to our{' '}
            <Link href="/terms" style={{ color: 'var(--primary)', fontWeight: '600' }}>Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" style={{ color: 'var(--primary)', fontWeight: '600' }}>Privacy Policy</Link>.
            We use Google Sign-In only — no passwords stored.
          </p>
        </div>

        {/* Back link */}
        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem' }}>
          <Link href="/careers" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            ← Continue browsing without an account
          </Link>
        </p>
      </div>
    </div>
  )
}
