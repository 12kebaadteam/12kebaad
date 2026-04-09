'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/admin' })} 
      className="btn-primary" 
      style={{ 
        background: 'rgba(255,255,255,0.05)', 
        border: '1px solid var(--glass-border)', 
        color: 'var(--text-main)' 
      }}
    >
      Secure Logout
    </button>
  )
}
