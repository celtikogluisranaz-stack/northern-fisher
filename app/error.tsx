'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <button onClick={reset} className="mt-6 text-orange-500 font-semibold">Try again</button>
    </div>
  )
}