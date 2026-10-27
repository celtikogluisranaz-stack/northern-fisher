import  prisma  from '@/lib/prisma'
import { requireAdmin } from '@/lib/requireAdmin'
import Link from 'next/link'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: 'bg-blue-100 text-blue-800',
    shipped: 'bg-green-100 text-green-800',
    pending: 'bg-slate-100 text-slate-700',
  }
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[status] ?? styles.pending}`}>
      {status}
    </span>
  )
}

export default async function OrdersPage() {
  await requireAdmin()

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { items: true } } },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-slate-500">No orders yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Date</th>
              <th className="py-2">Order</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Items</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-3">
                  {order.createdAt.toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td>#{order.id.slice(-8)}</td>
                <td>
                  <div>{order.customerName}</div>
                  <div className="text-sm text-slate-500">{order.customerEmail}</div>
                </td>
                <td>{order._count.items}</td>
                <td>${(order.totalAmount / 100).toFixed(2)}</td>
                <td><StatusBadge status={order.status} /></td>
                <td>
                  <Link href={`/admin/orders/${order.id}`} className="text-orange-500 font-medium">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}