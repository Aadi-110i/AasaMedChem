import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import { Microscope, LogOut, Terminal, Fingerprint } from 'lucide-react';

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
      <style jsx>{`
        .nav-link {
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: var(--accent-cyan);
          text-shadow: 0 0 10px var(--accent-dim);
        }
        .logout-trigger {
          background: transparent;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          transition: color 0.2s;
        }
        .logout-trigger:hover {
          color: var(--danger);
        }
        .btn-access {
          padding: 0.5rem 1rem;
          background: var(--accent-dim);
          border: 1px solid var(--border-accent);
          color: var(--accent-cyan);
          border-radius: 0.25rem;
          transition: all 0.2s;
        }
        .btn-access:hover {
          background: var(--accent-cyan);
          color: var(--bg-deep);
        }
      `}</style>
    </nav>
  );
}
