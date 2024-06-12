import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold pb-8 w-fit after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Masuk
      </h1>

      <div className="w-full max-w-md">
        <LoginForm />
      </div>

      <p>
        Tidak punya akun?{' '}
        <Link href="/signup">
          <a className="text-blue-600">Daftar</a>
        </Link>
      </p>
    </main>
  );
}
