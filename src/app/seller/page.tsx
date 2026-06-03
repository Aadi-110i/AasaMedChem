import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import OrderForm from '@/components/OrderForm';
import { formatINR } from '@/lib/units';
import { ShoppingCart, ClipboardList, Clock } from 'lucide-react';

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
    <div className="container py-12">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Sales Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Create precise quotations and track your fulfillment pipeline.</p>
      </header>

      <div className="md-flex-row gap-12">
        <div style={{ flex: 1.2 }}>
          <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
            <ShoppingCart size={24} style={{ color: 'var(--accent)' }} />
            <h2 style={{ fontSize: '1.5rem' }}>New Quotation</h2>
          </div>
          <OrderForm products={products} />
        </div>

        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
            <ClipboardList size={24} style={{ color: 'var(--accent)' }} />
            <h2 style={{ fontSize: '1.5rem' }}>Your History</h2>
          </div>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ marginTop: '0' }}>
                <thead style={{ background: '#f8fafc' }}>
                  <tr>
                    <th>Ref</th>
                    <th>Specifications</th>
                    <th>Valuation</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: '600', fontSize: '0.875rem' }}>#{o.id.slice(-6).toUpperCase()}</td>
                      <td>
                        <div style={{ fontWeight: '500' }}>{o.items[0]?.product.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {o.items[0]?.displayQuantity.toString()} {o.items[0]?.displayUnit}
                        </div>
                      </td>
                      <td><span style={{ fontWeight: '600' }}>{formatINR(o.totalAmount.toString())}</span></td>
                      <td>
                        <span className={`badge badge-${o.status.toLowerCase()}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {myOrders.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}><Clock size={32} style={{ opacity: 0.3, margin: '0 auto' }} /></div>
                        No order history yet.
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
