import Hero from '@/components/Hero'
import Carousel from '@/components/Carousel'
import ProductShowcase from '@/components/ProductShowcase'
import Footer from '@/components/Footer'
import CartProvider from '@/components/CartProvider'
import prisma from '@/lib/prisma'


export default async function Home() {
  const carouselImages = await prisma.carouselImage.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <main>
      <CartProvider />
      <Hero />
      <Carousel images={carouselImages} />
      <ProductShowcase />
      <Footer />
    </main>
  )
}