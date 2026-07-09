import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export function useCategories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!db) return undefined

    const q = query(collection(db, 'categories'), orderBy('order', 'asc'))

    const unsubscribe = onSnapshot(q, (snap) => {
      setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((category) => category.visible !== false))
    })

    return unsubscribe
  }, [])

  return { categories }
}
