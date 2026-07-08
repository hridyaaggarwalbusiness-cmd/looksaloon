import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const DEFAULT_SETTINGS = {
  address: 'Gaandhi Nagar, Hanumangarh, Rajasthan 335512',
  phone: '+91 83859 39352',
  email: 'hello@lookssaloon.com',
  hours: 'Daily, 9:00 AM – 8:00 PM',
  instagram: '',
  facebook: 'https://www.facebook.com/people/Looks-beauty-zone-and-spa/100057492337485/',
  whatsapp: '',
}

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }

    const unsubscribe = onSnapshot(doc(db, 'settings', 'general'), (snap) => {
      if (snap.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...snap.data() })
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { settings, loading }
}

export function saveSettings(data) {
  return setDoc(doc(db, 'settings', 'general'), data, { merge: true })
}
