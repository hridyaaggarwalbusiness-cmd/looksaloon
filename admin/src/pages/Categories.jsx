import { useState } from 'react'
import {
  ICON_OPTIONS,
  addCategory,
  deleteCategory,
  importDefaultCategories,
  updateCategory,
  useCategories,
} from '../hooks/useCategories'
import { persistOrder } from '../lib/reorder'
import ImageUploadField, { deleteImage } from '../components/ImageUploadField'
import SortableTableBody from '../components/SortableList'

const EMPTY_FORM = {
  name: '',
  slug: '',
  icon: 'scissors',
  description: '',
  order: 0,
  visible: true,
  featured: false,
  bannerImageUrl: '',
  bannerStoragePath: null,
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function CategoryModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)

  const handleNameChange = (event) => {
    const name = event.target.value
    setForm((f) => ({ ...f, name, slug: f.slug || slugify(name) }))
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
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{initial.id ? 'Edit Category' : 'Add Category'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <label>
              <span>Category Name</span>
              <input type="text" required value={form.name} onChange={handleNameChange} />
            </label>
            <label>
              <span>Slug</span>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
              />
            </label>
          </div>
          <div className="form-row">
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
              rows="2"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>
          <ImageUploadField
            label="Banner Image"
            value={form.bannerImageUrl}
            storagePath={form.bannerStoragePath}
            pathPrefix="categories"
            onChange={({ url, storagePath }) => setForm({ ...form, bannerImageUrl: url, bannerStoragePath: storagePath })}
          />
          <div className="form-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) => setForm({ ...form, visible: e.target.checked })}
              />
              <span>Visible on site</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <span>Featured category</span>
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Categories() {
  const { categories, loading } = useCategories()
  const [modalState, setModalState] = useState(null)
  const [importing, setImporting] = useState(false)

  const handleSave = async (form) => {
    if (form.id) {
      const { id, ...rest } = form
      await updateCategory(id, rest)
    } else {
      await addCategory(form)
    }
  }

  const handleDelete = async (category) => {
    if (!window.confirm(`Delete "${category.name}"? Services in this category will keep their link but show as uncategorized.`)) return
    await deleteImage(category.bannerStoragePath)
    await deleteCategory(category.id)
  }

  const handleImport = async () => {
    setImporting(true)
    try {
      await importDefaultCategories()
    } finally {
      setImporting(false)
    }
  }

  const handleReorder = (reordered) => {
    persistOrder('categories', reordered)
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Categories</h1>
          <p>Group services into categories. Drag rows to reorder how they appear on the site.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setModalState({ ...EMPTY_FORM, order: categories.length })}
        >
          + Add Category
        </button>
      </header>

      <div className="panel">
        {loading ? (
          <p className="empty-state">Loading categories…</p>
        ) : categories.length === 0 ? (
          <div className="empty-state">
            <p>No categories yet. Import the starter set or add your own.</p>
            <button type="button" className="btn btn-ghost" onClick={handleImport} disabled={importing}>
              {importing ? 'Importing…' : 'Import Starter Categories'}
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>Category</th>
                <th>Slug</th>
                <th>Visible</th>
                <th>Featured</th>
                <th></th>
              </tr>
            </thead>
            <SortableTableBody
              items={categories}
              onReorder={handleReorder}
              renderRow={(category) => (
                <>
                  <td>
                    <strong>{category.name}</strong>
                    <span className="table-sub">{category.description}</span>
                  </td>
                  <td>{category.slug}</td>
                  <td>{category.visible !== false ? 'Yes' : '—'}</td>
                  <td>{category.featured ? 'Yes' : '—'}</td>
                  <td className="table-actions">
                    <button type="button" className="icon-btn" aria-label="Edit" onClick={() => setModalState(category)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 20l1-4.5L16 4.5a1.5 1.5 0 0 1 2 0l1.5 1.5a1.5 1.5 0 0 1 0 2L8.5 19 4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button type="button" className="icon-btn" aria-label="Delete" onClick={() => handleDelete(category)}>
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
        <CategoryModal initial={modalState} onClose={() => setModalState(null)} onSave={handleSave} />
      )}
    </div>
  )
}

export default Categories
