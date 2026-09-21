export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-bold">Thank you for your order!</h1>
      <p className="mt-4 text-slate-600">
        A confirmation email is on its way. We&apos;ll get your gear out on the ice soon.
      </p>
      <a href="/" className="mt-8 text-orange-500 font-semibold">Back to home</a>
    </div>
  )
}