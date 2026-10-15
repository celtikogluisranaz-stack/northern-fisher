'use client'

import { useEffect, useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'

type Props = {
  name: string
  defaultImageUrl?: string
  resetKey?: number
}

export default function ImageUploadInput({
  name,
  defaultImageUrl,
  resetKey,
}: Props) {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl || '')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setImageUrl(defaultImageUrl || '')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [resetKey, defaultImageUrl])

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    try {
      setUploading(true)

      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      })

      setImageUrl(blob.url)
    } catch (error) {
      console.error('Image upload failed:', error)
      alert('Image upload failed. Please try again.')

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="hidden"
        name={name}
        value={imageUrl}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm"
      />

      {uploading && (
        <p className="text-sm text-gray-500">
          Uploading image...
        </p>
      )}

      {imageUrl && (
        <div className="space-y-2">
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="h-24 w-24 rounded object-cover"
          />

          <button
            type="button"
            onClick={() => {
              setImageUrl('')

              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
            disabled={uploading}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  )
}