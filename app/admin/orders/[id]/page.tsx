import  prisma  from '@/lib/prisma'
import { requireAdmin } from '@/lib/requireAdmin'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()

  const { id } = await params

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  })

  if (!order) {
    return (
      <div>
        <p>Order not found.</p>
        <Link href="/admin/orders" className="text-orange-500">← Back to orders</Link>
      </div>
    )
  }

  async function setStatus(formData: FormData) {
    'use server'
    await requireAdmin()

    const newStatus = formData.get('status') as string
    if (!['paid', 'shipped'].includes(newStatus)) return

    await prisma.order.update({
      where: { id },
      data: { status: newStatus },
    })

    revalidatePath(`/admin/orders/${id}`)
    revalidatePath('/admin/orders')
  }

  return (
    <div className="max-w-2xl">
      <Link href="/admin/orders" className="text-orange-500">← Back to orders</Link>

      <h1 className="text-2xl font-bold mt-4 mb-1">Order #{order.id.slice(-8)}</h1>
      <p className="text-slate-500 mb-6">
        Placed {order.createdAt.toLocaleString('en-CA')}
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="font-semibold mb-1">Customer</h2>
          <p>{order.customerName}</p>
          <p className="text-slate-500">{order.customerEmail}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">Ship to</h2>
          <p>{order.shippingAddress}</p>
        </div>
      </div>

      <h2 className="font-semibold mb-2">Items</h2>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Product</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Price</th>
            <th className="py-2 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>${(item.priceAtPurchase / 100).toFixed(2)}</td>
              <td className="text-right">
                ${((item.priceAtPurchase * item.quantity) / 100).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="py-3 font-bold">Total paid</td>
            <td className="py-3 text-right font-bold">
              ${(order.totalAmount / 100).toFixed(2)} CAD
            </td>
          </tr>
        </tbody>
      </table>

      <div className="border rounded p-4 mb-6">
        <h2 className="font-semibold mb-2">Payment &amp; fulfillment</h2>
        <p>Status: <strong>{order.status}</strong></p>
        <p className="text-sm text-slate-500 break-all mt-1">
          Stripe session: {order.stripeSessionId ?? 'n/a'}
        </p>

        <form action={setStatus} className="mt-4">
          {order.status === 'shipped' ? (
            <>
              <input type="hidden" name="status" value="paid" />
              <button type="submit" className="text-slate-600 underline">
                Undo — mark as not shipped
              </button>
            </>
          ) : (
            <>
              <input type="hidden" name="status" value="shipped" />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Mark as shipped
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}