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
    <main className="flex min-h-screen flex-col items-center justify-start gap-4">
      <h1 className="w-fit pb-16 text-4xl font-bold after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Riwayat sewa kendaraan
      </h1>

      <section className="flex flex-row flex-wrap justify-evenly">
        {doneOrders.map((doneOrder) => (
          <CarHistoryFigure key={doneOrder.id} order={doneOrder} />
        ))}
      </section>
    </main>
  )
}
