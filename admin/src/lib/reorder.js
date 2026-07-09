import { doc, writeBatch } from 'firebase/firestore'
import { db } from '../firebase'

export async function persistOrder(collectionName, items) {
  const batch = writeBatch(db)
  items.forEach((item, index) => {
    batch.update(doc(db, collectionName, item.id), { order: index })
  })
  await batch.commit()
}
