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

export const DEFAULT_SERVICES = [
  {
    icon: 'scissors',
    name: 'Precision Haircut & Styling',
    price: 'From ₹899',
    description: 'A tailored cut and blow-dry finish, shaped to your face and lifestyle.',
    popular: false,
    imageUrl: '',
    order: 0,
  },
  {
    icon: 'color',
    name: 'Global Color & Balayage',
    price: 'From ₹2,499',
    description: 'Dimensional color, balayage, and gloss treatments in low-damage formulas.',
    popular: true,
    imageUrl: '',
    order: 1,
  },
  {
    icon: 'sparkle',
    name: 'Luxe Facials & Skin Therapy',
    price: 'From ₹1,499',
    description: 'Deep-cleansing, brightening, and anti-aging facials for every skin type.',
    popular: false,
    imageUrl: '',
    order: 2,
  },
  {
    icon: 'hand',
    name: 'Manicure & Pedicure',
    price: 'From ₹999',
    description: 'Classic, gel, or nail art finishes with restorative hand and foot care.',
    popular: false,
    imageUrl: '',
    order: 3,
  },
  {
    icon: 'crown',
    name: 'Bridal & Occasion Styling',
    price: 'From ₹8,999',
    description: 'Full hair, makeup, and draping with a complimentary trial session.',
    popular: false,
    imageUrl: '',
    order: 4,
  },
  {
    icon: 'leaf',
    name: 'Spa & Body Rituals',
    price: 'From ₹1,999',
    description: 'Signature massages and body treatments designed to melt away stress.',
    popular: false,
    imageUrl: '',
    order: 5,
  },
]

export const ICON_OPTIONS = ['scissors', 'color', 'sparkle', 'hand', 'crown', 'leaf']

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }

    const q = query(collection(db, 'services'), orderBy('order', 'asc'))

    const unsubscribe = onSnapshot(q, (snap) => {
      setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { services, loading }
}

export function addService(service) {
  return addDoc(collection(db, 'services'), service)
}

export function updateService(id, service) {
  return updateDoc(doc(db, 'services', id), service)
}

export function deleteService(id) {
  return deleteDoc(doc(db, 'services', id))
}

export async function importDefaultServices() {
  await Promise.all(DEFAULT_SERVICES.map((service) => addDoc(collection(db, 'services'), service)))
}
