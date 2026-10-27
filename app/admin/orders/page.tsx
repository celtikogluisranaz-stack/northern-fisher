import  prisma  from '@/lib/prisma'
import { requireAdmin } from '@/lib/requireAdmin'
import Link from 'next/link'

export default async function AdminDashboard() {
  await requireAdmin()

  const [toShip, totalOrders, revenue] = await Promise.all([
    prisma.order.count({ where: { status: 'paid' } }),
    prisma.order.count({ where: { status: { in: ['paid', 'shipped'] } } }),
    prisma.order.aggregate({
      where: { status: { in: ['paid', 'shipped'] } },
      _sum: { totalAmount: true },
    }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/admin/orders" className="border rounded p-4 hover:bg-slate-50">
          <p className="text-sm text-slate-500">Orders to ship</p>
          <p className="text-3xl font-bold">{toShip}</p>
        </Link>
        <div className="border rounded p-4">
          <p className="text-sm text-slate-500">Total orders</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="border rounded p-4">
          <p className="text-sm text-slate-500">Revenue (CAD)</p>
          <p className="text-3xl font-bold">
            ${((revenue._sum.totalAmount ?? 0) / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}