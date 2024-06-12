import prisma from '@/lib/prisma'

export async function getVehicleStatsThisMonth() {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  const vehicles = await prisma.vehicle.findMany({
    select: {
      id: true,
      image: true,
      name: true,
      merk: true,
      color: true,
      type: true,
      Order: {
        where: {
          AND: [
            { startDate: { gte: startOfMonth } },
            { endDate: { lte: endOfMonth } },
          ],
        },
      },
    },
  })

  const stats: VehicleStats[] = vehicles.map((vehicle) => {
    const totalOrders = vehicle.Order.length
    return {
      id: vehicle.id,
      image: vehicle.image,
      name: vehicle.name,
      merk: vehicle.merk,
      color: vehicle.color,
      type: vehicle.type,
      totalOrders,
    }
  })

  return stats
}
