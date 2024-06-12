import SignupForm from '@/components/SignupForm';
import Link from 'next/link';

export default function Signup() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold pb-8 w-fit after:mx-auto after:flex after:h-1 after:w-4/6 after:rounded-full after:bg-blue-600">
        Daftar
      </h1>

      <div className="w-full max-w-md">
        <SignupForm />
      </div>

      <p>
        Sudah punya akun?{' '}
        <Link href="/login">
          <a className="text-blue-600">Masuk</a>
        </Link>
      </p>
    </main>
  );
}
