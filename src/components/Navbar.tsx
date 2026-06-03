import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import { Microscope, LogOut, Fingerprint } from 'lucide-react';

export default async function Navbar() {
  const auth = await getAuth();

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center py-5">
        <Link href="/" className="logo flex items-center gap-3">
          <Microscope size={28} style={{ color: 'var(--accent-cyan)' }} />
          <span style={{ letterSpacing: '-0.05em' }}>AasaMedChem</span>
        </Link>
        
        <div className="flex gap-8 items-center">
          {auth ? (
            <>
              <div className="flex gap-6 mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                {auth.role === 'ADMIN' && (
                  <Link href="/admin" className="nav-link">Control_Center</Link>
                )}
                {auth.role === 'SELLER' && (
                  <Link href="/seller" className="nav-link">Sales_Node</Link>
                )}
              </div>
              
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>
              
              <div className="flex items-center gap-3 mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                <Fingerprint size={14} style={{ color: 'var(--accent-cyan)' }} />
                <span>{auth.email}</span>
              </div>
              
              <form action={logout}>
                <button type="submit" className="logout-trigger">
                  <LogOut size={16} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex gap-6 items-center mono" style={{ fontSize: '0.75rem' }}>
              <Link href="/login" className="nav-link">Access_Node</Link>
              <Link href="/register" className="btn-access">
                Register_ID
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
