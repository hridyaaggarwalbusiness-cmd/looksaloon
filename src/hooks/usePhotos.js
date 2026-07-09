import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { DEFAULT_PHOTOS } from '../photos'

export function usePhotos() {
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS)

  useEffect(() => {
    if (!db) return undefined

    const unsubscribe = onSnapshot(doc(db, 'settings', 'photos'), (snap) => {
      const data = snap.exists() ? snap.data() : {}
      const merged = {}
      for (const slug of Object.keys(DEFAULT_PHOTOS)) {
        merged[slug] = { ...DEFAULT_PHOTOS[slug], ...(data[slug] || {}) }
      }
      setPhotos(merged)
    })

    return unsubscribe
  }, [])

  return photos
}
