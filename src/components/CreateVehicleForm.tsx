import { createVehicleAction } from '@/actions/vehicle'
import { ColorEnum, MerkEnum, VehicleTypeEnum } from '@prisma/client'
import { useState } from 'react'
import { useFormState } from 'react-dom'

export default function CreateVehicleForm() {
  const [error, formAction] = useFormState(createVehicleAction, undefined)
  const [image, setImage] = useState(null)

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0])
  }

  return (
    <>
      <form action={formAction} className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4">
          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="name">
              Nama Kendaraan
            </label>
            <input
              id="name"
              type="text"
              name="name"
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
              required
            />
          </fieldset>

          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="merk">
              Merk Kendaraan
            </label>
            <select
              defaultValue={undefined}
              id="merk"
              name="merk"
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
              defaultValue={undefined}
              id="color"
              name="color"
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
              defaultValue={undefined}
              id="type"
              name="type"
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
          Tambah
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {image && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Preview Gambar</h2>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview Gambar"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </>
  )
}
