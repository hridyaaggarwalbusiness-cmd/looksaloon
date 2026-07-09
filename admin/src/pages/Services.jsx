import { useState } from 'react'
import {
  BADGE_OPTIONS,
  GENDER_OPTIONS,
  ICON_OPTIONS,
  addService,
  deleteService,
  importDefaultServices,
  updateService,
  useServices,
} from '../hooks/useServices'
import { useCategories } from '../hooks/useCategories'
import { persistOrder } from '../lib/reorder'
import ImageUploadField, { deleteImage, uploadImage } from '../components/ImageUploadField'
import SortableTableBody from '../components/SortableList'

const EMPTY_FORM = {
  name: '',
  categoryId: '',
  icon: 'scissors',
  shortDescription: '',
  description: '',
  imageUrl: '',
  imageStoragePath: null,
  gallery: [],
  originalPrice: 0,
  discountedPrice: null,
  durationMinutes: 30,
  gender: 'unisex',
  tags: [],
  popularity: 50,
  badges: [],
  enabled: true,
  featured: false,
  order: 0,
}

function ServiceModal({ initial, categories, onClose, onSave }) {
  const [form, setForm] = useState(initial)
  const [tagsInput, setTagsInput] = useState((initial.tags || []).join(', '))
  const [saving, setSaving] = useState(false)
  const [galleryUploading, setGalleryUploading] = useState(false)

  const toggleBadge = (badge) => {
    setForm((f) => ({
      ...f,
      badges: f.badges.includes(badge) ? f.badges.filter((b) => b !== badge) : [...f.badges, badge],
    }))
  }

  const handleGalleryAdd = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setGalleryUploading(true)
    try {
      const result = await uploadImage('services/gallery', file)
      setForm((f) => ({ ...f, gallery: [...f.gallery, result] }))
    } finally {
      setGalleryUploading(false)
      event.target.value = ''
    }
  }

  const handleGalleryRemove = async (index) => {
    const item = form.gallery[index]
    await deleteImage(item.storagePath)
    setForm((f) => ({ ...f, gallery: f.gallery.filter((_, i) => i !== index) }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      await onSave({ ...form, tags })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <h2>{initial.id ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <label>
              <span>Service Name</span>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
              <span>Category</span>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                <option value="">Uncategorized</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            <span>Short Description (shown on the service card)</span>
            <input
              type="text"
              required
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            />
          </label>
          <label>
            <span>Full Description</span>
            <textarea rows="3" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>

          <div className="form-row">
            <ImageUploadField
              label="Cover Image"
              value={form.imageUrl}
              storagePath={form.imageStoragePath}
              pathPrefix="services"
              onChange={({ url, storagePath }) => setForm({ ...form, imageUrl: url, imageStoragePath: storagePath })}
            />
            <label>
              <span>Fallback Icon (used if no image)</span>
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="gallery-editor">
            <span className="image-upload-label">Gallery Images</span>
            <div className="gallery-editor-grid">
              {form.gallery.map((item, index) => (
                <div className="gallery-editor-item" key={item.storagePath || item.url}>
                  <img src={item.url} alt="" />
                  <button type="button" className="icon-btn" aria-label="Remove" onClick={() => handleGalleryRemove(index)}>
                    ×
                  </button>
                </div>
              ))}
              <label className="btn btn-ghost btn-sm gallery-editor-add">
                {galleryUploading ? 'Uploading…' : '+ Add Image'}
                <input type="file" accept="image/*" hidden onChange={handleGalleryAdd} disabled={galleryUploading} />
              </label>
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

          <div className="form-row">
            <label>
              <span>Gender</span>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Popularity (0-100)</span>
              <input
                type="number"
                min="0"
                max="100"
                value={form.popularity}
                onChange={(e) => setForm({ ...form, popularity: Number(e.target.value) })}
              />
            </label>
          </div>

          <label>
            <span>Tags (comma-separated)</span>
            <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="color, premium, quick" />
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

          <div className="form-row">
            <label className="checkbox-label">
              <input type="checkbox" checked={form.enabled} onChange={(e) => setForm({ ...form, enabled: e.target.checked })} />
              <span>Enabled (visible on site)</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              <span>Mark as Featured / Most Popular</span>
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
  const { categories } = useCategories()
  const [modalState, setModalState] = useState(null)
  const [importing, setImporting] = useState(false)

  const categoryName = (id) => categories.find((c) => c.id === id)?.name || 'Uncategorized'

  const handleSave = async (form) => {
    if (form.id) {
      const { id, ...rest } = form
      await updateService(id, rest)
    } else {
      await addService(form)
    }
  }

  const handleDelete = async (service) => {
    if (!window.confirm(`Remove "${service.name}" from the site?`)) return
    await deleteImage(service.imageStoragePath)
    await Promise.all((service.gallery || []).map((item) => deleteImage(item.storagePath)))
    await deleteService(service.id)
  }

  const handleImport = async () => {
    setImporting(true)
    try {
      await importDefaultServices()
    } finally {
      setImporting(false)
    }
  }

  const handleReorder = (reordered) => {
    persistOrder('services', reordered)
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Services</h1>
          <p>Manage what appears on the site&rsquo;s Services section, live. Drag rows to reorder.</p>
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
                <th></th>
                <th>Service</th>
                <th>Category</th>
                <th>Price</th>
                <th>Enabled</th>
                <th>Featured</th>
                <th></th>
              </tr>
            </thead>
            <SortableTableBody
              items={services}
              onReorder={handleReorder}
              renderRow={(service) => (
                <>
                  <td>
                    <strong>{service.name}</strong>
                    <span className="table-sub">{service.shortDescription || service.description}</span>
                  </td>
                  <td>{categoryName(service.categoryId)}</td>
                  <td>
                    {service.discountedPrice ? (
                      <>
                        <span className="table-strike">₹{service.originalPrice}</span> ₹{service.discountedPrice}
                      </>
                    ) : (
                      `₹${service.originalPrice}`
                    )}
                  </td>
                  <td>{service.enabled !== false ? 'Yes' : '—'}</td>
                  <td>{service.featured ? 'Yes' : '—'}</td>
                  <td className="table-actions">
                    <button type="button" className="icon-btn" aria-label="Edit" onClick={() => setModalState(service)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 20l1-4.5L16 4.5a1.5 1.5 0 0 1 2 0l1.5 1.5a1.5 1.5 0 0 1 0 2L8.5 19 4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button type="button" className="icon-btn" aria-label="Delete" onClick={() => handleDelete(service)}>
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
        <ServiceModal initial={modalState} categories={categories} onClose={() => setModalState(null)} onSave={handleSave} />
      )}
    </div>
  )
}

export default Services
