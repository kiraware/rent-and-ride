import UserFigure from '@/components/UserFigure'
import { getUsers } from '@/lib/users'

export default async function Pengguna() {
  const users = await getUsers()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="w-fit pb-16 text-4xl font-bold after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Pengguna Sewa Kendaraan
      </h1>

      <section className="w-full px-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
