import CarOrderFigure2 from '@/components/CarOrderFigure2'
import PesanKendaraanForm from '@/components/PesanKendaraanForm'
import { getVehicleById, getVehicles } from '@/lib/vehicles'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    vehicleId: string
  }
}

export async function generateStaticParams() {
  const vehicles = await getVehicles()

  if (!vehicles) return []

  return vehicles.map((vehicle) => ({ vehicleId: vehicle.id }))
}

export async function generateMetadata({ params: { vehicleId } }: Props) {
  const vehicle = await getVehicleById(vehicleId)

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found',
    }
  }

  return {
    title: vehicle.name,
  }
}

export default async function PesanKendaraan({ params: { vehicleId } }: Props) {
  const vehicle = await getVehicleById(vehicleId)
  const jwt = cookies().get('Authorization')
  let userId = ''

  if (jwt !== undefined) {
    const claims = jose.decodeJwt(jwt.value)

    if (claims.sub !== undefined) userId = claims.sub
  }

  if (!vehicle) notFound()

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4">
      <h1 className="w-fit pb-16 text-4xl font-bold after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Pesan sewa kendaraan
      </h1>

      <section className="flex flex-row gap-4">
        <CarOrderFigure2 vehicle={vehicle} />

        <PesanKendaraanForm
          vehicleId={vehicle.id}
          vehiclePrice={vehicle.price}
          userId={userId}
        />
      </section>
    </main>
  )
}
