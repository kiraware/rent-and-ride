'use client'

import pesan from '@/actions/pesan'
import { useState } from 'react'
import { useFormState } from 'react-dom'

type Props = {
  vehicleId: string
  vehiclePrice: number
  userId: string
}

export default function PesanKendaraanForm({
  vehicleId,
  vehiclePrice,
  userId,
}: Props) {
  const [error, formAction] = useFormState(pesan, undefined)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [price, setPrice] = useState(0)

  const handleStartDateChange = (event: any) => {
    setStartDate(event.target.value)
    calculatePrice(event.target.value, endDate)
  }

  const handleEndDateChange = (event: any) => {
    setEndDate(event.target.value)
    calculatePrice(startDate, event.target.value)
  }

  const calculatePrice = (start: string, end: string) => {
    const diffTime = Math.abs(
      new Date(end).valueOf() - new Date(start).valueOf(),
    )
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const totalPrice = vehiclePrice * (diffDays + 1)
    setPrice(totalPrice)
  }

  return (
    <>
      <form
        action={formAction}
        className="flex flex-col items-center justify-center gap-4"
      >
        <fieldset>
          <input type="text" id="userId" name="userId" value={userId} hidden />
        </fieldset>
        <fieldset>
          <input
            type="text"
            id="vehicleId"
            name="vehicleId"
            value={vehicleId}
            hidden
          />
        </fieldset>
        <fieldset>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            readOnly
            hidden
          />
        </fieldset>
        <fieldset className="flex flex-row items-center gap-2">
          <label htmlFor="startDate">Tanggal awal:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            placeholder="Tanggal Awal Sewa"
            required
            value={startDate}
            onChange={handleStartDateChange}
          />
        </fieldset>
        <fieldset className="flex flex-row items-center gap-2">
          <label htmlFor="endDate">Tanggal akhir:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            placeholder="Tanggal Akhir Sewa"
            required
            value={endDate}
            onChange={handleEndDateChange}
          />
        </fieldset>

        <p>Total: Rp. {price}</p>

        <button
          type="submit"
          className="w-fit rounded-full bg-blue-600 px-4 py-2 text-white"
          disabled={!startDate || !endDate}
        >
          Pesan
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
    </>
  )
}
