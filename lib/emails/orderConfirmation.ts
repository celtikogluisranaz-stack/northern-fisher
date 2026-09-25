type OrderEmailItem = {
  name: string
  quantity: number
  priceAtPurchase: number // cents
}

type OrderEmailProps = {
  customerName: string
  orderId: string
  items: OrderEmailItem[]
  totalAmount: number // cents
  shippingAddress: string
}

export function orderConfirmationHtml({
  customerName,
  orderId,
  items,
  totalAmount,
  shippingAddress,
}: OrderEmailProps) {
  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px 0;">${item.name} x${item.quantity}</td>
        <td style="padding: 8px 0; text-align: right;">$${((item.priceAtPurchase * item.quantity) / 100).toFixed(2)}</td>
      </tr>
    `
    )
    .join('')

  return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #1e293b;">
      <h1 style="color: #0f172a;">Thanks for your order, ${customerName}!</h1>
      <p>Your Northern Fishers gear is being prepared. Here's your order summary:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        ${itemRows}
        <tr style="border-top: 2px solid #e2e8f0;">
          <td style="padding: 12px 0; font-weight: bold;">Total</td>
          <td style="padding: 12px 0; text-align: right; font-weight: bold;">$${(totalAmount / 100).toFixed(2)} CAD</td>
        </tr>
      </table>

      <h3 style="margin-top: 24px;">Shipping to:</h3>
      <p>${shippingAddress}</p>

      <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
        Order ID: ${orderId}<br/>
        Northern Fishers — Built for the ice.
      </p>
    </div>
  `
}