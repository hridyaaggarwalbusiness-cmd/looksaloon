import { useState } from 'react'

function isCached(src) {
  if (!src) return false
  const img = new Image()
  img.src = src
  return img.complete
}

function Photo({ src, alt, className = '' }) {
  const [status, setStatus] = useState(() => (isCached(src) ? 'loaded' : 'loading'))

  if (status === 'failed' || !src) return null

  return (
    <img
      src={src}
      alt={alt}
      className={`photo-img photo-img-${status} ${className}`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('failed')}
    />
  )
}

export default Photo
