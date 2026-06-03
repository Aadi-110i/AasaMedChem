import { register } from '@/app/actions/auth';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="container flex items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Register</h1>
        <form action={async (d) => { await register(d); }} className="flex flex-col gap-4">
          <div>
            <label className="label">Email</label>
            <input type="email" name="email" className="input" required placeholder="user@example.com" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" name="password" className="input" required placeholder="••••••••" />
          </div>
          <div>
            <label className="label">Role</label>
            <select name="role" className="input">
              <option value="SELLER">Seller</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Register
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
