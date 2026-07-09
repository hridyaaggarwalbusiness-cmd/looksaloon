import { useEffect } from 'react'

function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!item) return undefined

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose, onPrev, onNext])

  if (!item) return null

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        className="lightbox-nav lightbox-prev"
        aria-label="Previous photo"
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
        <img src={item.src} alt={item.title} referrerPolicy="no-referrer" />
        <figcaption>
          <span className="gallery-tag">{item.tag}</span>
          <span className="gallery-title">{item.title}</span>
        </figcaption>
      </figure>

      <button
        type="button"
        className="lightbox-nav lightbox-next"
        aria-label="Next photo"
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default Lightbox
