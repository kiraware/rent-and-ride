'use client'

import deleteVehicle from '@/actions/kendaraan'
import { useFormState } from 'react-dom'

type Props = {
  vehicleId: string
}

export default function DeleteVehicleForm({ vehicleId }: Props) {
  const [error, formAction] = useFormState(deleteVehicle, undefined)

  return (
    <>
      <form action={formAction} className="flex flex-col items-center gap-8">
        <input
          id="vehicleId"
          type="text"
          name="vehicleId"
          value={vehicleId}
          readOnly
          hidden
          required
        />

        <button
          type="submit"
          className="w-fit rounded-full bg-red-600 px-4 py-2 text-white"
        >
          Hapus
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
    </>
  )
}
