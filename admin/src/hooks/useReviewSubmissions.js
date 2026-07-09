import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '../firebase'

export function useReviewSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return undefined
    }

    const q = query(collection(db, 'reviewSubmissions'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snap) => {
      setSubmissions(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { submissions, loading }
}

export async function approveSubmission(submission, order) {
  const { name, role, quote } = submission
  await addDoc(collection(db, 'testimonials'), { name, role, quote, order })
  await deleteDoc(doc(db, 'reviewSubmissions', submission.id))
}

export function dismissSubmission(id) {
  return deleteDoc(doc(db, 'reviewSubmissions', id))
}
