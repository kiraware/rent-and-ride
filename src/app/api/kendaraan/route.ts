import prisma from '@/lib/prisma'
import { CreateVehicleSchema } from '@/schemas'
import { ColorEnum, MerkEnum, VehicleTypeEnum } from '@prisma/client'

export async function POST(request: Request) {
  // Read data off req body
  const body = await request.json()

  // Validate data
  const validatedFields = CreateVehicleSchema.safeParse(body)

  if (!validatedFields.success) {
    return Response.json(
      {
        error: 'Invalid name or image, merk, color, type, price',
      },
      { status: 400 },
    )
  }

  // Read data off validated fields
  const { name, image, merk, color, type, price } = validatedFields.data

  // Create the vehicle
  const vehicle = await prisma.vehicle.create({
    data: {
      name,
      image,
      merk: merk as MerkEnum,
      color: color as ColorEnum,
      type: type as VehicleTypeEnum,
      price: Number(price),
    },
  })

  if (!vehicle) {
    return Response.json(
      {
        error: 'Invalid name or image or merk or color or type or price',
      },
      { status: 400 },
    )
  }

  // Respond something
  return Response.json({})
}
