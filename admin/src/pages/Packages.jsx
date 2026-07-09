import { useState } from 'react'
import {
  BADGE_OPTIONS,
  COLOR_THEMES,
  addPackage,
  deletePackage,
  duplicatePackage,
  updatePackage,
  usePackages,
} from '../hooks/usePackages'
import { useServices } from '../hooks/useServices'
import { persistOrder } from '../lib/reorder'
import ImageUploadField, { deleteImage } from '../components/ImageUploadField'
import SortableTableBody from '../components/SortableList'

const EMPTY_FORM = {
  name: '',
  description: '',
  serviceIds: [],
  imageUrl: '',
  imageStoragePath: null,
  originalPrice: 0,
  discountedPrice: null,
  durationMinutes: 60,
  colorTheme: 'gold',
  badges: [],
  enabled: true,
  order: 0,
}

function PackageModal({ initial, services, onClose, onSave }) {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)

  const toggleService = (id) => {
    setForm((f) => ({
      ...f,
      serviceIds: f.serviceIds.includes(id) ? f.serviceIds.filter((s) => s !== id) : [...f.serviceIds, id],
    }))
  }

  const toggleBadge = (badge) => {
    setForm((f) => ({
      ...f,
      badges: f.badges.includes(badge) ? f.badges.filter((b) => b !== badge) : [...f.badges, badge],
    }))
  }

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
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <h2>{initial.id ? 'Edit Package' : 'Create Package'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            <span>Package Name</span>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>
            <span>Description</span>
            <textarea rows="3" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>

          <ImageUploadField
            label="Package Image"
            value={form.imageUrl}
            storagePath={form.imageStoragePath}
            pathPrefix="packages"
            onChange={({ url, storagePath }) => setForm({ ...form, imageUrl: url, imageStoragePath: storagePath })}
          />

          <div>
            <span className="image-upload-label">Included Services</span>
            <div className="badge-checkbox-row">
              {services.map((service) => (
                <label className="checkbox-label" key={service.id}>
                  <input type="checkbox" checked={form.serviceIds.includes(service.id)} onChange={() => toggleService(service.id)} />
                  <span>{service.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label>
              <span>Original Price (₹)</span>
              <input
                type="number"
                required
                min="0"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
              />
            </label>
            <label>
              <span>Discounted Price (₹, optional)</span>
              <input
                type="number"
                min="0"
                value={form.discountedPrice ?? ''}
                onChange={(e) => setForm({ ...form, discountedPrice: e.target.value ? Number(e.target.value) : null })}
              />
            </label>
            <label>
              <span>Duration (minutes)</span>
              <input
                type="number"
                required
                min="0"
                value={form.durationMinutes}
                onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
              />
            </label>
          </div>

          <label>
            <span>Color Theme</span>
            <select value={form.colorTheme} onChange={(e) => setForm({ ...form, colorTheme: e.target.value })}>
              {COLOR_THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="image-upload-label">Badges</span>
            <div className="badge-checkbox-row">
              {BADGE_OPTIONS.map((badge) => (
                <label className="checkbox-label" key={badge}>
                  <input type="checkbox" checked={form.badges.includes(badge)} onChange={() => toggleBadge(badge)} />
                  <span>{badge}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="checkbox-label">
            <input type="checkbox" checked={form.enabled} onChange={(e) => setForm({ ...form, enabled: e.target.checked })} />
            <span>Enabled (visible on site)</span>
          </label>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Packages() {
  const { packages, loading } = usePackages()
  const { services } = useServices()
  const [modalState, setModalState] = useState(null)

  const handleSave = async (form) => {
    if (form.id) {
      const { id, ...rest } = form
      await updatePackage(id, rest)
    } else {
      await addPackage(form)
    }
  }

  const handleDelete = async (pkg) => {
    if (!window.confirm(`Delete package "${pkg.name}"?`)) return
    await deleteImage(pkg.imageStoragePath)
    await deletePackage(pkg.id)
  }

  const handleDuplicate = (pkg) => duplicatePackage(pkg)

  const handleReorder = (reordered) => {
    persistOrder('packages', reordered)
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Packages</h1>
          <p>Bundle services into packages with their own pricing and badges. Drag rows to reorder.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setModalState({ ...EMPTY_FORM, order: packages.length })}>
          + Create Package
        </button>
      </header>

      <div className="panel">
        {loading ? (
          <p className="empty-state">Loading packages…</p>
        ) : packages.length === 0 ? (
          <div className="empty-state">
            <p>No packages yet. Create one to bundle services together.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>Package</th>
                <th>Services</th>
                <th>Price</th>
                <th>Enabled</th>
                <th></th>
              </tr>
            </thead>
            <SortableTableBody
              items={packages}
              onReorder={handleReorder}
              renderRow={(pkg) => (
                <>
                  <td>
                    <strong>{pkg.name}</strong>
                    <span className="table-sub">{pkg.description}</span>
                  </td>
                  <td>{(pkg.serviceIds || []).length}</td>
                  <td>
                    {pkg.discountedPrice ? (
                      <>
                        <span className="table-strike">₹{pkg.originalPrice}</span> ₹{pkg.discountedPrice}
                      </>
                    ) : (
                      `₹${pkg.originalPrice}`
                    )}
                  </td>
                  <td>{pkg.enabled !== false ? 'Yes' : '—'}</td>
                  <td className="table-actions">
                    <button type="button" className="icon-btn" aria-label="Edit" onClick={() => setModalState(pkg)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 20l1-4.5L16 4.5a1.5 1.5 0 0 1 2 0l1.5 1.5a1.5 1.5 0 0 1 0 2L8.5 19 4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button type="button" className="icon-btn" aria-label="Duplicate" onClick={() => handleDuplicate(pkg)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M9 20h9a2 2 0 0 0 2-2V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                    <button type="button" className="icon-btn" aria-label="Delete" onClick={() => handleDelete(pkg)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 7h14M10 11v6M14 11v6M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </td>
                </>
              )}
            />
          </table>
        )}
      </div>

      {modalState && (
        <PackageModal initial={modalState} services={services} onClose={() => setModalState(null)} onSave={handleSave} />
      )}
    </div>
  )
}

export default Packages
