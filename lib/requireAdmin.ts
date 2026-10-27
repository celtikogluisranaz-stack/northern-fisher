import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress

  if (!email || email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }
}