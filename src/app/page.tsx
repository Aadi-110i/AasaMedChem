import Link from 'next/link';
import { getAuth } from '@/lib/auth';

export default async function LandingPage() {
  const auth = await getAuth();

  return (
    <div className="hero-gradient" style={{ minHeight: 'calc(100vh - 73px)' }}>
      <div className="container" style={{ textAlign: 'center', padding: '120px 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'var(--accent-soft)', color: 'var(--accent)', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: '600', marginBottom: '2rem' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></span>
          Trusted by Chemical Supply Chains Worldwide
        </div>
        
        <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--primary)', maxWidth: '900px', marginInline: 'auto' }}>
          Next-Gen Inventory <span style={{ color: 'var(--accent)' }}>Management</span> for MedChem
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3.5rem', maxWidth: '650px', marginInline: 'auto' }}>
          Streamline your medical and chemical supply chain with precision unit tracking, role-based oversight, and automated quotations.
        </p>
        
        <div className="flex gap-4 items-center justify-center">
          {auth ? (
            <Link 
              href={auth.role === 'ADMIN' ? '/admin' : '/seller'} 
              className="btn btn-accent" 
              style={{ padding: '1rem 2.5rem', fontSize: '1rem', borderRadius: '0.5rem' }}
            >
              Access Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="btn btn-primary" 
                style={{ padding: '1rem 2.5rem', fontSize: '1rem', borderRadius: '0.5rem' }}
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="btn btn-outline" 
                style={{ padding: '1rem 2.5rem', fontSize: '1rem', borderRadius: '0.5rem' }}
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        <div className="md-flex-row gap-8" style={{ marginTop: '8rem', textAlign: 'left' }}>
          <div className="card" style={{ flex: 1, border: 'none', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '1.5rem', color: 'white', fontSize: '1.25rem' }}>🔐</div>
            <h3 style={{ marginBottom: '0.75rem' }}>Role-Based Access</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Secure panels designed for granular control. Admins manage stock, while sellers handle precise order fulfillment.</p>
          </div>
          <div className="card" style={{ flex: 1, border: 'none', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--accent)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '1.5rem', color: 'white', fontSize: '1.25rem' }}>⚖️</div>
            <h3 style={{ marginBottom: '0.75rem' }}>Precision Units</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Handle grams, kilograms, and milliliters with 8-decimal accuracy. Engineered for the chemical industry.</p>
          </div>
          <div className="card" style={{ flex: 1, border: 'none', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--success)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '1.5rem', color: 'white', fontSize: '1.25rem' }}>⚡</div>
            <h3 style={{ marginBottom: '0.75rem' }}>Smart Conversion</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Automated unit logic. Order in any unit, and our engine synchronizes inventory across the entire system instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
