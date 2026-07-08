import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export const DEFAULT_TESTIMONIALS = [
  {
    id: 'default-1',
    name: 'Ananya Rao',
    role: 'Bridal Client',
    quote:
      'From the trial to the wedding day, the team understood exactly what I wanted. I felt like the best version of myself walking down the aisle.',
  },
  {
    id: 'default-2',
    name: 'Kabir Mehta',
    role: 'Regular Client, 3 years',
    quote:
      'Consistently the best haircut I have had. The attention to detail and the calm atmosphere keep me coming back every month.',
  },
  {
    id: 'default-3',
    name: 'Priya Nair',
    role: 'Color & Skin Client',
    quote:
      'My balayage has never looked this natural. The facial afterwards left my skin glowing for weeks. Worth every rupee.',
  },
  {
    id: 'default-4',
    name: 'Simran Kaur',
    role: 'Spa Client',
    quote:
      'The spa ritual is pure luxury. Professional therapists, premium products, and a space that instantly melts your stress away.',
  },
]

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS)

  useEffect(() => {
    if (!db) return undefined

    const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'))

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          setTestimonials(DEFAULT_TESTIMONIALS)
          return
        }
        setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      },
      () => {
        setTestimonials(DEFAULT_TESTIMONIALS)
      },
    )

    return unsubscribe
  }, [])

  return testimonials
}
