import  prisma  from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ImageUploadInput from '@/components/admin/ImageUploadInput'

export default function NewProductPage() {
  async function createProduct(formData: FormData) {
    'use server'

    await prisma.product.create({
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form action={createProduct} className="flex flex-col gap-4 max-w-md">
        <input name="name" placeholder="Product name" required className="border p-2 rounded" />
        <textarea name="description" placeholder="Description" required className="border p-2 rounded" />
        <input name="price" type="number" step="0.01" placeholder="Price (e.g. 29.99)" required className="border p-2 rounded" />
        <input name="inventory" type="number" placeholder="Inventory count" required className="border p-2 rounded" />
        <ImageUploadInput name="imageUrl" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="active" defaultChecked /> Active (visible on site)
        </label>
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg">
          Create Product
        </button>
      </form>
    </div>
  )
}