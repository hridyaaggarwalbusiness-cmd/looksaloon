import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { DEFAULT_CONTENT } from '../content'

// Older saved content stored each showcase section as a single flat
// {title, description, imageUrl} object. Normalize those into the current
// { items: [...] } shape so previously-saved data keeps rendering.
function normalizeShowcase(rawShowcase) {
  return rawShowcase.map((section) => (Array.isArray(section.items) ? section : { items: [section] }))
}

export function useContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT)

  useEffect(() => {
    if (!db) return undefined

    const unsubscribe = onSnapshot(doc(db, 'settings', 'content'), (snap) => {
      const data = snap.exists() ? snap.data() : {}
      const rawShowcase = Array.isArray(data.showcase) && data.showcase.length > 0 ? data.showcase : DEFAULT_CONTENT.showcase
      const rawSpaceShowcase =
        Array.isArray(data.spaceShowcase) && data.spaceShowcase.length > 0
          ? data.spaceShowcase
          : DEFAULT_CONTENT.spaceShowcase
      setContent({
        hero: { ...DEFAULT_CONTENT.hero, ...(data.hero || {}) },
        about: { ...DEFAULT_CONTENT.about, ...(data.about || {}) },
        faq: Array.isArray(data.faq) && data.faq.length > 0 ? data.faq : DEFAULT_CONTENT.faq,
        showcase: normalizeShowcase(rawShowcase),
        spaceShowcase: normalizeShowcase(rawSpaceShowcase),
      })
    })

    return unsubscribe
  }, [])

  return content
}
