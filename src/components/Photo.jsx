import { useState } from 'react'

function Photo({ src, alt, className }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) return null

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default Photo
