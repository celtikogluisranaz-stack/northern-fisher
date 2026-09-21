import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

import Stripe from 'stripe'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const cartItems = JSON.parse(session.metadata?.cartItems || '[]')

    const address = session.customer_details?.address
    const shippingAddress = address
      ? `${address.line1}, ${address.city}, ${address.state} ${address.postal_code}, ${address.country}`
      : 'No address provided'

    // Fetch current product prices from DB so we store accurate priceAtPurchase
    const productIds = cartItems.map((item: any) => item.id)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    const order = await prisma.order.create({
      data: {
        customerEmail: session.customer_details?.email || 'unknown',
        customerName: session.customer_details?.name || 'unknown',
        shippingAddress,
        totalAmount: session.amount_total || 0,
        status: 'paid',
        stripeSessionId: session.id,
        items: {
          create: cartItems.map((item: any) => {
            const product = products.find((p) => p.id === item.id)
            return {
              productId: item.id,
              quantity: item.quantity,
              priceAtPurchase: product?.price || 0,
            }
          }),
        },
      },
    })

    console.log('Order created:', order.id)
    // Phase 5 will add: send confirmation email here
  }

  return NextResponse.json({ received: true })
}