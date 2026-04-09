'use client'

import { signIn, useSession } from 'next-auth/react'

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <a 
        href="/form" 
        className="btn-primary" 
        style={{ 
          background: 'rgba(255,255,255,0.05)', 
          border: '1px solid var(--glass-border)', 
          color: 'var(--text-main)', 
          padding: "1rem 2.5rem", 
          fontSize: "1.1rem",
          textDecoration: 'none'
        }}
      >
        Continue as {session.user?.name?.split(' ')[0]}
      </a>
    )
  }

  return (
    <button 
      onClick={() => signIn('google', { callbackUrl: '/form' })} 
      className="btn-primary" 
      style={{ 
        background: '#fff', 
        color: '#000', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '0.6rem',
        padding: "1rem 2.5rem", 
        fontSize: "1.1rem"
      }}
    >
      <img src="https://authjs.dev/img/providers/google.svg" width="22" height="22" alt="Google" />
      Sign in with Google
    </button>
  )
}
