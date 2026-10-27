import { requireAdmin } from '@/lib/requireAdmin'
import  prisma  from '@/lib/prisma'

export default async function CarouselAdminPage() {

  await requireAdmin()

  const images = await prisma.carouselImage.findMany({
    orderBy: { order: 'asc' },
  })

  async function addImage(formData: FormData) {
    'use server'

    await requireAdmin()

    const imageUrl = formData.get('imageUrl') as string
    const maxOrder = await prisma.carouselImage.aggregate({ _max: { order: true } })

    await prisma.carouselImage.create({
      data: {
        imageUrl,
        altText: formData.get('altText') as string,
        order: (maxOrder._max.order ?? 0) + 1,
      },
    })
  }

  async function deleteImage(formData: FormData) {
    'use server'

    await requireAdmin()

    const id = formData.get('id') as string
    await prisma.carouselImage.delete({ where: { id } })
  }

  async function moveImage(formData: FormData) {
    'use server'

    await requireAdmin()

    const id = formData.get('id') as string
    const direction = formData.get('direction') as string

    const current = await prisma.carouselImage.findUnique({ where: { id } })
    if (!current) return

    const neighbor = await prisma.carouselImage.findFirst({
      where: {
        order: direction === 'up' ? { lt: current.order } : { gt: current.order },
      },
      orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
    })

    if (!neighbor) return

    // Swap order values
    await prisma.carouselImage.update({ where: { id: current.id }, data: { order: neighbor.order } })
    await prisma.carouselImage.update({ where: { id: neighbor.id }, data: { order: current.order } })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Carousel Images</h1>

      <div className="space-y-4 mb-8">
        {images.map((image, index) => (
          <div key={image.id} className="flex items-center gap-4 border p-3 rounded">
            <img src={image.imageUrl} alt={image.altText ?? ''} className="w-24 h-16 object-cover rounded" />
            <p className="flex-1">{image.altText || 'No description'}</p>

            <form action={moveImage}>
              <input type="hidden" name="id" value={image.id} />
              <input type="hidden" name="direction" value="up" />
              <button type="submit" disabled={index === 0} className="px-2 disabled:opacity-30">↑</button>
            </form>

            <form action={moveImage}>
              <input type="hidden" name="id" value={image.id} />
              <input type="hidden" name="direction" value="down" />
              <button type="submit" disabled={index === images.length - 1} className="px-2 disabled:opacity-30">↓</button>
            </form>

            <form action={deleteImage}>
              <input type="hidden" name="id" value={image.id} />
              <button type="submit" className="text-red-600 font-medium">Delete</button>
            </form>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold mb-3">Add New Image</h2>
      <AddCarouselImageForm addImage={addImage} />
    </div>
  )
}

// Needs to be a client component because of ImageUploadInput's file picker
import ImageUploadInput from '@/components/admin/ImageUploadInput'

function AddCarouselImageForm({ addImage }: { addImage: (formData: FormData) => Promise<void> }) {
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