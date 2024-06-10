'use client'

import processOrder from '@/actions/process_order'
import { OrderStatus } from '@prisma/client'
import { useFormState } from 'react-dom'

type Props = {
  orderId: string
}

export default function PayOrderForm({ orderId }: Props) {
  const [error, formAction] = useFormState(processOrder, undefined)

  return (
    <>
      <form action={formAction} className="flex flex-col items-center gap-8">
        <input
          id="orderId"
          type="text"
          name="orderId"
          value={orderId}
          readOnly
          hidden
          required
        />
        <input
          id="action"
          type="text"
          name="action"
          value="bayar"
          readOnly
          hidden
          required
        />

        <button
          type="submit"
          className="w-fit rounded-full bg-blue-600 px-4 py-2 text-white"
        >
          Sudah Bayar
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
    </>
  )
}
