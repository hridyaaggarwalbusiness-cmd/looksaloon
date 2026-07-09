import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { DEFAULT_CONTENT } from '../content'

export function useContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT)

  useEffect(() => {
    if (!db) return undefined

    const unsubscribe = onSnapshot(doc(db, 'settings', 'content'), (snap) => {
      const data = snap.exists() ? snap.data() : {}
      setContent({
        hero: { ...DEFAULT_CONTENT.hero, ...(data.hero || {}) },
        about: { ...DEFAULT_CONTENT.about, ...(data.about || {}) },
        faq: Array.isArray(data.faq) && data.faq.length > 0 ? data.faq : DEFAULT_CONTENT.faq,
      })
    })

    return unsubscribe
  }, [])

  return content
}
