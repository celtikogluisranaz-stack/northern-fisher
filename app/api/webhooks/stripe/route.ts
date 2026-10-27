
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { orderConfirmationHtml } from '@/lib/emails/orderConfirmation'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing Stripe signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed', err)

    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Fix 2: Prevent duplicate orders for the same Stripe Checkout Session.
    const existing = await prisma.order.findUnique({
      where: { stripeSessionId: session.id },
    })

    if (existing) {
      console.log('Order already exists for session:', session.id)

      return NextResponse.json({ received: true })
    }

    const cartItems = JSON.parse(session.metadata?.cartItems || '[]')

    const address = session.customer_details?.address

    const shippingAddress = address
      ? `${address.line1}, ${address.city}, ${address.state} ${address.postal_code}, ${address.country}`
      : 'No address provided'

    // Fetch product prices from the database.
    const productIds = cartItems.map((item: any) => item.id)

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    // Create the order and its items.
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

    // Fetch the order with product details for the confirmation email.
    const orderWithProducts = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: { product: true },
        },
      },
    })

    if (orderWithProducts) {
      // Fix 1: Email failure must not fail the webhook response.
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: orderWithProducts.customerEmail,
          subject: `Order Confirmation — Northern Fishers #${orderWithProducts.id.slice(-8)}`,
          html: orderConfirmationHtml({
            customerName: orderWithProducts.customerName,
            orderId: orderWithProducts.id,
            items: orderWithProducts.items.map((item) => ({
              name: item.product.name,
              quantity: item.quantity,
              priceAtPurchase: item.priceAtPurchase,
            })),
            totalAmount: orderWithProducts.totalAmount,
            shippingAddress: orderWithProducts.shippingAddress,
          }),
        })

        console.log(
          'Confirmation email sent to:',
          orderWithProducts.customerEmail
        )
      } catch (err) {
        console.error('Email failed, order still saved:', err)
      }
    }
  }

  return NextResponse.json({ received: true })
}
