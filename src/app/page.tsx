import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import { ShieldCheck, Scale, Zap, ArrowRight } from 'lucide-react';

export default async function LandingPage() {
  const auth = await getAuth();

  return (
    <div className="hero-gradient" style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px', flex: 1 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          background: 'rgba(37, 99, 235, 0.08)', 
          color: 'var(--accent)', 
          padding: '0.6rem 1.25rem', 
          borderRadius: '2rem', 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          marginBottom: '2.5rem',
          border: '1px solid rgba(37, 99, 235, 0.1)'
        }}>
          <span className="pulse-dot"></span>
          Trusted by Chemical Supply Chains Worldwide
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          lineHeight: '1.05', 
          marginBottom: '1.5rem', 
          color: 'var(--primary)', 
          maxWidth: '950px', 
          marginInline: 'auto',
          fontWeight: '800'
        }}>
          Next-Gen Inventory <br />
          <span style={{ 
            background: 'linear-gradient(to right, var(--accent), #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Management</span> for MedChem
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-muted)', 
          marginBottom: '3.5rem', 
          maxWidth: '650px', 
          marginInline: 'auto',
          lineHeight: '1.6'
        }}>
          Streamline your medical and chemical supply chain with precision unit tracking, role-based oversight, and automated quotations.
        </p>
        
        <div className="flex gap-4 items-center justify-center">
          {auth ? (
            <Link 
              href={auth.role === 'ADMIN' ? '/admin' : '/seller'} 
              className="btn btn-accent premium-btn"
            >
              Access Dashboard <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="btn btn-primary premium-btn"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="btn btn-outline premium-btn"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Features Grid */}
        <div className="features-grid" style={{ marginTop: '10rem', marginBottom: '4rem' }}>
          <div className="feature-card">
            <div className="icon-wrapper admin-icon">
              <ShieldCheck size={28} />
            </div>
            <h3>Role-Based Access</h3>
            <p>Secure panels designed for granular control. Admins manage stock, while sellers handle precise order fulfillment.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper accent-icon">
              <Scale size={28} />
            </div>
            <h3>Precision Units</h3>
            <p>Handle grams, kilograms, and milliliters with 8-decimal accuracy. Engineered specifically for the chemical industry.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper success-icon">
              <Zap size={28} />
            </div>
            <h3>Smart Conversion</h3>
            <p>Automated unit logic. Order in any unit, and our engine synchronizes inventory across the entire system instantly.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pulse-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
          position: relative;
        }
        .pulse-dot::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(3); opacity: 0; }
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          text-align: left;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 2.5rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          background: white;
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
          border-color: var(--accent-soft);
        }

        .icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .admin-icon { background: #f1f5f9; color: var(--primary); }
        .accent-icon { background: var(--accent-soft); color: var(--accent); }
        .success-icon { background: #d1fae5; color: var(--success); }

        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: var(--primary);
        }

        .feature-card p {
          color: var(--text-muted);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        .premium-btn {
          padding: 1rem 2.5rem;
          font-size: 1rem;
          border-radius: 0.75rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
