import { login } from '@/app/actions/auth';
import Link from 'next/link';
import { Fingerprint, Key, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center" style={{ minHeight: '90vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', background: 'rgba(255,255,255,0.01)' }}>
        <div className="flex flex-col items-center text-center" style={{ marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'var(--accent-dim)', borderRadius: '1rem', marginBottom: '1.5rem', color: 'var(--accent-cyan)' }}>
            <Fingerprint size={32} />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Access Terminal</h1>
          <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Awaiting_Credentials
          </p>
        </div>

        <form action={async (d) => { await login(d); }} className="flex flex-col gap-6">
          <div>
            <label className="label">Identity_Identifier</label>
            <div style={{ position: 'relative' }}>
              <input type="email" name="email" className="input" required placeholder="OFFICER_EMAIL" style={{ width: '100%' }} />
            </div>
          </div>
          <div>
            <label className="label">Access_Key</label>
            <div style={{ position: 'relative' }}>
              <input type="password" name="password" className="input" required placeholder="••••••••" style={{ width: '100%' }} />
              <Key size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
            Initialize_Session <ChevronRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            NEW_OFFICER? <Link href="/register" style={{ color: 'var(--accent-cyan)', marginLeft: '0.5rem' }}>REQUEST_ACCESS</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
