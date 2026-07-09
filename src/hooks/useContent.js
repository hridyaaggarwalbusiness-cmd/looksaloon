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
        heroStats: Array.isArray(data.heroStats) && data.heroStats.length > 0 ? data.heroStats : DEFAULT_CONTENT.heroStats,
        aboutStats: Array.isArray(data.aboutStats) && data.aboutStats.length > 0 ? data.aboutStats : DEFAULT_CONTENT.aboutStats,
        whyUsFeatures:
          Array.isArray(data.whyUsFeatures) && data.whyUsFeatures.length > 0
            ? data.whyUsFeatures
            : DEFAULT_CONTENT.whyUsFeatures,
        navLinks: Array.isArray(data.navLinks) && data.navLinks.length > 0 ? data.navLinks : DEFAULT_CONTENT.navLinks,
        marqueeItems:
          Array.isArray(data.marqueeItems) && data.marqueeItems.length > 0
            ? data.marqueeItems
            : DEFAULT_CONTENT.marqueeItems,
        footerLinks:
          Array.isArray(data.footerLinks) && data.footerLinks.length > 0
            ? data.footerLinks
            : DEFAULT_CONTENT.footerLinks,
      })
    })

    return unsubscribe
  }, [])

  return content
}
