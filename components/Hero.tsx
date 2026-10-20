export default function Hero() {
  return (
    <section className="bg-slate-900 text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Northern Fishers
      </h1>
      <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-xl mx-auto">
        Built for the ice. Trusted by anglers across Canada.
      </p>
      <a
        href="#product"
        className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-8 py-3 rounded-lg"
      >
        Shop Now
      </a>
    </section>
  )
}