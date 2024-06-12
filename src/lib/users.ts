import prisma from '@/lib/prisma'
import type { User } from '@prisma/client'

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany()
}

export async function getUserById(userId: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })
}
