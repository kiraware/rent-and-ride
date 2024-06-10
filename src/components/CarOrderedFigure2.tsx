import { getUserById } from '@/lib/users'
import { getVehicleById } from '@/lib/vehicles'
import type { Order } from '@prisma/client'
import { OrderStatus } from '@prisma/client'
import Image from 'next/image'

import CancelOrderForm from './CancelOrderForm'
import PayOrderForm from './PayOrderForm'
import ProcessOrderForm2 from './ProcessOrderForm2'

type Props = {
  order: Order
}

export default async function CarOrderFigure3({ order }: Props) {
  const vehicle = await getVehicleById(order.rentedVehicleId)

  if (!vehicle) return

  const user = await getUserById(order.renterId)

  if (!user) return

  return (
    <section className="flex h-auto w-fit flex-col justify-center gap-4 rounded-2xl border pb-4">
      <figure className="flex flex-col items-center">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={240}
          height={240}
          className="rounded-t-2xl"
        />
        <figcaption className="text-center">{vehicle.name}</figcaption>
      </figure>

      <p className="flex flex-row justify-between">
        <span>{vehicle.merk}</span>
        <span>{vehicle.color}</span>
        <span>{vehicle.type}</span>
      </p>

      <p>{order.status}</p>
      <p>
        {order.startDate.toLocaleDateString()} -{' '}
        {order.endDate.toLocaleDateString()}
      </p>
      <p className="text-center">Rp. {order.totalRentPrice}</p>
      <p>{user.name}</p>

      {order.status == OrderStatus.PAID ||
      order.status == OrderStatus.PENDING_PAYMENT ? (
        <CancelOrderForm orderId={order.id} />
      ) : (
        ''
      )}

      {order.status === OrderStatus.PENDING_PAYMENT ? (
        <PayOrderForm orderId={order.id} />
      ) : order.status === OrderStatus.PAID ||
        order.status === OrderStatus.RENTER_RECEIVED ? (
        <ProcessOrderForm2 orderId={order.id} status={order.status} />
      ) : null}
    </section>
  )
}
