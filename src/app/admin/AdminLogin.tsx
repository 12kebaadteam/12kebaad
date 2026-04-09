'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function AdminLogin({ error }: { error?: string }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await signIn('credentials', {
      username,
      password,
      callbackUrl: '/admin',
    })
    setLoading(false)
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/admin' })
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '440px', margin: '4rem auto' }}>
      <div className="glass-panel">
        <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Access</h2>
        
        {error && (
          <p style={{ 
            color: '#ef4444', 
            marginBottom: '1rem', 
            fontSize: '0.9rem', 
            background: 'rgba(239,68,68,0.1)', 
            padding: '0.5rem', 
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            Invalid credentials
          </p>
        )}

        {/* Google Sign-In */}
        <button 
          onClick={handleGoogleSignIn}
          className="btn-primary" 
          style={{ 
            width: '100%', 
            marginBottom: '1.5rem', 
            background: '#fff', 
            color: '#000', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <img src="https://authjs.dev/img/providers/google.svg" width="20" height="20" alt="Google" />
          Sign in with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div className="form-group" style={{ marginBottom: '0' }}>
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              className="form-control" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email or Username" 
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0' }}>
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>
      </div>
    </div>
  )
}
