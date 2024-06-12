import type { ColorEnum, MerkEnum, TypeEnum } from '@prisma/client'

type VehicleStats = {
  id: string
  image: string
  name: string
  merk: MerkEnum
  color: ColorEnum
  type: TypeEnum
  totalOrders: number
}
