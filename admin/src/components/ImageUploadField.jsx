import { useRef, useState } from 'react'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'

export async function uploadImage(pathPrefix, file, previousStoragePath) {
  const path = `${pathPrefix}/${Date.now()}-${file.name}`
  const fileRef = ref(storage, path)
  await uploadBytes(fileRef, file)
  const url = await getDownloadURL(fileRef)

  if (previousStoragePath) {
    await deleteObject(ref(storage, previousStoragePath)).catch(() => {})
  }

  return { url, storagePath: path }
}

export async function deleteImage(storagePath) {
  if (!storagePath) return
  await deleteObject(ref(storage, storagePath)).catch(() => {})
}

function ImageUploadField({ label, value, storagePath, pathPrefix, onChange }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const result = await uploadImage(pathPrefix, file, storagePath)
      onChange(result)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleRemove = async () => {
    await deleteImage(storagePath)
    onChange({ url: '', storagePath: null })
  }

  return (
    <div className="image-upload-field">
      {label && <span className="image-upload-label">{label}</span>}
      <div className="image-upload-body">
        {value ? (
          <div className="image-upload-preview">
            <img src={value} alt="" />
          </div>
        ) : (
          <div className="image-upload-empty">No image</div>
        )}
        <div className="image-upload-actions">
          <label className="btn btn-ghost btn-sm image-upload-trigger">
            {uploading ? 'Uploading…' : value ? 'Replace' : 'Upload'}
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} hidden disabled={uploading} />
          </label>
          {value && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={handleRemove} disabled={uploading}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUploadField
