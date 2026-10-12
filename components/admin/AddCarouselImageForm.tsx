'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploadInput from '@/components/admin/ImageUploadInput'

export default function AddCarouselImageForm({
  addImage,
}: {
  addImage: (formData: FormData) => Promise<void>
}) {
  const router = useRouter()
  const [resetKey, setResetKey] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    try {
      setSubmitting(true)

      await addImage(formData)

      // Reset the uploaded image
      setResetKey((key) => key + 1)

      // Refresh the server component so the new image appears
      router.refresh()

      // Reset the native file input
      const form = document.querySelector(
        '#add-carousel-form'
      ) as HTMLFormElement | null

      form?.reset()
    } catch (error) {
      console.error('Failed to add carousel image:', error)
      alert('Failed to add image. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      id="add-carousel-form"
      action={handleSubmit}
      className="flex flex-col gap-4 max-w-md"
    >
      <ImageUploadInput
        name="imageUrl"
        resetKey={resetKey}
      />

      <input
        name="altText"
        placeholder="Short description (e.g. 'Winter sunrise on the lake')"
        className="border p-2 rounded"
      />

      <button
        type="submit"
        disabled={submitting}
        className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-2 rounded-lg"
      >
        {submitting ? 'Adding...' : 'Add Image'}
      </button>
    </form>
  )
}