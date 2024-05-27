import prisma from '@/lib/prisma'
import { PesanKendaraanSchema } from '@/schemas'

export async function POST(request: Request) {
  // Read data off req body
  const body = await request.json()

  // Validate data
  const validatedFields = PesanKendaraanSchema.safeParse(body)

  if (!validatedFields.success) {
    return Response.json(
      {
        error: 'Invalid userId or vehicleId or price or startDate or endDate',
      },
      { status: 400 },
    )
  }

  // Read data off validated fields
  const { userId, vehicleId, price, startDate, endDate } = validatedFields.data

  // Create the order
  const order = await prisma.order.create({
    data: {
      renterId: userId,
      rentedVehicleId: vehicleId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalRentPrice: Number(price)
    },
  })

  if (!order) {
    return Response.json(
      {
        error: 'Invalid userId or vehicleId or price or startDate or endDate',
      },
      { status: 400 },
    )
  }

  // return something
  return Response.json({})
}
