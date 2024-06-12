import type { User } from '@prisma/client'

type Props = {
  user: User
}

export default async function UserFigure({ user }: Props) {
  const { id, email } = user

  return (
    <section className="flex flex-row gap-4">
      <section className="flex flex-row gap-2 justify-center">
        <p className="text-center">{id}</p>
        <p className="text-center">{email}</p>
      </section>
    </section>
  )
}
