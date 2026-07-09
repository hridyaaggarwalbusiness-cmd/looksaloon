import { useRef, useState } from 'react'
import { resetPhoto, setPhotoCaption, setPhotoUrl, uploadPhoto, usePhotos } from '../hooks/usePhotos'
import { DEFAULT_PHOTOS, PHOTO_USAGE } from '../photos'

const SLUG_LABELS = {
  exterior: 'Storefront / Exterior',
  interiorStyling: 'Style Bar',
  interiorWash: 'Wash & Relax Station',
  interiorMirrors: 'Signature Mirrors',
  interiorLounge: 'Guest Lounge',
  checkin: 'Entrance / Welcome',
}

function PhotoCard({ slug, photo }) {
  const fileInputRef = useRef(null)
  const [urlDraft, setUrlDraft] = useState('')
  const [captionDraft, setCaptionDraft] = useState({ title: photo.title, tag: photo.tag })
  const [uploading, setUploading] = useState(false)
  const [savingCaption, setSavingCaption] = useState(false)
  const [error, setError] = useState('')
  const [savedCaption, setSavedCaption] = useState(false)

  const isCustomized =
    photo.url !== DEFAULT_PHOTOS[slug].url ||
    photo.title !== DEFAULT_PHOTOS[slug].title ||
    photo.tag !== DEFAULT_PHOTOS[slug].tag

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setError('')
    setUploading(true)
    try {
      await uploadPhoto(slug, file, photo.storagePath)
    } catch {
      setError('Upload failed. Your Firebase Storage may not be enabled yet — try pasting an image URL instead.')
    } finally {
      setUploading(false)
    }
  }

  const handleUrlSubmit = async (event) => {
    event.preventDefault()
    if (!urlDraft.trim()) return
    setError('')
    setUploading(true)
    try {
      await setPhotoUrl(slug, urlDraft.trim(), photo.storagePath)
      setUrlDraft('')
    } catch {
      setError('Could not save that URL. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleCaptionSubmit = async (event) => {
    event.preventDefault()
    setSavingCaption(true)
    try {
      await setPhotoCaption(slug, captionDraft)
      setSavedCaption(true)
      setTimeout(() => setSavedCaption(false), 2000)
    } finally {
      setSavingCaption(false)
    }
  }

  const handleReset = () => {
    if (window.confirm('Reset this photo and caption to the original default?')) {
      resetPhoto(slug, photo.storagePath)
    }
  }

  return (
    <div className="photo-card">
      <div className="photo-card-preview">
        <img src={photo.url} alt={photo.title} loading="lazy" />
        {uploading && <div className="photo-card-uploading">Uploading…</div>}
      </div>

      <div className="photo-card-body">
        <div className="photo-card-heading">
          <strong>{SLUG_LABELS[slug] || slug}</strong>
          <span className="table-sub">Used in: {PHOTO_USAGE[slug]}</span>
        </div>

        <form className="modal-form photo-card-form" onSubmit={handleCaptionSubmit}>
          <div className="form-row">
            <label>
              <span>Caption Title</span>
              <input
                type="text"
                value={captionDraft.title}
                onChange={(e) => setCaptionDraft({ ...captionDraft, title: e.target.value })}
              />
            </label>
            <label>
              <span>Caption Tag</span>
              <input
                type="text"
                value={captionDraft.tag}
                onChange={(e) => setCaptionDraft({ ...captionDraft, tag: e.target.value })}
              />
            </label>
          </div>
          <div className="modal-actions">
            {savedCaption && <span className="save-confirm">Saved</span>}
            <button type="submit" className="btn btn-ghost btn-sm" disabled={savingCaption}>
              {savingCaption ? 'Saving…' : 'Save Caption'}
            </button>
          </div>
        </form>

        <div className="photo-card-actions">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            Upload New Image
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={handleReset} disabled={!isCustomized || uploading}>
            Reset to Default
          </button>
        </div>

        <form className="photo-card-url-form" onSubmit={handleUrlSubmit}>
          <input
            type="url"
            placeholder="Or paste an image URL…"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
          />
          <button type="submit" className="btn btn-ghost btn-sm" disabled={uploading || !urlDraft.trim()}>
            Use URL
          </button>
        </form>

        {error && <p className="form-error">{error}</p>}
      </div>
    </div>
  )
}

function Media() {
  const { photos, loading } = usePhotos()

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Photos</h1>
          <p>Upload, replace, or caption every photo shown on the public site, live.</p>
        </div>
      </header>

      {loading ? (
        <p className="empty-state">Loading photos…</p>
      ) : (
        <div className="photo-grid">
          {Object.keys(photos).map((slug) => (
            <PhotoCard key={slug} slug={slug} photo={photos[slug]} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Media
