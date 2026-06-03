import Link from 'next/link';
import { getAuth } from '@/lib/auth';

export default async function LandingPage() {
  const auth = await getAuth();

  return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
        AasaMedChem
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', marginInline: 'auto' }}>
        Precision Inventory and Order Management for the Chemical and Medical Industry.
      </p>
      
      <div className="flex gap-4 items-center justify-center">
        {auth ? (
          <Link 
            href={auth.role === 'ADMIN' ? '/admin' : '/seller'} 
            className="btn btn-primary" 
            style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link 
              href="/login" 
              className="btn btn-primary" 
              style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="btn btn-outline" 
              style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      <div className="md-flex-row gap-8" style={{ marginTop: '5rem', textAlign: 'left' }}>
        <div className="card" style={{ flex: 1 }}>
          <h3>Role-Based Access</h3>
          <p>Dedicated panels for Admins and Sellers to manage inventory and quotations efficiently.</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h3>Precision Units</h3>
          <p>Support for grams, kilograms, liters, and milliliters with high-decimal accuracy.</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h3>Smart Conversion</h3>
          <p>Place orders in any unit; the system handles the math and tracks inventory in base units.</p>
        </div>
      </div>
    </div>
  );
}
