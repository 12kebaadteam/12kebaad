'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

interface LoginButtonProps {
  callbackUrl?: string
  label?: string
}

export default function LoginButton({ callbackUrl, label }: LoginButtonProps) {
  const { data: session } = useSession()
  const destination = callbackUrl || '/onboarding/qualification'

  if (session) {
    return (
      <Link
        href={destination}
        className="btn-primary"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          padding: '1rem 2rem',
          fontSize: '1rem',
          textDecoration: 'none',
          width: '100%',
        }}
      >
        Continue as {session.user?.name?.split(' ')[0]} →
      </Link>
    )
  }

  return (
    <button
      onClick={() => signIn('google', { callbackUrl: destination })}
      className="btn-primary"
      style={{
        background: 'var(--bg-card)',
        color: 'var(--text-main)',
        border: '1.5px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '1rem 2rem',
        fontSize: '1rem',
        width: '100%',
        cursor: 'pointer',
        fontWeight: '700',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.2s ease',
      }}
    >
      <img src="https://authjs.dev/img/providers/google.svg" width="22" height="22" alt="" aria-hidden="true" />
      {label || 'Continue with Google'}
    </button>
  )
}
