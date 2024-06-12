import UserFigure from '@/components/UserFigure'
import { getUsers } from '@/lib/users'

export default async function Pengguna() {
  const users = await getUsers()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="w-fit pb-16 text-4xl font-bold after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Pengguna Sewa Kendaraan
      </h1>

      <section className="flex flex-row flex-wrap justify-evenly">
        {users.map((user) => (
          <UserFigure key={user.id} user={user} />
        ))}
      </section>
    </main>
  )
}
