import * as jose from 'jose'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Nav() {
  const jwt = cookies().get('Authorization')
  let isAdmin = false

  if (jwt !== undefined) {
    const claims = jose.decodeJwt(jwt.value)
    isAdmin = !!claims.isAdmin
  }

  return (
    <nav>
      <ul className="flex flex-row justify-evenly text-2xl font-bold">
        {isAdmin ? (
          <>
            <li>
              <Link href="/">Beranda</Link>
            </li>
            <li>
              <Link href="/statistik">Statistik</Link>
            </li>
            <li>
              <Link href="/pesanan">Pesanan</Link>
            </li>
            <li>
              <Link href="/pengguna">Pengguna</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/">Beranda</Link>
            </li>
            <li>
              <Link href="/pesan">Pesan</Link>
            </li>
            <li>
              <Link href="/status">Status</Link>
            </li>
            <li>
              <Link href="/riwayat">Riwayat</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
