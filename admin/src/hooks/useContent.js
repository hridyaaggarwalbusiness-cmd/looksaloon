import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { DEFAULT_CONTENT } from '../content'

export function useContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }

    const unsubscribe = onSnapshot(doc(db, 'settings', 'content'), (snap) => {
      const data = snap.exists() ? snap.data() : {}
      setContent({
        hero: { ...DEFAULT_CONTENT.hero, ...(data.hero || {}) },
        about: { ...DEFAULT_CONTENT.about, ...(data.about || {}) },
        faq: Array.isArray(data.faq) && data.faq.length > 0 ? data.faq : DEFAULT_CONTENT.faq,
        showcase: Array.isArray(data.showcase) && data.showcase.length > 0 ? data.showcase : DEFAULT_CONTENT.showcase,
      })
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { content, loading }
}

export function saveContent(data) {
  return setDoc(doc(db, 'settings', 'content'), data, { merge: true })
}
