'use client'

import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  const handleCheckout = async () => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  })
  const data = await res.json()
  if (data.url) {
    window.location.href = data.url
  }
}

  return (
    <>
      {/* Dark overlay behind the drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 140px)' }}>
          {items.length === 0 && (
            <p className="text-slate-500 text-center mt-10">Your cart is empty.</p>
          )}

          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center border-b pb-4">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-slate-500">${(item.price / 100).toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)}>
                <Trash2 className="w-5 h-5 text-slate-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="absolute bottom-0 w-full p-4 border-t bg-white">
            <div className="flex justify-between font-semibold mb-3">
              <span>Subtotal</span>
              <span>${(totalPrice() / 100).toFixed(2)}</span>
            </div>
                <button
               onClick={handleCheckout}
               className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
                >
                     Checkout
                </button>
          </div>
        )}
      </div>
    </>
  )
}