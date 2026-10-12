import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ImageUploadInput from '@/components/admin/ImageUploadInput'


export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) {
    return <p>Product not found.</p>
  }

  async function updateProduct(formData: FormData) {
    'use server'

    await prisma.product.update({
      where: { id },
      data: {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Math.round(parseFloat(formData.get('price') as string) * 100),
        imageUrl: formData.get('imageUrl') as string,
        inventory: parseInt(formData.get('inventory') as string),
        active: formData.get('active') === 'on',
      },
    })

    redirect('/admin/products')
  }

  async function deleteProduct() {
    'use server'

    await prisma.product.delete({ where: { id } })
    redirect('/admin/products')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form action={updateProduct} className="flex flex-col gap-4 max-w-md">
        <input name="name" defaultValue={product.name} required className="border p-2 rounded" />
        <textarea name="description" defaultValue={product.description} required className="border p-2 rounded" />
        <input name="price" type="number" step="0.01" defaultValue={(product.price / 100).toFixed(2)} required className="border p-2 rounded" />
        <input name="inventory" type="number" defaultValue={product.inventory} required className="border p-2 rounded" />
        <ImageUploadInput name="imageUrl" defaultImageUrl={product.imageUrl} />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="active" defaultChecked={product.active} /> Active (visible on site)
        </label>
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg">
          Save Changes
        </button>
      </form>

      <form action={deleteProduct} className="mt-6">
        <button type="submit" className="text-red-600 font-medium">
          Delete this product
        </button>
      </form>
    </div>
  )
}