'use client'

import { useCartStore } from '@/store/cartStore'

type Props = {
  id: string
  name: string
  price: number
  imageUrl: string
}

export default function AddToCartButton({ id, name, price, imageUrl }: Props) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <button
      onClick={() => addItem({ id, name, price, imageUrl })}
      className="mt-6 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-8 py-3 rounded-lg"
    >
      Add to Cart
    </button>
  )
}