import { login } from '@/app/actions/auth';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h1>
        <form action={async (d) => { await login(d); }} className="flex flex-col gap-4">
          <div>
            <label className="label">Email</label>
            <input type="email" name="email" className="input" required placeholder="admin@example.com" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" name="password" className="input" required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Don&apos;t have an account? <Link href="/register" style={{ color: 'var(--primary)' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
