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
        showcase: Array.isArray(data.showcase) && data.showcase.length > 0 ? data.showcase : DEFAULT_CONTENT.showcase,
        carousel: Array.isArray(data.carousel) && data.carousel.length > 0 ? data.carousel : DEFAULT_CONTENT.carousel,
      })
    })

    return unsubscribe
  }, [])

  return content
}
