import { useState } from 'react'

function Photo({ src, alt, className = '' }) {
  const [status, setStatus] = useState('loading')

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
