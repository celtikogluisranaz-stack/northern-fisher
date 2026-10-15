'use client'

import { useState } from 'react'
import { upload } from '@vercel/blob/client'

type Props = {
  name: string // the hidden form field name this writes the final URL into
  defaultImageUrl?: string
}

export default function ImageUploadInput({ name, defaultImageUrl }: Props) {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl || '')
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const blob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
    })
    setImageUrl(blob.url)
    setUploading(false)
  }

  return (
    <div>
      <input type="hidden" name={name} value={imageUrl} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p className="text-sm text-slate-500 mt-1">Uploading...</p>}
      {imageUrl && !uploading && (
        <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
      )}
    </div>
  )
}