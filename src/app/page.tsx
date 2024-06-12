import CarOrderFigure from '@/components/CarOrderFigure'
import CarShowFigure from '@/components/CarShowFigure'
import { getVehicles } from '@/lib/vehicles'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  const jwt = cookies().get('Authorization')
  let isAdmin = false

  if (jwt !== undefined) {
    const claims = jose.decodeJwt(jwt.value)
    isAdmin = !!claims.isAdmin
  }

  const vehicles = await getVehicles()

  return (
    <main className="flex flex-col items-center gap-8">
      {isAdmin ? (
        <>
          <section className="flex flex-row flex-wrap justify-evenly gap-4">
            {vehicles.map((vehicle) => (
              <CarShowFigure key={vehicle.id} vehicle={vehicle} />
            ))}
          </section>

          <Link
            href="/kendaraan"
            className="w-fit rounded-full bg-blue-600 px-4 py-2 text-white"
          >
            Tambah
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-center text-4xl font-bold">Rent & Ride</h1>
          <p className="mx-auto w-1/2 py-4 text-center text-xl font-semibold">
            Layanan rental kendaraan untuk perusahaan maupun personal yang
            mengutamakan kenyamanan serta keamanan pelanggan
          </p>

          <section className="flex flex-row flex-wrap justify-evenly gap-4">
            {vehicles.map((vehicle) => (
              <CarOrderFigure key={vehicle.id} vehicle={vehicle} />
            ))}
          </section>
        </>
      )}
    </main>
  )
}
