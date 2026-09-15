import Hero from '@/components/Hero'
import Carousel from '@/components/Carousel'
import ProductShowcase from '@/components/ProductShowcase'
import Footer from '@/components/Footer'
import CartProvider from '@/components/CartProvider'

export default function Home() {
  return (
    <main>
      <CartProvider />
      <Hero />
      <Carousel />
      <ProductShowcase />
      <Footer />
    </main>
  )
}