import LoginForm from '@/components/LoginForm'
import Link from 'next/link'

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="w-fit pb-16 text-4xl font-bold after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Masuk
      </h1>

      <LoginForm />

      <p>
        Tidak punya akun?{' '}
        <Link href="/signup" className="text-blue-600">
          Daftar
        </Link>
      </p>
    </main>
  )
}
