import { Link } from 'react-router-dom'
import { useBookings } from '../hooks/useBookings'
import { useServices } from '../hooks/useServices'
import { useTestimonials } from '../hooks/useTestimonials'
import { useReviewSubmissions } from '../hooks/useReviewSubmissions'

function isToday(timestamp) {
  if (!timestamp?.toDate) return false
  const date = timestamp.toDate()
  const now = new Date()
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}

function formatWhen(timestamp) {
  if (!timestamp?.toDate) return '—'
  return timestamp.toDate().toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function Overview() {
  const { bookings, loading } = useBookings()
  const { services } = useServices()
  const { testimonials } = useTestimonials()
  const { submissions } = useReviewSubmissions()

  const pending = bookings.filter((b) => b.status === 'pending').length
  const today = bookings.filter((b) => isToday(b.createdAt)).length
  const recent = bookings.slice(0, 6)

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Overview</h1>
          <p>Live snapshot of your studio, updated in real time.</p>
        </div>
      </header>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Total Bookings</span>
          <span className="stat-value">{loading ? '—' : bookings.length}</span>
        </div>
        <div className="stat-card stat-card-accent">
          <span className="stat-label">Pending Review</span>
          <span className="stat-value">{loading ? '—' : pending}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Booked Today</span>
          <span className="stat-value">{loading ? '—' : today}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Services</span>
          <span className="stat-value">{services.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Published Reviews</span>
          <span className="stat-value">{testimonials.length}</span>
        </div>
        <div className="stat-card stat-card-accent">
          <span className="stat-label">Feedback Awaiting Review</span>
          <span className="stat-value">{submissions.length}</span>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Recent Booking Requests</h2>
          <Link className="btn btn-ghost btn-sm" to="/bookings">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="empty-state">No booking requests yet. New requests from the site appear here instantly.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Requested</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.name}</strong>
                    <span className="table-sub">{booking.phone}</span>
                  </td>
                  <td>{booking.service || '—'}</td>
                  <td>{formatWhen(booking.createdAt)}</td>
                  <td>
                    <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Overview
