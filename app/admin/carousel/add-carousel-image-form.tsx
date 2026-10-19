"use client"
// Needs to be a client component because of ImageUploadInput's file picker
import ImageUploadInput from '@/components/admin/ImageUploadInput'
import prisma from '@/lib/prisma'

export function AddCarouselImageForm({ addImage }: { addImage: (formData: FormData) => Promise<void> }) {
  return (
    <form action={addImage} className="flex flex-col gap-4 max-w-md">
      <ImageUploadInput name="imageUrl" />
      <input name="altText" placeholder="Short description (e.g. 'Winter sunrise on the lake')" className="border p-2 rounded" />
      <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg">
        Add Image
      </button>
    </form>
  )
}
