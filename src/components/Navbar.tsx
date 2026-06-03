import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import { Beaker, LogOut, User as UserIcon } from 'lucide-react';

export default async function Navbar() {
  const auth = await getAuth();

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="logo">
          <Beaker size={24} style={{ color: 'var(--accent)' }} />
          AasaMedChem
        </Link>
        <div className="flex gap-6 items-center">
          {auth ? (
            <>
              <div className="flex gap-4">
                {auth.role === 'ADMIN' && (
                  <Link href="/admin" className="nav-link">Admin Center</Link>
                )}
                {auth.role === 'SELLER' && (
                  <Link href="/seller" className="nav-link">Sales Dashboard</Link>
                )}
              </div>
              <div className="nav-divider"></div>
              <div className="flex items-center gap-2 user-profile">
                <UserIcon size={16} />
                <span className="user-email">{auth.email}</span>
              </div>
              <form action={logout}>
                <button type="submit" className="btn btn-outline btn-sm logout-btn">
                  <LogOut size={14} style={{ marginRight: '6px' }} />
                  Logout
                </button>
              </form>
            </>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href="/login" className="nav-link">Sign In</Link>
              <Link href="/register" className="btn btn-accent btn-sm">Join Now</Link>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .nav-link {
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--accent);
        }
        .nav-divider {
          width: 1px;
          height: 24px;
          background: var(--border);
        }
        .user-profile {
          color: var(--text-main);
          font-weight: 500;
          font-size: 0.875rem;
        }
        .logout-btn {
          border-color: #fee2e2;
          color: var(--danger);
        }
        .logout-btn:hover {
          background: #fef2f2;
          border-color: #fca5a5;
        }
      `}</style>
    </nav>
  );
}
