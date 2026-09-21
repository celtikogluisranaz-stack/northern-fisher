export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-bold">Checkout cancelled</h1>
      <p className="mt-4 text-slate-600">Your cart is still saved — no charge was made.</p>
      <a href="/" className="mt-8 text-orange-500 font-semibold">Back to home</a>
    </div>
  )
}