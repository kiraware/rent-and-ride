import prisma from '@/lib/prisma'
import { ProcessOrderSchema } from '@/schemas'
import { OrderStatus } from '@prisma/client'

export async function POST(request: Request) {
  // Read data off req body
  const body = await request.json()

  // Validate data
  const validatedFields = ProcessOrderSchema.safeParse(body)

  if (!validatedFields.success) {
    return Response.json(
      {
        error: 'Invalid orderId',
      },
      { status: 400 },
    )
  }

  // Read data off validated fields
  const { orderId, action } = validatedFields.data

  let order
  if (action === 'bayar') {
    order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { status: OrderStatus.PAID },
    })
  } else if (action === 'ambil') {
    order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { status: OrderStatus.RENTER_RECEIVED },
    })
  } else if (action === 'kembalikan') {
    order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { status: OrderStatus.RENTER_RETURNED },
    })
  }

  if (!order) {
    return Response.json(
      {
        error: 'Invalid orderId',
      },
      { status: 400 },
    )
  }

  // Respond something
  return Response.json({})
}
