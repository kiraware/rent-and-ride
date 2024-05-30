import prisma from '@/lib/prisma'
import { CancelOrderSchema } from '@/schemas'

export async function POST(request: Request) {
  // Read data off req body
  const body = await request.json()

  // Validate data
  const validatedFields = CancelOrderSchema.safeParse(body)

  if (!validatedFields.success) {
    return Response.json(
      {
        error: 'Invalid orderId',
      },
      { status: 400 },
    )
  }

  // Read data off validated fields
  const { orderId } = validatedFields.data

  // Delete the order
  const order = await prisma.order.delete({
    where: {
      id: orderId,
    },
  })

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
