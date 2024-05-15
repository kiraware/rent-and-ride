'use client'

import login from '@/actions/login'
import { useFormState } from 'react-dom'
import { MdKey, MdOutlineEmail } from 'react-icons/md'

export default function LoginForm() {
  const [error, formAction] = useFormState(login, undefined)

  return (
    <>
      <form action={formAction} className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4">
          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="email">
              <MdOutlineEmail />
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className="border-b-2 focus:border-b-blue-600 focus:outline-none"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="password">
              <MdKey />
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Kata Sandi"
              className="border-b-2 focus:border-b-blue-600 focus:outline-none"
              required
            />
          </fieldset>
        </div>

        <button
          type="submit"
          className="w-fit rounded-full bg-blue-600 px-4 py-2 text-white"
        >
          Masuk
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
    </>
  )
}
