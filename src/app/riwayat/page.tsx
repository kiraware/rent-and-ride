import CarHistoryFigure from '@/components/CarHistoryFigure'
import { getDoneOrdersByUserId } from '@/lib/orders'
import * as jose from 'jose'
import { cookies } from 'next/headers'

export default async function Riwayat() {
  const jwt = cookies().get('Authorization')
  let userId = ''

  if (jwt !== undefined) {
    const claims = jose.decodeJwt(jwt.value)

    if (claims.sub !== undefined) userId = claims.sub
  }

  const doneOrders = await getDoneOrdersByUserId(userId)

  return (
    <main>
      <h1>Riwayat Sewa Kendaraan</h1>

      <section className="flex flex-row flex-wrap justify-evenly">
        {doneOrders.map((doneOrder) => (
          <CarHistoryFigure key={doneOrder.id} order={doneOrder} />
        ))}
      </section>
    </main>
  )
}
