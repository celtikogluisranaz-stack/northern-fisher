'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

type Props = {
  onCartClick: () => void
}

export default function Navbar({ onCartClick }: Props) {
  const [hasMounted, setHasMounted] = useState(false)

  const totalItems = useCartStore((state) => state.totalItems())

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-40 bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      <span className="font-bold text-lg">Northern Fishers</span>

      <button
        onClick={onCartClick}
        className="relative"
        aria-label="Open shopping cart"
      >
        <ShoppingCart className="w-6 h-6" />

        {hasMounted && totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </nav>
  )
}
