import CarOrderFigure from '@/components/CarOrderFigure'
import { getVehicles } from '@/lib/vehicles'
import * as jose from 'jose'
import { cookies } from 'next/headers'

export default async function Home() {
  const jwt = cookies().get('Authorization')
  let isAdmin = false

  if (jwt !== undefined) {
    const claims = jose.decodeJwt(jwt.value)
    isAdmin = !!claims.isAdmin
  }

  const vehicles = await getVehicles()

  return (
    <>
      {isAdmin ? (
        <></>
      ) : (
        <>
          <h1 className="text-center text-4xl font-bold">Rent & Ride</h1>
          <p className="mx-auto w-1/2 py-4 text-center text-xl font-semibold">
            Layanan rental kendaraan untuk perusahaan maupun personal yang
            mengutamakan kenyamanan serta keamanan pelanggan
          </p>

          <section className="flex flex-row flex-wrap justify-evenly">
            {vehicles.map((vehicle) => (
              <CarOrderFigure key={vehicle.id} vehicle={vehicle} />
            ))}
          </section>
        </>
      )}
    </>
  )
}
