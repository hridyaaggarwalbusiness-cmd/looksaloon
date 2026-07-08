import { useState } from 'react'
import {
  addTestimonial,
  deleteTestimonial,
  importDefaultTestimonials,
  updateTestimonial,
  useTestimonials,
} from '../hooks/useTestimonials'

const EMPTY_FORM = { name: '', role: '', quote: '', order: 0 }

function TestimonialModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      await onSave(form)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{initial.id ? 'Edit Review' : 'Add Review'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <label>
              <span>Client Name</span>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
              <span>Role / Context</span>
              <input
                type="text"
                placeholder="Bridal Client"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </label>
          </div>
          <label>
            <span>Quote</span>
            <textarea rows="4" required value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          </label>
          <label>
            <span>Display Order</span>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Testimonials() {
  const { testimonials, loading } = useTestimonials()
  const [modalState, setModalState] = useState(null)
  const [importing, setImporting] = useState(false)

  const handleSave = async (form) => {
    if (form.id) {
      const { id, ...rest } = form
      await updateTestimonial(id, rest)
    } else {
      await addTestimonial(form)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Remove this review from the site?')) {
      deleteTestimonial(id)
    }
  }

  const handleImport = async () => {
    setImporting(true)
    try {
      await importDefaultTestimonials()
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Testimonials</h1>
          <p>Reviews shown in the site&rsquo;s Client Love carousel, live.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setModalState({ ...EMPTY_FORM, order: testimonials.length })}
        >
          + Add Review
        </button>
      </header>

      <div className="panel">
        {loading ? (
          <p className="empty-state">Loading reviews…</p>
        ) : testimonials.length === 0 ? (
          <div className="empty-state">
            <p>No reviews yet. Import the starter set or add your own.</p>
            <button type="button" className="btn btn-ghost" onClick={handleImport} disabled={importing}>
              {importing ? 'Importing…' : 'Import Starter Reviews'}
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Client</th>
                <th>Quote</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id}>
                  <td>{testimonial.order}</td>
                  <td>
                    <strong>{testimonial.name}</strong>
                    <span className="table-sub">{testimonial.role}</span>
                  </td>
                  <td className="table-quote">{testimonial.quote}</td>
                  <td className="table-actions">
                    <button type="button" className="icon-btn" aria-label="Edit" onClick={() => setModalState(testimonial)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 20l1-4.5L16 4.5a1.5 1.5 0 0 1 2 0l1.5 1.5a1.5 1.5 0 0 1 0 2L8.5 19 4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button type="button" className="icon-btn" aria-label="Delete" onClick={() => handleDelete(testimonial.id)}>
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

      {modalState && (
        <TestimonialModal initial={modalState} onClose={() => setModalState(null)} onSave={handleSave} />
      )}
    </div>
  )
}

export default Testimonials
