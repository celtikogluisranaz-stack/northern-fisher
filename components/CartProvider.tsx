'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'

export default function CartProvider() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}