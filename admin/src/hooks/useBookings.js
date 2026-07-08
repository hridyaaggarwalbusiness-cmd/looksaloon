import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snap) => {
      setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { bookings, loading }
}

export function updateBookingStatus(id, status) {
  return updateDoc(doc(db, 'bookings', id), { status })
}

export function deleteBooking(id) {
  return deleteDoc(doc(db, 'bookings', id))
}
