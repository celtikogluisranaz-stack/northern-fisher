'use client'

import useEmblaCarousel from 'embla-carousel-react'

type CarouselImage = {
  id: string
  imageUrl: string
  altText: string | null
}

export default function Carousel({ images }: { images: CarouselImage[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true })

  if (images.length === 0) return null

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {images.map((image) => (
          <div key={image.id} className="flex-[0_0_100%] min-w-0">
            <img src={image.imageUrl} alt={image.altText ?? 'Northern Fishers'} className="w-full h-[400px] object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}