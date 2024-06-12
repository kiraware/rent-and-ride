import CarOrderedFigure2 from '@/components/CarOrderedFigure2'
import { getOrders } from '@/lib/orders'

export default async function Pesanan() {
  const orders = await getOrders()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="w-fit pb-16 text-4xl font-bold after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Pesanan Kendaraan
      </h1>

      <section className="flex flex-row flex-wrap justify-evenly gap-4">
        {orders.map((order) => (
          <CarOrderedFigure2 key={order.id} order={order} />
        ))}
      </section>
    </main>
  )
}
