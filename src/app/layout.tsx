import Nav from '@/components/Nav'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Rent & Ride',
  description: 'Situs sewa kendaraan Rent & Ride',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={poppins.className}>
        <header className="py-8">
          <Nav />
        </header>

        {children}
      </body>
    </html>
  )
}
