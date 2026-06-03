import { prisma } from '@/lib/prisma';
import { createProduct, deleteProduct } from '@/app/actions/products';
import { formatINR } from '@/lib/units';

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container py-12">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Control Center</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your global inventory and monitor real-time quotations.</p>
      </header>

      <div className="flex flex-col gap-12">
        {/* Product Management Section */}
        <section>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Inventory Management</h2>
          </div>
          
          <div className="card" style={{ marginBottom: '2.5rem', background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Create New Product Entry</h3>
            <form action={async (d) => { await createProduct(d); }} className="flex flex-col gap-6">
              <div className="flex md-flex-row gap-6">
                <div style={{ flex: 3 }}>
                  <label className="label">Product Name</label>
                  <input type="text" name="name" className="input" required placeholder="e.g., Sodium Chloride (Laboratory Grade)" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label">Base Dimension</label>
                  <select name="baseUnit" className="input">
                    <option value="GRAM">Mass (Gram)</option>
                    <option value="MILLILITER">Volume (Milliliter)</option>
                    <option value="COUNT">Discrete (Item)</option>
                  </select>
                </div>
              </div>
              <div className="flex md-flex-row gap-6">
                <div style={{ flex: 1 }}>
                  <label className="label">Base Rate (INR / Unit)</label>
                  <input type="number" name="basePrice" step="0.00000001" className="input" required placeholder="0.00" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label">Stock Level (Base Units)</label>
                  <input type="number" name="stock" step="0.00000001" className="input" required placeholder="1000" />
                </div>
              </div>
              <div>
                <label className="label">Technical Description</label>
                <textarea name="description" className="input" rows={3} placeholder="Purity levels, storage requirements, etc."></textarea>
              </div>
              <button type="submit" className="btn btn-accent" style={{ alignSelf: 'flex-start', padding: '0.75rem 2.5rem' }}>
                Register Product
              </button>
            </form>
          </div>

          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '1rem' }}>Active Inventory</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ marginTop: '0' }}>
                <thead>
                  <tr>
                    <th>Product Details</th>
                    <th>Base Unit</th>
                    <th>Rate/Base</th>
                    <th>Stock Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--primary)' }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {p.id.slice(-6).toUpperCase()}</div>
                      </td>
                      <td><span style={{ fontSize: '0.875rem' }}>{p.baseUnit}</span></td>
                      <td><span style={{ fontWeight: '500' }}>{formatINR(p.basePrice.toString())}</span></td>
                      <td>
                        <div style={{ fontWeight: '600' }}>{p.stock.toString()}</div>
                        <div style={{ width: '60px', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginTop: '4px' }}>
                          <div style={{ width: '70%', height: '100%', background: 'var(--success)', borderRadius: '2px' }}></div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <form action={async () => { await deleteProduct(p.id); }}>
                          <button type="submit" className="btn btn-outline btn-sm" style={{ color: 'var(--danger)', borderColor: '#fee2e2' }}>
                            Decommission
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

        {/* Order Management Section */}
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Activity</h2>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ marginTop: '0' }}>
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Requester</th>
                    <th>Specifications</th>
                    <th>Valuation</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: '600' }}>#{o.id.slice(-8).toUpperCase()}</td>
                      <td>
                        <div style={{ fontSize: '0.875rem' }}>{o.user.email}</div>
                      </td>
                      <td>
                        {o.items.map(item => (
                          <div key={item.id} style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: '500' }}>{item.product.name}</span>: {item.displayQuantity.toString()} {item.displayUnit}
                          </div>
                        ))}
                      </td>
                      <td><span style={{ fontWeight: '700', color: 'var(--accent)' }}>{formatINR(o.totalAmount.toString())}</span></td>
                      <td>
                        <span className={`badge badge-${o.status.toLowerCase()}`}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📋</div>
                        No active quotations or orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
