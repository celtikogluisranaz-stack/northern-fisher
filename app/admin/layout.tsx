import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const ADMIN_EMAIL = 'celtikogluisranaz@gmail.com' // keep your real email here

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress

  if (email !== ADMIN_EMAIL) {
    redirect('/')
  }

<<<<<<< HEAD
  return (
    <div className="flex min-h-screen">
=======
  return <div className="flex min-h-screen">
>>>>>>> 01e89af65ddb1a994ca43cf9830eb41ad298e2ce
      <aside className="w-56 bg-slate-900 text-white p-6 flex flex-col gap-4">
        <h2 className="font-bold text-lg mb-6">Northern Fishers</h2>
        <Link href="/admin" className="hover:text-orange-400">Dashboard</Link>
        <Link href="/admin/products" className="hover:text-orange-400">Products</Link>
        <Link href="/admin/carousel" className="hover:text-orange-400">Carousel</Link>
        <Link href="/admin/orders" className="hover:text-orange-400">Orders</Link>
        <div className="mt-auto">
          <UserButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
<<<<<<< HEAD
  )
=======
>>>>>>> 01e89af65ddb1a994ca43cf9830eb41ad298e2ce
}