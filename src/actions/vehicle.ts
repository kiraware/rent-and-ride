'use server'

import { redirect } from 'next/navigation'

export async function createVehicleAction(
  currentState: any,
  formData: FormData,
): Promise<string> {
  // Get the data off the form
  const name = formData.get('name')
  // const image = formData.get('image')
  const merk = formData.get('merk')
  const color = formData.get('color')
  const type = formData.get('type')
  const price = formData.get('price')

  // Send to our api route
  const res = await fetch(process.env.ROOT_URL + `/api/kendaraan`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, merk, color, type, price }),
  })

  const data = await res.json()

  // Redirect to home if success
  if (res.ok) {
    redirect('/')
  } else {
    return data.error
  }
}
