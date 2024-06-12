'use server'

import { redirect } from 'next/navigation'

export default async function pesanAction(
  currentState: any,
  formData: FormData,
): Promise<string> {
  // Get the data off the form
  const userId = formData.get('userId')
  const vehicleId = formData.get('vehicleId')
  const price = formData.get('price')
  const startDate = formData.get('startDate')
  const endDate = formData.get('endDate')

  // Send to our api route
  const res = await fetch(process.env.ROOT_URL + '/api/pesan', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, vehicleId, price, startDate, endDate }),
  })

  const data = await res.json()

  // Redirect to pesan if success
  if (res.ok) {
    redirect('/pesan')
  } else {
    return data.error
  }
}
