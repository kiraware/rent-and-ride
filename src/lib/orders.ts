import prisma from '@/lib/prisma'
import type { Order } from '@prisma/client'
import { OrderStatus } from '@prisma/client'

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  return await prisma.order.findMany({
    where: {
      renterId: userId,
    },
  })
}

export async function getPendingOrPaidOrdersByUserId(
  userId: string,
): Promise<Order[]> {
  return await prisma.order.findMany({
    where: {
      renterId: userId,
      AND: {
        OR: [
          { status: OrderStatus.PENDING_PAYMENT },
          { status: OrderStatus.PAID },
        ],
      },
    },
  })
}

export async function getDoneOrdersByUserId(userId: string): Promise<Order[]> {
  return await prisma.order.findMany({
    where: {
      renterId: userId,
      status: OrderStatus.RENTER_RETURNED,
    },
  })
}
