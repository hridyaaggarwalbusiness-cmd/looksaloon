import Photo from './Photo'

function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" className="photo-fallback-mark" aria-hidden="true">
      <path d="M24 4c6 6 6 14 0 20-6-6-6-14 0-20Z" fill="currentColor" />
      <path d="M24 22c0 10-6 16-16 20 4-10 6-16 16-20Z" fill="currentColor" opacity="0.7" />
      <path d="M24 22c0 10 6 16 16 20-4-10-6-16-16-20Z" fill="currentColor" opacity="0.45" />
    </svg>
  )
}

function PhotoFrame({ src, alt, className = '', photoClassName = '', children }) {
  return (
    <div className={`photo-frame ${className}`}>
      <BrandMark />
      <Photo src={src} alt={alt} className={`photo-frame-img ${photoClassName}`} />
      {children}
    </div>
  )
}

export default PhotoFrame
