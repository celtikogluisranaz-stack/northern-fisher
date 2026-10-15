'use client'

<<<<<<< HEAD
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
=======
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (resetKey !== undefined) {
      setImageUrl('')
    }
  }, [resetKey])

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
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
    } finally {
      setUploading(false)
    }
>>>>>>> 01e89af65ddb1a994ca43cf9830eb41ad298e2ce
  }

  return (
    <div>
      <input type="hidden" name={name} value={imageUrl} />
<<<<<<< HEAD
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p className="text-sm text-slate-500 mt-1">Uploading...</p>}
      {imageUrl && !uploading && (
        <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
=======

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {uploading && (
        <p className="text-sm text-slate-500 mt-1">
          Uploading...
        </p>
      )}

      {imageUrl && !uploading && (
        <img
          src={imageUrl}
          alt="Preview"
          className="mt-2 w-32 h-32 object-cover rounded"
        />
>>>>>>> 01e89af65ddb1a994ca43cf9830eb41ad298e2ce
      )}
    </div>
  )
}