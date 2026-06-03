import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import { ShieldCheck, Scale, Zap, ArrowUpRight, Activity, Microscope } from 'lucide-react';

export default async function LandingPage() {
  const auth = await getAuth();

  return (
    <div className="landing-wrapper">
      {/* Abstract Background Element */}
      <div className="abstract-glow"></div>
      
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="flex md-flex-row gap-12 items-center">
          <div style={{ flex: 1.2 }}>
            <div className="flex items-center gap-3 mono" style={{ color: 'var(--accent-cyan)', marginBottom: '2rem', fontSize: '0.8rem' }}>
              <Activity size={16} />
              <span>System Status: Operational</span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'white', marginBottom: '2rem' }}>
              Advanced <br />
              <span style={{ 
                background: 'linear-gradient(to right, #ffffff, #64748b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Inventory</span> <br />
              Logistics.
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)', 
              marginBottom: '4rem', 
              maxWidth: '520px',
              lineHeight: '1.4'
            }}>
              High-precision management for the chemical industry. 
              Built for labs that demand 8-decimal accuracy and seamless compliance.
            </p>
            
            <div className="flex gap-6 items-center">
              {auth ? (
                <Link href={auth.role === 'ADMIN' ? '/admin' : '/seller'} className="btn btn-primary">
                  Dashboard <ArrowUpRight size={18} />
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn btn-primary">
                    Establish Access
                  </Link>
                  <Link href="/register" className="btn btn-outline">
                    Request Credentials
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hero-visual" style={{ flex: 0.8 }}>
            <div className="visual-card">
              <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <Microscope size={32} style={{ color: 'var(--accent-cyan)' }} />
                <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>REF_ID: 882910-A</div>
              </div>
              <div className="data-lines">
                <div className="line" style={{ width: '80%' }}></div>
                <div className="line" style={{ width: '60%' }}></div>
                <div className="line" style={{ width: '90%' }}></div>
              </div>
              <div style={{ marginTop: 'auto', fontSize: '2rem', fontWeight: '800' }}>99.999<span style={{ color: 'var(--text-dim)' }}>%</span></div>
              <div className="mono" style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--accent-cyan)' }}>Purity Verification Active</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ marginTop: '12rem' }}>
          <div className="mono" style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem', fontSize: '0.8rem' }}>Core Modules</div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon"><ShieldCheck size={24} /></div>
              <h3>Role Enforcement</h3>
              <p>Granular access control protocols for administrators and verification officers.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Scale size={24} /></div>
              <h3>Precision Scales</h3>
              <p>Atomic-level unit tracking across grams, kilograms, and milliliters with 8-decimal depth.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Zap size={24} /></div>
              <h3>Instant Sync</h3>
              <p>Real-time inventory reconciliation across all distributed laboratory nodes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
