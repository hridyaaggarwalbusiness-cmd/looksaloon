import { useState } from 'react'
import { usePhotos } from '../../hooks/usePhotos'

function ImagePicker({ currentUrl, label, onClose, onSelect }) {
  const [tab, setTab] = useState('link')
  const [url, setUrl] = useState(currentUrl || '')
  const { photos } = usePhotos()

  const handleUseLink = (event) => {
    event.preventDefault()
    if (url.trim()) onSelect(url.trim())
  }

  return (
    <div className="ve-modal-overlay" onClick={onClose}>
      <div className="ve-modal" onClick={(event) => event.stopPropagation()}>
        <div className="ve-modal-header">
          <h3>Change Photo</h3>
          <p>{label}</p>
          <button type="button" className="ve-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="ve-modal-tabs">
          <button type="button" className={tab === 'link' ? 'is-active' : ''} onClick={() => setTab('link')}>
            Paste Link
          </button>
          <button type="button" className={tab === 'gallery' ? 'is-active' : ''} onClick={() => setTab('gallery')}>
            Choose from Gallery
          </button>
        </div>

        {tab === 'link' ? (
          <form className="ve-modal-link" onSubmit={handleUseLink}>
            <label>
              <span>Image URL</span>
              <input
                type="url"
                autoFocus
                placeholder="https://example.com/photo.jpg"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </label>
            {url && (
              <div className="ve-modal-preview">
                <img src={url} alt="Preview" />
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-block" disabled={!url.trim()}>
              Use This Photo
            </button>
          </form>
        ) : (
          <div className="ve-modal-gallery">
            {Object.entries(photos).map(([slug, photo]) => (
              <button
                type="button"
                key={slug}
                className={`ve-gallery-thumb ${photo.url === currentUrl ? 'is-current' : ''}`}
                onClick={() => onSelect(photo.url)}
              >
                <img src={photo.url} alt={photo.title} loading="lazy" />
                <span>{photo.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImagePicker
