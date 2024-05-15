'use server'

import { redirect } from 'next/navigation'

export default async function signup(
  currentState: any,
  formData: FormData,
): Promise<string> {
  // Get the data off the form
  const email = formData.get('email')
  const password = formData.get('password')
  const name = formData.get('name')

  //  Send to our api route
  const res = await fetch(process.env.ROOT_URL + '/api/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })

  const data = await res.json()

  // Redirect to login if success
  if (res.ok) {
    redirect('/login')
  } else {
    return data.error
  }
}
