import prisma from '@/lib/prisma'
import type { Vehicle } from '@prisma/client'

export async function getVehicles(): Promise<Vehicle[]> {
  return await prisma.vehicle.findMany()
}

export async function getVehicleById(
  vehicleId: string,
): Promise<Vehicle | null> {
  return await prisma.vehicle.findFirst({
    where: {
      id: vehicleId,
    },
  })
}
