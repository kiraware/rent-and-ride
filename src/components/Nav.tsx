import * as jose from 'jose'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Nav() {
  const jwt = cookies().get('Authorization')

  if (!jwt) return

  const claims = jose.decodeJwt(jwt.value)
  const isAdmin = !!claims.isAdmin

  return (
    <nav className="px-32">
      <ul className="flex flex-row justify-evenly text-2xl font-semibold">
        <li>
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
        </li>
        {isAdmin ? (
          <>
            <li>
              <Link href="/statistik" className="hover:text-blue-600">
                Statistik
              </Link>
            </li>
            <li>
              <Link href="/pesanan" className="hover:text-blue-600">
                Pesanan
              </Link>
            </li>
            <li>
              <Link href="/pengguna" className="hover:text-blue-600">
                Pengguna
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/pesan" className="hover:text-blue-600">
                Pesan
              </Link>
            </li>
            <li>
              <Link href="/status" className="hover:text-blue-600">
                Status
              </Link>
            </li>
            <li>
              <Link href="/riwayat" className="hover:text-blue-600">
                Riwayat
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
