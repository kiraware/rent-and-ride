'use client'

import signup from '@/actions/signup'
import { useFormState } from 'react-dom'
import { MdKey, MdOutlineAccountCircle, MdOutlineEmail } from 'react-icons/md'

export default function SignupForm() {
  const [error, formAction] = useFormState(signup, undefined)

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
          <fieldset className="flex flex-row gap-2">
            <label className="flex items-center text-xl" htmlFor="name">
              <MdOutlineAccountCircle />
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Nama"
              className="border-b-2 focus:border-b-blue-600 focus:outline-none"
              required
            />
          </fieldset>
        </div>

        <button
          type="submit"
          className="w-fit rounded-full bg-blue-600 px-4 py-2 text-white"
        >
          Daftar
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
    </>
  )
}
