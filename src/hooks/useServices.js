import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export const DEFAULT_SERVICES = [
  {
    id: 'default-haircut',
    icon: 'scissors',
    name: 'Precision Haircut & Styling',
    shortDescription: 'A tailored cut and blow-dry, shaped to you.',
    description: 'A tailored cut and blow-dry finish, shaped to your face and lifestyle.',
    categoryId: '',
    imageUrl: '',
    gallery: [],
    originalPrice: 899,
    discountedPrice: null,
    durationMinutes: 45,
    gender: 'unisex',
    tags: [],
    badges: [],
    enabled: true,
    featured: false,
  },
  {
    id: 'default-color',
    icon: 'color',
    name: 'Global Color & Balayage',
    shortDescription: 'Dimensional color and balayage.',
    description: 'Dimensional color, balayage, and gloss treatments in low-damage formulas.',
    categoryId: '',
    imageUrl: '',
    gallery: [],
    originalPrice: 2499,
    discountedPrice: null,
    durationMinutes: 120,
    gender: 'unisex',
    tags: ['color'],
    badges: ['Trending'],
    enabled: true,
    featured: true,
  },
  {
    id: 'default-facial',
    icon: 'sparkle',
    name: 'Luxe Facials & Skin Therapy',
    shortDescription: 'Deep-cleansing, brightening facials.',
    description: 'Deep-cleansing, brightening, and anti-aging facials for every skin type.',
    categoryId: '',
    imageUrl: '',
    gallery: [],
    originalPrice: 1499,
    discountedPrice: null,
    durationMinutes: 60,
    gender: 'unisex',
    tags: [],
    badges: [],
    enabled: true,
    featured: false,
  },
  {
    id: 'default-nails',
    icon: 'hand',
    name: 'Manicure & Pedicure',
    shortDescription: 'Classic, gel, or nail art finishes.',
    description: 'Classic, gel, or nail art finishes with restorative hand and foot care.',
    categoryId: '',
    imageUrl: '',
    gallery: [],
    originalPrice: 999,
    discountedPrice: null,
    durationMinutes: 50,
    gender: 'unisex',
    tags: [],
    badges: [],
    enabled: true,
    featured: false,
  },
  {
    id: 'default-bridal',
    icon: 'crown',
    name: 'Bridal & Occasion Styling',
    shortDescription: 'Full hair, makeup, and draping.',
    description: 'Full hair, makeup, and draping with a complimentary trial session.',
    categoryId: '',
    imageUrl: '',
    gallery: [],
    originalPrice: 8999,
    discountedPrice: null,
    durationMinutes: 180,
    gender: 'women',
    tags: ['bridal'],
    badges: ['Luxury'],
    enabled: true,
    featured: false,
  },
  {
    id: 'default-spa',
    icon: 'leaf',
    name: 'Spa & Body Rituals',
    shortDescription: 'Signature massages and body treatments.',
    description: 'Signature massages and body treatments designed to melt away stress.',
    categoryId: '',
    imageUrl: '',
    gallery: [],
    originalPrice: 1999,
    discountedPrice: null,
    durationMinutes: 75,
    gender: 'unisex',
    tags: ['spa'],
    badges: [],
    enabled: true,
    featured: false,
  },
]

export function useServices() {
  const [services, setServices] = useState(DEFAULT_SERVICES)
  const [usingDefaults, setUsingDefaults] = useState(true)

  useEffect(() => {
    if (!db) return undefined

    const q = query(collection(db, 'services'), orderBy('order', 'asc'))

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          setServices(DEFAULT_SERVICES)
          setUsingDefaults(true)
          return
        }
        const docs = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((service) => service.enabled !== false)
        setServices(docs)
        setUsingDefaults(false)
      },
      () => {
        setServices(DEFAULT_SERVICES)
        setUsingDefaults(true)
      },
    )

    return unsubscribe
  }, [])

  return { services, usingDefaults }
}
