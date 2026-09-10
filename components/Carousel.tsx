'use client'

import useEmblaCarousel from 'embla-carousel-react'

const images = [
  'https://images.unsplash.com/photo-1688770522956-bf5eeb06c9c1?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1707872359061-ab4fa9caaefa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1702086465743-a7d4b6502067?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true })

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {images.map((src, i) => (
          <div key={i} className="flex-[0_0_100%] min-w-0">
            <img src={src} alt={`Northern Fishers photo ${i + 1}`} className="w-full h-[400px] object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}