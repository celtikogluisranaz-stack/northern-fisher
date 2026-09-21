import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { items, customerEmail } = await req.json()

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: items.map((item: any) => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: item.price, // already in cents
      },
      quantity: item.quantity,
    })),
    shipping_address_collection: {
      allowed_countries: ['CA', 'US'],
    },
    metadata: {
      cartItems: JSON.stringify(
        items.map((item: any) => ({ id: item.id, quantity: item.quantity }))
      ),
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  })

  return NextResponse.json({ url: session.url })
}