import * as jose from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Check for cookie
  const cookie = cookies().get('Authorization')
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Validate it
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const jwt = cookie.value

  try {
    await jose.jwtVerify(jwt, secret)
  } catch (JWSSignatureVerificationFailed) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/statistik',
    '/pesanan',
    '/pengguna',
    '/pesan',
    '/status',
    '/riwayat',
  ],
}