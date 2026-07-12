import { useState } from 'react'
import ImagePicker from './ImagePicker'

function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" className="photo-fallback-mark" aria-hidden="true">
      <path d="M24 4c6 6 6 14 0 20-6-6-6-14 0-20Z" fill="currentColor" />
      <path d="M24 22c0 10-6 16-16 20 4-10 6-16 16-20Z" fill="currentColor" opacity="0.7" />
      <path d="M24 22c0 10 6 16 16 20-4-10-6-16-16-20Z" fill="currentColor" opacity="0.45" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20l1-4.2L15.6 5.2a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19 4 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 7l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function EditableImage({ src, alt, label, className = '', frameClassName = '', onChange, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`photo-frame ve-editable-frame ${frameClassName}`}>
      <BrandMark />
      {src && (
        <img src={src} alt={alt} className={`photo-img photo-img-loaded ${className}`} loading="lazy" />
      )}
      {children}

      <button type="button" className="ve-edit-btn" onClick={() => setOpen(true)} aria-label={`Change photo: ${label || alt}`}>
        <EditIcon />
        <span>Change Photo</span>
      </button>

      {open && (
        <ImagePicker
          currentUrl={src}
          label={label || alt}
          onClose={() => setOpen(false)}
          onSelect={(url) => {
            onChange(url)
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default EditableImage
