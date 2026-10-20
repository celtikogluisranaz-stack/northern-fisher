import  prisma  from '@/lib/prisma'
import Link from 'next/link'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Image</th>
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Inventory</th>
            <th className="py-2">Active</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-3">
                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td>{product.name}</td>
              <td>${(product.price / 100).toFixed(2)}</td>
              <td>{product.inventory}</td>
              <td>{product.active ? 'Yes' : 'No'}</td>
              <td>
                <Link href={`/admin/products/${product.id}`} className="text-orange-500 font-medium">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}