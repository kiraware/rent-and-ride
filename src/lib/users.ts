import prisma from '@/lib/prisma'
import type { User } from '@prisma/client'

export async function getUserById(userId: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })
}
