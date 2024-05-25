import { getVehicleById } from '@/lib/vehicles'
import type { Order } from '@prisma/client'
import Image from 'next/image'

type Props = {
  order: Order
}

export default async function CarHistoryFigure({ order }: Props) {
  const { rentedVehicleId, startDate, endDate, totalRentPrice } = order

  const vehicle = await getVehicleById(rentedVehicleId)

  if (!vehicle) return

  const { name, image, merk, color, type } = vehicle

  return (
    <section className="flex h-auto w-fit flex-col justify-center gap-4 rounded-2xl border">
      <figure className="flex flex-col items-center">
        <Image
          src={image}
          alt={name}
          width={240}
          height={240}
          className="rounded-t-2xl"
        />
        <figcaption className="text-center">{name}</figcaption>
      </figure>

      <p className="flex flex-row justify-between">
        <span>{merk}</span>
        <span>{color}</span>
        <span>{type}</span>
      </p>

      <p>
        {startDate.toISOString()}-{endDate.toISOString()}
      </p>
      <p className="text-center">Rp. {totalRentPrice}</p>
    </section>
  )
}
