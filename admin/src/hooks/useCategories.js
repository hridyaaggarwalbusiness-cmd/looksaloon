import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

export const ICON_OPTIONS = ['scissors', 'color', 'sparkle', 'hand', 'crown', 'leaf', 'shield', 'flask']

export const DEFAULT_CATEGORIES = [
  { name: 'Hair', slug: 'hair', icon: 'scissors', description: 'Cuts, styling, and color services.', order: 0, visible: true, featured: true, bannerImageUrl: '', bannerStoragePath: null },
  { name: 'Skin', slug: 'skin', icon: 'sparkle', description: 'Facials and skin therapy.', order: 1, visible: true, featured: false, bannerImageUrl: '', bannerStoragePath: null },
  { name: 'Bridal', slug: 'bridal', icon: 'crown', description: 'Bridal and occasion styling.', order: 2, visible: true, featured: true, bannerImageUrl: '', bannerStoragePath: null },
  { name: 'Spa', slug: 'spa', icon: 'leaf', description: 'Massages and body rituals.', order: 3, visible: true, featured: false, bannerImageUrl: '', bannerStoragePath: null },
  { name: 'Nails', slug: 'nails', icon: 'hand', description: 'Manicure and pedicure.', order: 4, visible: true, featured: false, bannerImageUrl: '', bannerStoragePath: null },
]

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }

    const q = query(collection(db, 'categories'), orderBy('order', 'asc'))

    const unsubscribe = onSnapshot(q, (snap) => {
      setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { categories, loading }
}

export function addCategory(category) {
  return addDoc(collection(db, 'categories'), category)
}

export function updateCategory(id, category) {
  return updateDoc(doc(db, 'categories', id), category)
}

export function deleteCategory(id) {
  return deleteDoc(doc(db, 'categories', id))
}

export async function importDefaultCategories() {
  await Promise.all(DEFAULT_CATEGORIES.map((category) => addDoc(collection(db, 'categories'), category)))
}
