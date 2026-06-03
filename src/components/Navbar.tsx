import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import { logout } from '@/app/actions/auth';

export default async function Navbar() {
  const auth = await getAuth();

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="logo">
          AasaMedChem
        </Link>
        <div className="flex gap-4 items-center">
          {auth ? (
            <>
              {auth.role === 'ADMIN' && <Link href="/admin">Admin Panel</Link>}
              {auth.role === 'SELLER' && <Link href="/seller">Dashboard</Link>}
              <span className="user-email">{auth.email}</span>
              <form action={logout}>
                <button type="submit" className="btn btn-outline btn-sm">Logout</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
