import { prisma } from '@/lib/prisma';
import { createProduct, deleteProduct } from '@/app/actions/products';
import { formatINR } from '@/lib/units';
import { Database, Box, History, Trash2, PlusCircle } from 'lucide-react';

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container py-16">
      <header style={{ marginBottom: '5rem' }}>
        <div className="mono" style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', fontSize: '0.8rem' }}>Root_Privileges: Active</div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Central Control</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Global inventory oversight and real-time transaction monitoring. 
          Modify lab-wide product parameters and verify order integrity.
        </p>
      </header>

      <div className="flex flex-col gap-16">
        {/* Product Management Section */}
        <section>
          <div className="flex items-center gap-4" style={{ marginBottom: '2.5rem' }}>
            <Database size={24} style={{ color: 'var(--accent-cyan)' }} />
            <h2 style={{ fontSize: '1.75rem' }}>Inventory_Registry</h2>
          </div>
          
          <div className="card" style={{ marginBottom: '4rem', background: 'rgba(255,255,255,0.01)' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '2.5rem' }}>
              <PlusCircle size={20} style={{ color: 'var(--accent-cyan)' }} />
              <h3 className="mono" style={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>Initialize_New_Product</h3>
            </div>
            
            <form action={async (d) => { await createProduct(d); }} className="flex flex-col gap-8">
              <div className="flex md-flex-row gap-8">
                <div style={{ flex: 3 }}>
                  <label className="label">Entry_Name</label>
                  <input type="text" name="name" className="input" required placeholder="NACL_99_PERCENT" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label">Metric_Base</label>
                  <select name="baseUnit" className="input">
                    <option value="GRAM">Mass (g)</option>
                    <option value="MILLILITER">Volume (ml)</option>
                    <option value="COUNT">Unit (count)</option>
                  </select>
                </div>
              </div>
              <div className="flex md-flex-row gap-8">
                <div style={{ flex: 1 }}>
                  <label className="label">Valuation_Rate (INR)</label>
                  <input type="number" name="basePrice" step="0.00000001" className="input" required placeholder="0.00000000" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label">Initial_Load (Metric)</label>
                  <input type="number" name="stock" step="0.00000001" className="input" required placeholder="0.00000000" />
                </div>
              </div>
              <div>
                <label className="label">Technical_Notes</label>
                <textarea name="description" className="input" rows={3} placeholder="Standard storage requirements..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Commit Entry
              </button>
            </form>
          </div>

          <div className="card" style={{ padding: '0', background: 'transparent', border: 'none' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '2rem' }}>
              <Box size={20} style={{ color: 'var(--accent-cyan)' }} />
              <h3 className="mono" style={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>Live_Stock_Status</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Designation</th>
                    <th>Class</th>
                    <th>Valuation</th>
                    <th>Metric_Status</th>
                    <th style={{ textAlign: 'right' }}>Ops</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: '700', color: 'white' }}>{p.name}</td>
                      <td className="mono" style={{ fontSize: '0.7rem' }}>{p.baseUnit}</td>
                      <td className="mono" style={{ color: 'var(--accent-cyan)' }}>{formatINR(p.basePrice.toString())}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <span className="mono" style={{ fontWeight: '700' }}>{p.stock.toString()}</span>
                          <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.05)', position: 'relative', minWidth: '80px' }}>
                            <div style={{ position: 'absolute', height: '100%', background: 'var(--accent-cyan)', width: '60%' }}></div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <form action={async () => { await deleteProduct(p.id); }}>
                          <button type="submit" className="op-btn delete">
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Transaction History */}
        <section>
          <div className="flex items-center gap-4" style={{ marginBottom: '2.5rem' }}>
            <History size={24} style={{ color: 'var(--accent-cyan)' }} />
            <h2 style={{ fontSize: '1.75rem' }}>Order_Logs</h2>
          </div>
          <div className="card" style={{ padding: '0', background: 'transparent', border: 'none' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Hash</th>
                    <th>Origin_Node</th>
                    <th>Specifications</th>
                    <th>Net_Valuation</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{o.id.toUpperCase()}</td>
                      <td className="mono" style={{ fontSize: '0.7rem' }}>{o.user.email}</td>
                      <td style={{ fontSize: '0.875rem' }}>
                        {o.items.map(item => (
                          <div key={item.id}>
                            {item.product.name} ({item.displayQuantity.toString()} {item.displayUnit})
                          </div>
                        ))}
                      </td>
                      <td className="mono" style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>{formatINR(o.totalAmount.toString())}</td>
                      <td>
                        <span className={`badge badge-${o.status.toLowerCase()}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '5rem' }}>
                        <div className="mono" style={{ color: 'var(--text-dim)' }}>ZERO_TRANSACTIONS_RECORDED</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      
      <style jsx>{`
        .op-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.05);
          color: var(--text-dim);
          padding: 0.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .op-btn.delete:hover {
          color: var(--danger);
          border-color: var(--danger);
          background: rgba(239, 68, 68, 0.05);
        }
      `}</style>
    </div>
  );
}
