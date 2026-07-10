import { useState } from 'react'
import {
  ICON_OPTIONS,
  addService,
  deleteService,
  importDefaultServices,
  updateService,
  useServices,
} from '../hooks/useServices'

const EMPTY_FORM = { name: '', price: '', description: '', icon: 'scissors', popular: false, imageUrl: '', order: 0 }

function ServiceModal({ initial, onClose, onSave }) {
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
        <h2>{initial.id ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            <span>Service Name</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <div className="form-row">
            <label>
              <span>Price Label</span>
              <input
                type="text"
                placeholder="From ₹899"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </label>
            <label>
              <span>Icon</span>
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            <span>Description</span>
            <textarea
              rows="3"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>
          <label>
            <span>Image URL (optional)</span>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
            <span className="field-hint">
              Paste a direct image link. Shown on this service&rsquo;s own details page &mdash; leave
              blank to show a placeholder.
            </span>
          </label>
          <div className="form-row">
            <label>
              <span>Display Order</span>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.popular}
                onChange={(e) => setForm({ ...form, popular: e.target.checked })}
              />
              <span>Mark as "Most Popular"</span>
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Services() {
  const { services, loading } = useServices()
  const [modalState, setModalState] = useState(null)
  const [importing, setImporting] = useState(false)

  const handleSave = async (form) => {
    if (form.id) {
      const { id, ...rest } = form
      await updateService(id, rest)
    } else {
      await addService(form)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Remove this service from the site?')) {
      deleteService(id)
    }
  }

  const handleImport = async () => {
    setImporting(true)
    try {
      await importDefaultServices()
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Services</h1>
          <p>Manage what appears on the site&rsquo;s Services section, live.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setModalState({ ...EMPTY_FORM, order: services.length })}>
          + Add Service
        </button>
      </header>

      <div className="panel">
        {loading ? (
          <p className="empty-state">Loading services…</p>
        ) : services.length === 0 ? (
          <div className="empty-state">
            <p>No services yet. Import the starter set or add your own.</p>
            <button type="button" className="btn btn-ghost" onClick={handleImport} disabled={importing}>
              {importing ? 'Importing…' : 'Import Starter Services'}
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Service</th>
                <th>Price</th>
                <th>Popular</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.order}</td>
                  <td>
                    <strong>{service.name}</strong>
                    <span className="table-sub">{service.description}</span>
                  </td>
                  <td>{service.price}</td>
                  <td>{service.popular ? 'Yes' : '—'}</td>
                  <td>{service.imageUrl ? 'Yes' : '—'}</td>
                  <td className="table-actions">
                    <button type="button" className="icon-btn" aria-label="Edit" onClick={() => setModalState({ imageUrl: '', ...service })}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 20l1-4.5L16 4.5a1.5 1.5 0 0 1 2 0l1.5 1.5a1.5 1.5 0 0 1 0 2L8.5 19 4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button type="button" className="icon-btn" aria-label="Delete" onClick={() => handleDelete(service.id)}>
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
        <ServiceModal initial={modalState} onClose={() => setModalState(null)} onSave={handleSave} />
      )}
    </div>
  )
}

export default Services
