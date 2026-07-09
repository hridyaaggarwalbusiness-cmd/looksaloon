import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

function StarPicker({ value, onChange }) {
  return (
    <div className="star-picker" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={n <= value ? 'is-filled' : ''}
          onClick={() => onChange(n)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2Z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function ReviewForm() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [rating, setRating] = useState(5)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const data = new FormData(form)

    const submission = {
      name: data.get('name'),
      role: data.get('role') || 'Client',
      quote: data.get('quote'),
      rating,
      status: 'pending',
      createdAt: serverTimestamp(),
    }

    if (!db) {
      setSubmitted(true)
      return
    }

    setSubmitting(true)
    try {
      await addDoc(collection(db, 'reviewSubmissions'), submission)
      setSubmitted(true)
      form.reset()
      setRating(5)
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) {
    return (
      <button type="button" className="btn btn-ghost review-cta" onClick={() => setOpen(true)}>
        Share Your Experience
      </button>
    )
  }

  return (
    <div className="review-form-wrap">
      {submitted ? (
        <p className="review-thanks">
          Thank you for sharing! Your review will appear on our site once approved.
        </p>
      ) : (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              <span>Your Name</span>
              <input type="text" name="name" placeholder="Jane Doe" required />
            </label>
            <label>
              <span>Visited For</span>
              <input type="text" name="role" placeholder="Haircut & Color" />
            </label>
          </div>
          <label>
            <span>Your Rating</span>
            <StarPicker value={rating} onChange={setRating} />
          </label>
          <label>
            <span>Your Review</span>
            <textarea name="quote" rows="3" placeholder="Tell us about your visit…" required />
          </label>
          <div className="review-form-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ReviewForm
