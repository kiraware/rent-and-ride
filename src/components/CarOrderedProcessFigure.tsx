import { getVehicleById } from '@/lib/vehicles'
import type { Order } from '@prisma/client'
import Image from 'next/image'

import ProcessOrderForm from './ProcessOrderForm'

type Props = {
  order: Order
}

export default async function CarOrderedProcessFigure({ order }: Props) {
  const { id, rentedVehicleId, status } = order

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

      <p>{status}</p>

      <ProcessOrderForm orderId={id} status={status} />
    </section>
  )
}
