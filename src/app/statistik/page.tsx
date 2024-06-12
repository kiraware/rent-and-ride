import CarStatFigure from '@/components/CarStatFigure'
import { getVehicleStatsThisMonth } from '@/lib/stats'

export default async function Statistik() {
  const stats = await getVehicleStatsThisMonth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4">
      <h1 className="mt-16 w-fit text-4xl font-bold after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Statistik Sewa Kendaraan
      </h1>

      <section className="w-full px-4 mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gambar
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Mobil
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statistik
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.map((stat) => (
                <tr key={stat.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <CarStatFigure vehicleStat={stat} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`Disewakan ${stat.totalOrders} kali / bulan`}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`${stat.merk} ${stat.color} ${stat.type}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
