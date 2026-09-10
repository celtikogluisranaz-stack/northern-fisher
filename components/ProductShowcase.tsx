import prisma from "@/lib/prisma"


export default async function ProductShowcase() {
  const product = await prisma.product.findFirst({
    where: { active: true },
  })

  if (!product) {
    return <p className="text-center py-20">No product available.</p>
  }

  return (
    <section id="product" className="py-20 px-6 max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full rounded-lg"
      />
      <div>
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="mt-4 text-slate-600">{product.description}</p>
        <p className="mt-6 text-2xl font-semibold">
          ${(product.price / 100).toFixed(2)} CAD
        </p>
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-8 py-3 rounded-lg">
          Add to Cart
        </button>
      </div>
    </section>
  )
}