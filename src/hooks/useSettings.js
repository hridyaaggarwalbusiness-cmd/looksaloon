import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export const DEFAULT_SETTINGS = {
  address: '123 Marina Boulevard, Springfield',
  phone: '+1 (555) 123-4567',
  email: 'hello@lookssaloon.com',
  hours: 'Tue–Sun, 9:00 AM – 8:00 PM',
  instagram: '',
  facebook: '',
  whatsapp: '',
}

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  useEffect(() => {
    if (!db) return undefined

    const unsubscribe = onSnapshot(doc(db, 'settings', 'general'), (snap) => {
      if (snap.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...snap.data() })
      }
    })

    return unsubscribe
  }, [])

  return settings
}
