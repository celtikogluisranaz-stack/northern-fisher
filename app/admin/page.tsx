import { UserButton } from '@clerk/nextjs'

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <UserButton />
      </div>
      <p>Welcome to the Northern Fishers admin panel.</p>
    </div>
  )
}