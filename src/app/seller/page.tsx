import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import OrderForm from '@/components/OrderForm';
import { formatINR } from '@/lib/units';
import { Terminal, Activity, History } from 'lucide-react';

export default async function SellerDashboard() {
  const auth = await getAuth();
  
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
  });

  const myOrders = await prisma.order.findMany({
    where: { userId: auth?.userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container py-16">
      <header style={{ marginBottom: '5rem' }}>
        <div className="flex items-center gap-3 mono" style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', fontSize: '0.8rem' }}>
          <Terminal size={16} />
          <span>Session_Active: Sales_Officer</span>
        </div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Operator Node</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Execute high-precision chemical quotations. Interface with live inventory 
          protocols and monitor your transaction pipeline.
        </p>
      </header>

      <div className="flex flex-col lg-flex-row gap-16">
        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-4" style={{ marginBottom: '2.5rem' }}>
            <Activity size={24} style={{ color: 'var(--accent-cyan)' }} />
            <h2 style={{ fontSize: '1.75rem' }}>Quotation_Forge</h2>
          </div>
          <OrderForm products={products} />
        </div>

        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-4" style={{ marginBottom: '2.5rem' }}>
            <History size={24} style={{ color: 'var(--accent-cyan)' }} />
            <h2 style={{ fontSize: '1.75rem' }}>Personal_Ledger</h2>
          </div>
          <div className="card" style={{ padding: '0', background: 'transparent', border: 'none' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref_Hash</th>
                    <th>Spec_ID</th>
                    <th>Net_Valuation</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.map(o => (
                    <tr key={o.id}>
                      <td className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>#{o.id.slice(-8).toUpperCase()}</td>
                      <td>
                        <div style={{ fontWeight: '700', color: 'white' }}>{o.items[0]?.product.name}</div>
                        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)' }}>
                          {o.items[0]?.displayQuantity.toString()} {o.items[0]?.displayUnit.toUpperCase()}
                        </div>
                      </td>
                      <td className="mono" style={{ fontWeight: '700' }}>{formatINR(o.totalAmount.toString())}</td>
                      <td>
                        <span className={`badge badge-${o.status.toLowerCase()}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {myOrders.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '5rem' }}>
                        <div className="mono" style={{ color: 'var(--text-dim)' }}>ZERO_ACTIVITY_HISTORY</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
