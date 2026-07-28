import { useState } from 'react'
import { isImageLoaded, markImageLoaded } from '../imageCache'

function Photo({ src, alt, className = '' }) {
  const [status, setStatus] = useState(() => (isImageLoaded(src) ? 'loaded' : 'loading'))

  if (status === 'failed' || !src) return null

  return (
    <img
      src={src}
      alt={alt}
      className={`photo-img photo-img-${status} ${className}`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => {
        markImageLoaded(src)
        setStatus('loaded')
      }}
      onError={() => setStatus('failed')}
    />
  )
}

export default Photo
