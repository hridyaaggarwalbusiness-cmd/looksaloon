import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { firebaseReady } from '../firebase'

function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
    } catch {
      setError('Incorrect email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="30" height="30">
              <path d="M24 4c6 6 6 14 0 20-6-6-6-14 0-20Z" fill="currentColor" />
              <path d="M24 22c0 10-6 16-16 20 4-10 6-16 16-20Z" fill="currentColor" opacity="0.7" />
              <path d="M24 22c0 10 6 16 16 20-4-10-6-16-16-20Z" fill="currentColor" opacity="0.45" />
            </svg>
          </span>
          <span className="brand-text">
            Looks <em>Saloon</em>
          </span>
        </div>
        <p className="login-subtitle">Studio Admin Dashboard</p>

        {!firebaseReady && (
          <p className="login-warning">
            Firebase is not configured for this build. Set the VITE_FIREBASE_* environment
            variables and redeploy.
          </p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@lookssaloon.com"
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
