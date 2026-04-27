import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { submitForm } from './actions'
import { prisma } from '@/lib/prisma'
import LoginButton from '../../components/LoginButton'
import Link from 'next/link'

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
  
  if (session) {
    redirect("/onboarding/qualification")
  }

  return (
    <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="animate-fade-in" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '20px', 
            background: 'var(--bg-offset)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto',
            border: '1px solid var(--border)'
          }}>
            <img src="/logo.png" alt="Logo" style={{ width: '40px' }} />
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.75rem' }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Sign in to access your career roadmap, saved matches, and personalized guidance.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <LoginButton />
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              By signing in, you agree to our <Link href="/terms" style={{ color: 'var(--primary)', fontWeight: '600' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: 'var(--primary)', fontWeight: '600' }}>Privacy Policy</Link>.
            </p>
          </div>
        </div>
        
        {session && (
          <div className="animate-slide-up" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/onboarding/qualification" className="btn-primary" style={{ width: '100%' }}>
              Continue to Onboarding →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
