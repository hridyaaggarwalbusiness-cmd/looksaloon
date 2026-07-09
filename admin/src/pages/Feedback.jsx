import { approveSubmission, dismissSubmission, useReviewSubmissions } from '../hooks/useReviewSubmissions'
import { useTestimonials } from '../hooks/useTestimonials'

function Stars({ rating }) {
  return (
    <div className="stars-static" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4">
          <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2Z" />
        </svg>
      ))}
    </div>
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

function Feedback() {
  const { submissions, loading } = useReviewSubmissions()
  const { testimonials } = useTestimonials()

  const handleApprove = (submission) => {
    approveSubmission(submission, testimonials.length)
  }

  const handleDismiss = (id) => {
    if (window.confirm('Discard this review submission?')) {
      dismissSubmission(id)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Feedback Inbox</h1>
          <p>Reviews submitted by clients on the site, awaiting approval.</p>
        </div>
      </header>

      <div className="panel">
        {loading ? (
          <p className="empty-state">Loading submissions…</p>
        ) : submissions.length === 0 ? (
          <p className="empty-state">No pending submissions. New reviews from the site appear here instantly.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Submitted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>
                    <strong>{submission.name}</strong>
                    <span className="table-sub">{submission.role}</span>
                  </td>
                  <td>
                    <Stars rating={submission.rating || 5} />
                  </td>
                  <td className="table-quote">{submission.quote}</td>
                  <td>{formatWhen(submission.createdAt)}</td>
                  <td className="table-actions">
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => handleApprove(submission)}>
                      Approve
                    </button>
                    <button type="button" className="icon-btn" aria-label="Dismiss" onClick={() => handleDismiss(submission.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

export default Feedback
