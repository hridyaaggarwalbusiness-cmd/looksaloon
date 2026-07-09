import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../firebase'
import { DEFAULT_PHOTOS } from '../photos'

const PHOTOS_DOC = () => doc(db, 'settings', 'photos')

export function usePhotos() {
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }

    const unsubscribe = onSnapshot(PHOTOS_DOC(), (snap) => {
      const data = snap.exists() ? snap.data() : {}
      const merged = {}
      for (const slug of Object.keys(DEFAULT_PHOTOS)) {
        merged[slug] = { ...DEFAULT_PHOTOS[slug], ...(data[slug] || {}) }
      }
      setPhotos(merged)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { photos, loading }
}

export async function setPhotoCaption(slug, { title, tag }) {
  await setDoc(PHOTOS_DOC(), { [slug]: { title, tag } }, { merge: true })
}

export async function setPhotoUrl(slug, url, previousStoragePath) {
  if (previousStoragePath) {
    await deleteObject(ref(storage, previousStoragePath)).catch(() => {})
  }
  await setDoc(PHOTOS_DOC(), { [slug]: { url, storagePath: null } }, { merge: true })
}

export async function uploadPhoto(slug, file, previousStoragePath) {
  const path = `photos/${slug}-${Date.now()}-${file.name}`
  const fileRef = ref(storage, path)
  await uploadBytes(fileRef, file)
  const url = await getDownloadURL(fileRef)

  if (previousStoragePath) {
    await deleteObject(ref(storage, previousStoragePath)).catch(() => {})
  }

  await setDoc(PHOTOS_DOC(), { [slug]: { url, storagePath: path } }, { merge: true })
  return url
}

export async function resetPhoto(slug, previousStoragePath) {
  if (previousStoragePath) {
    await deleteObject(ref(storage, previousStoragePath)).catch(() => {})
  }
  await setDoc(PHOTOS_DOC(), { [slug]: { ...DEFAULT_PHOTOS[slug], storagePath: null } }, { merge: true })
}
