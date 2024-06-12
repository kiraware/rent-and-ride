import CarStatFigure from '@/components/CarStatFigure'
import { getVehicleStatsThisMonth } from '@/lib/stats'

export default async function Statistik() {
  const stats = await getVehicleStatsThisMonth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="w-fit pb-16 text-4xl font-bold after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Statistik Penyewaan Kendaraan
      </h1>

      <section className="flex flex-row flex-wrap justify-evenly">
        {stats.map((stat) => (
          <CarStatFigure key={stat.id} vehicleStat={stat} />
        ))}
      </section>
    </main>
  )
}
