'use client'

import cancelOrder from '@/actions/cancel_order'
import { useFormState } from 'react-dom'

type Props = {
  orderId: string
}

export default function CancelOrderForm({ orderId }: Props) {
  const [error, formAction] = useFormState(cancelOrder, undefined)

  return (
    <>
      <form action={formAction} className="flex flex-col items-center gap-8">
        <input
          id="orderId"
          type="text"
          name="orderId"
          value={orderId}
          hidden
          required
        />

        <button
          type="submit"
          className="w-fit rounded-full bg-blue-600 px-4 py-2 text-white"
        >
          Batalkan
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
    </>
  )
}
