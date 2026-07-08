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

export const DEFAULT_TESTIMONIALS = [
  {
    name: 'Ananya Rao',
    role: 'Bridal Client',
    quote:
      'From the trial to the wedding day, the team understood exactly what I wanted. I felt like the best version of myself walking down the aisle.',
    order: 0,
  },
  {
    name: 'Kabir Mehta',
    role: 'Regular Client, 3 years',
    quote:
      'Consistently the best haircut I have had. The attention to detail and the calm atmosphere keep me coming back every month.',
    order: 1,
  },
  {
    name: 'Priya Nair',
    role: 'Color & Skin Client',
    quote:
      'My balayage has never looked this natural. The facial afterwards left my skin glowing for weeks. Worth every rupee.',
    order: 2,
  },
  {
    name: 'Simran Kaur',
    role: 'Spa Client',
    quote:
      'The spa ritual is pure luxury. Professional therapists, premium products, and a space that instantly melts your stress away.',
    order: 3,
  },
]

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }

    const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'))

    const unsubscribe = onSnapshot(q, (snap) => {
      setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { testimonials, loading }
}

export function addTestimonial(testimonial) {
  return addDoc(collection(db, 'testimonials'), testimonial)
}

export function updateTestimonial(id, testimonial) {
  return updateDoc(doc(db, 'testimonials', id), testimonial)
}

export function deleteTestimonial(id) {
  return deleteDoc(doc(db, 'testimonials', id))
}

export async function importDefaultTestimonials() {
  await Promise.all(
    DEFAULT_TESTIMONIALS.map((testimonial) => addDoc(collection(db, 'testimonials'), testimonial)),
  )
}
