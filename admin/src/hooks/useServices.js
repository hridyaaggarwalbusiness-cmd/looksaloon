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

export const ICON_OPTIONS = ['scissors', 'color', 'sparkle', 'hand', 'crown', 'leaf']
export const GENDER_OPTIONS = ['unisex', 'women', 'men', 'kids']
export const BADGE_OPTIONS = ['Trending', 'Luxury', 'New', 'Best Seller']

export const DEFAULT_SERVICES = [
  {
    icon: 'scissors',
    name: 'Precision Haircut & Styling',
    shortDescription: 'A tailored cut and blow-dry, shaped to you.',
    description: 'A tailored cut and blow-dry finish, shaped to your face and lifestyle.',
    categoryId: '',
    imageUrl: '',
    imageStoragePath: null,
    gallery: [],
    originalPrice: 899,
    discountedPrice: null,
    durationMinutes: 45,
    gender: 'unisex',
    tags: [],
    popularity: 50,
    badges: [],
    enabled: true,
    featured: false,
    order: 0,
  },
  {
    icon: 'color',
    name: 'Global Color & Balayage',
    shortDescription: 'Dimensional color and balayage.',
    description: 'Dimensional color, balayage, and gloss treatments in low-damage formulas.',
    categoryId: '',
    imageUrl: '',
    imageStoragePath: null,
    gallery: [],
    originalPrice: 2499,
    discountedPrice: null,
    durationMinutes: 120,
    gender: 'unisex',
    tags: ['color'],
    popularity: 80,
    badges: ['Trending'],
    enabled: true,
    featured: true,
    order: 1,
  },
  {
    icon: 'sparkle',
    name: 'Luxe Facials & Skin Therapy',
    shortDescription: 'Deep-cleansing, brightening facials.',
    description: 'Deep-cleansing, brightening, and anti-aging facials for every skin type.',
    categoryId: '',
    imageUrl: '',
    imageStoragePath: null,
    gallery: [],
    originalPrice: 1499,
    discountedPrice: null,
    durationMinutes: 60,
    gender: 'unisex',
    tags: ['skin'],
    popularity: 60,
    badges: [],
    enabled: true,
    featured: false,
    order: 2,
  },
  {
    icon: 'hand',
    name: 'Manicure & Pedicure',
    shortDescription: 'Classic, gel, or nail art finishes.',
    description: 'Classic, gel, or nail art finishes with restorative hand and foot care.',
    categoryId: '',
    imageUrl: '',
    imageStoragePath: null,
    gallery: [],
    originalPrice: 999,
    discountedPrice: null,
    durationMinutes: 50,
    gender: 'unisex',
    tags: [],
    popularity: 40,
    badges: [],
    enabled: true,
    featured: false,
    order: 3,
  },
  {
    icon: 'crown',
    name: 'Bridal & Occasion Styling',
    shortDescription: 'Full hair, makeup, and draping.',
    description: 'Full hair, makeup, and draping with a complimentary trial session.',
    categoryId: '',
    imageUrl: '',
    imageStoragePath: null,
    gallery: [],
    originalPrice: 8999,
    discountedPrice: null,
    durationMinutes: 180,
    gender: 'women',
    tags: ['bridal'],
    popularity: 70,
    badges: ['Luxury'],
    enabled: true,
    featured: false,
    order: 4,
  },
  {
    icon: 'leaf',
    name: 'Spa & Body Rituals',
    shortDescription: 'Signature massages and body treatments.',
    description: 'Signature massages and body treatments designed to melt away stress.',
    categoryId: '',
    imageUrl: '',
    imageStoragePath: null,
    gallery: [],
    originalPrice: 1999,
    discountedPrice: null,
    durationMinutes: 75,
    gender: 'unisex',
    tags: ['spa'],
    popularity: 55,
    badges: [],
    enabled: true,
    featured: false,
    order: 5,
  },
]

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
