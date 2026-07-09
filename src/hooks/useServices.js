import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export const DEFAULT_SERVICES = [
  {
    id: 'default-haircut',
    icon: 'scissors',
    name: 'Precision Haircut & Styling',
    price: 'From ₹899',
    description: 'A tailored cut and blow-dry finish, shaped to your face and lifestyle.',
  },
  {
    id: 'default-color',
    icon: 'color',
    name: 'Global Color & Balayage',
    price: 'From ₹2,499',
    description: 'Dimensional color, balayage, and gloss treatments in low-damage formulas.',
    popular: true,
  },
  {
    id: 'default-facial',
    icon: 'sparkle',
    name: 'Luxe Facials & Skin Therapy',
    price: 'From ₹1,499',
    description: 'Deep-cleansing, brightening, and anti-aging facials for every skin type.',
  },
  {
    id: 'default-nails',
    icon: 'hand',
    name: 'Manicure & Pedicure',
    price: 'From ₹999',
    description: 'Classic, gel, or nail art finishes with restorative hand and foot care.',
  },
  {
    id: 'default-bridal',
    icon: 'crown',
    name: 'Bridal & Occasion Styling',
    price: 'From ₹8,999',
    description: 'Full hair, makeup, and draping with a complimentary trial session.',
  },
  {
    id: 'default-spa',
    icon: 'leaf',
    name: 'Spa & Body Rituals',
    price: 'From ₹1,999',
    description: 'Signature massages and body treatments designed to melt away stress.',
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
        setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
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
