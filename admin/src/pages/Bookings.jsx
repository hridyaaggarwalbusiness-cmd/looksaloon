import { useMemo, useState } from 'react'
import { deleteBooking, updateBookingStatus, useBookings } from '../hooks/useBookings'

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled']

function formatWhen(timestamp) {
  if (!timestamp?.toDate) return '—'
  return timestamp.toDate().toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function Bookings() {
  const { bookings, loading } = useBookings()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      if (filter !== 'all' && booking.status !== filter) return false
      if (!search) return true
      const haystack = `${booking.name} ${booking.phone} ${booking.email}`.toLowerCase()
      return haystack.includes(search.toLowerCase())
    })
  }, [bookings, filter, search])

  const handleDelete = (id) => {
    if (window.confirm('Delete this booking request? This cannot be undone.')) {
      deleteBooking(id)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Bookings</h1>
          <p>Every appointment request from the site, live.</p>
        </div>
      </header>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search by name, phone, or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="toolbar-search"
        />
        <div className="toolbar-filters">
          <button
            type="button"
            className={filter === 'all' ? 'is-active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              className={filter === status ? 'is-active' : ''}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="panel">
        {loading ? (
          <p className="empty-state">Loading bookings…</p>
        ) : filtered.length === 0 ? (
          <p className="empty-state">No bookings match this view.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Preferred Date</th>
                <th>Requested</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.name}</strong>
                    {booking.message && <span className="table-sub">{booking.message}</span>}
                  </td>
                  <td>
                    <span className="table-sub">{booking.phone}</span>
                    <span className="table-sub">{booking.email}</span>
                  </td>
                  <td>{booking.service || '—'}</td>
                  <td>{booking.date || '—'}</td>
                  <td>{formatWhen(booking.createdAt)}</td>
                  <td>
                    <select
                      className={`status-select status-${booking.status}`}
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button type="button" className="icon-btn" aria-label="Delete booking" onClick={() => handleDelete(booking.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 7h14M10 11v6M14 11v6M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
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

export default Bookings
