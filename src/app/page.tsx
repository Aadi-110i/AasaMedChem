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

      <style jsx>{`
        .landing-wrapper {
          position: relative;
          min-height: 100vh;
        }
        
        .abstract-glow {
          position: absolute;
          top: -10%;
          right: -5%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-visual {
          perspective: 1000px;
        }

        .visual-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2rem;
          padding: 3rem;
          height: 480px;
          display: flex;
          flex-direction: column;
          transform: rotateY(-15deg) rotateX(10deg);
          box-shadow: 20px 40px 80px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
        }

        .visual-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, transparent, rgba(0,245,255,0.02));
          pointer-events: none;
        }

        .data-lines {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }

        .line {
          height: 2px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }

        .line::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: var(--accent-cyan);
          animation: scan 3s infinite linear;
        }

        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4rem;
        }

        .feature-item {
          border-left: 1px solid rgba(255,255,255,0.05);
          padding-left: 2rem;
        }

        .feature-icon {
          color: var(--accent-cyan);
          margin-bottom: 2rem;
        }

        .feature-item h3 {
          font-size: 1.5rem;
          color: white;
          margin-bottom: 1rem;
        }

        .feature-item p {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .md-flex-row { flex-direction: column; text-align: center; }
          .hero-visual { display: none; }
          .features-grid { grid-template-columns: 1fr; gap: 3rem; }
          .feature-item { border-left: none; padding-left: 0; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem; }
          h1 br { display: none; }
          p { margin-inline: auto; }
          .justify-center-mobile { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
