import UserFigure from '@/components/UserFigure'
import { getUsers } from '@/lib/users'

export default async function Pengguna() {
  const users = await getUsers()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="pb-16 text-4xl font-bold text-center bg-blue-600 text-white rounded-full w-4/6">
        Pengguna Sewa Kendaraan
      </h1>

      <section className="flex flex-wrap justify-center gap-4">
        {users.map((user) => (
          <UserFigure key={user.id} user={user} />
        ))}
      </section>
    </main>
  )
}
