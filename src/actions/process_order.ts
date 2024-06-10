'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function processOrderAction(
  currentState: any,
  formData: FormData,
): Promise<string> {
  // Get the data off the form
  const orderId = formData.get('orderId')
  const action = formData.get('action')

  // Send to our api route
  const res = await fetch(process.env.ROOT_URL + '/api/process-order', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId, action }),
  })

  const data = await res.json()

  // Redirect to home if success
  if (res.ok) {
    revalidatePath('/pesan')
    revalidatePath('/pesanan')
    redirect('/status')
  } else {
    return data.error
  }
}
