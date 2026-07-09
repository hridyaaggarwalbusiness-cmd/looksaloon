import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useReviewSubmissions } from '../hooks/useReviewSubmissions'

const NAV_ITEMS = [
  { to: '/', label: 'Overview', end: true },
  { to: '/bookings', label: 'Bookings' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/photos', label: 'Photos' },
  { to: '/content', label: 'Site Content' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/settings', label: 'Settings' },
]

function Layout() {
  const { user, logout } = useAuth()
  const { submissions } = useReviewSubmissions()

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="26" height="26">
              <path d="M24 4c6 6 6 14 0 20-6-6-6-14 0-20Z" fill="currentColor" />
              <path d="M24 22c0 10-6 16-16 20 4-10 6-16 16-20Z" fill="currentColor" opacity="0.7" />
              <path d="M24 22c0 10 6 16 16 20-4-10-6-16-16-20Z" fill="currentColor" opacity="0.45" />
            </svg>
          </span>
          <span className="brand-text">
            Looks <em>Saloon</em>
          </span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {item.label}
              {item.to === '/feedback' && submissions.length > 0 && (
                <span className="sidebar-nav-badge">{submissions.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span className="sidebar-user-avatar">{(user?.email || '?')[0].toUpperCase()}</span>
            <span className="sidebar-user-email">{user?.email}</span>
          </div>
          <button type="button" className="btn btn-ghost btn-sm btn-block" onClick={logout}>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
