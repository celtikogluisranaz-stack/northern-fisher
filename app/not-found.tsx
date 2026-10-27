import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link href="/" className="mt-6 text-orange-500 font-semibold">Back to home</Link>
    </div>
  )
}