'use client'

import { editVehicleAction } from '@/actions/vehicle'
import type { Vehicle } from '@prisma/client'
import { ColorEnum, MerkEnum, VehicleTypeEnum } from '@prisma/client'
import { useState } from 'react'
import { useFormState } from 'react-dom'

type Props = {
  vehicle: Vehicle
}

export default function EditVehicleForm({ vehicle }: Props) {
  const [error, formAction] = useFormState(editVehicleAction, undefined)
  const [image, setImage] = useState(null)

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0])
  }

  return (
    <>
      <form action={formAction} className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4">
          <fieldset className="flex flex-row gap-2">
            <input
              id="id"
              type="text"
              name="id"
              value={vehicle.id}
              readOnly
              hidden
              required
            />
          </fieldset>

          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="name">
              Nama Kendaraan
            </label>
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={vehicle.name}
              placeholder="Nama Kendaraan"
              className="border-b-2 focus:border-b-blue-600 focus:outline-none"
              required
            />
          </fieldset>

          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="border-b-2 focus:border-b-blue-600 focus:outline-none"
            />
          </fieldset>

          <fieldset className="flex flex-row gap-2">
            <input
              id="old_image"
              name="old_image"
              type="text"
              value={vehicle.image}
              readOnly
              hidden
            />
          </fieldset>

          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="merk">
              Merk Kendaraan
            </label>
            <select
              id="merk"
              name="merk"
              defaultValue={vehicle.merk}
              className="border-b-2 focus:border-b-blue-600 focus:outline-none"
              required
            >
              <option disabled>Pilih Merk Kendaraan</option>
              {Object.values(MerkEnum).map((merk) => (
                <option key={merk} value={merk}>
                  {merk}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="color">
              Warna Kendaraan
            </label>
            <select
              id="color"
              name="color"
              defaultValue={vehicle.color}
              className="border-b-2 focus:border-b-blue-600 focus:outline-none"
              required
            >
              <option disabled>Pilih Warna Kendaraan</option>
              {Object.values(ColorEnum).map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="type">
              Jenis Kendaraan
            </label>
            <select
              id="type"
              name="type"
              defaultValue={vehicle.type}
              className="border-b-2 focus:border-b-blue-600 focus:outline-none"
              required
            >
              <option disabled>Pilih Jenis Kendaraan</option>
              {Object.values(VehicleTypeEnum).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="price">
              Harga Sewa
            </label>
            <input
              id="price"
              type="number"
              name="price"
              defaultValue={vehicle.price}
              placeholder="Harga Sewa"
              className="border-b-2 focus:border-b-blue-600 focus:outline-none"
              required
            />
          </fieldset>
        </div>

        <button
          type="submit"
          className="w-fit rounded-full bg-blue-600 px-4 py-2 text-white"
        >
          Simpan
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
    </>
  )
}
