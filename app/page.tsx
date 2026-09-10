import Hero from '@/components/Hero'
import Carousel from '@/components/Carousel'
import ProductShowcase from '@/components/ProductShowcase'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Carousel />
      <ProductShowcase />
      <Footer />
    </main>
  )
}