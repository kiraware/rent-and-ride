import CarShowFigure2 from '@/components/CarShowFigure2'
import EditVehicleForm from '@/components/EditVehicleForm'
import { getVehicleById, getVehicles } from '@/lib/vehicles'
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

export default async function EditKendaraan({ params: { vehicleId } }: Props) {
  const vehicle = await getVehicleById(vehicleId)

  if (!vehicle) notFound()

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4">
      <h1 className="w-fit pb-16 text-4xl font-bold after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Sunting kendaraan
      </h1>

      <section className="flex flex-row gap-4">
        <CarShowFigure2 vehicle={vehicle} />

        <EditVehicleForm vehicle={vehicle} />
      </section>
    </main>
  )
}
