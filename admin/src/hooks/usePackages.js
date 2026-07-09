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

export const BADGE_OPTIONS = ['Luxury', 'Highlighted', 'Recommended', 'Seasonal', 'Festival', 'Wedding', 'Limited Time']
export const COLOR_THEMES = ['gold', 'rose', 'ink']

export function usePackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }

    const q = query(collection(db, 'packages'), orderBy('order', 'asc'))

    const unsubscribe = onSnapshot(q, (snap) => {
      setPackages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { packages, loading }
}

export function addPackage(pkg) {
  return addDoc(collection(db, 'packages'), pkg)
}

export function updatePackage(id, pkg) {
  return updateDoc(doc(db, 'packages', id), pkg)
}

export function deletePackage(id) {
  return deleteDoc(doc(db, 'packages', id))
}

export function duplicatePackage(pkg) {
  const { id: _id, ...rest } = pkg
  return addDoc(collection(db, 'packages'), { ...rest, name: `${pkg.name} (Copy)`, enabled: false })
}
