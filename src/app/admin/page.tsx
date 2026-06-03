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
    <div className="container py-8">
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

      <div className="flex flex-col gap-8">
        {/* Product Management Section */}
        <section>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>Product Management</h2>
          </div>
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Add New Product</h3>
            <form action={async (d) => { await createProduct(d); }} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div style={{ flex: 2 }}>
                  <label className="label">Product Name</label>
                  <input type="text" name="name" className="input" required />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label">Base Unit</label>
                  <select name="baseUnit" className="input">
                    <option value="GRAM">Gram (g)</option>
                    <option value="MILLILITER">Milliliter (mL)</option>
                    <option value="COUNT">Count (item)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <div style={{ flex: 1 }}>
                  <label className="label">Price per Base Unit (INR)</label>
                  <input type="number" name="basePrice" step="0.00000001" className="input" required />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label">Initial Stock (Base Units)</label>
                  <input type="number" name="stock" step="0.00000001" className="input" required />
                </div>
              </div>
              <div>
                <label className="label">Description</label>
                <textarea name="description" className="input" rows={3}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Add Product
              </button>
            </form>
          </div>

          <div className="card" style={{ marginTop: '2rem' }}>
            <h3>Inventory</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Base Unit</th>
                  <th>Price/Base</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.baseUnit}</td>
                    <td>{formatINR(p.basePrice.toString())}</td>
                    <td>{p.stock.toString()}</td>
                    <td>
                      <form action={async () => { await deleteProduct(p.id); }}>
                        <button type="submit" className="btn btn-outline btn-sm" style={{ color: 'var(--danger)' }}>
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Order Management Section */}
        <section>
          <h2 style={{ marginBottom: '0.5rem' }}>Recent Quotations & Orders</h2>
          <div className="card" style={{ marginTop: '1rem' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id.slice(-8)}</td>
                    <td>{o.user.email}</td>
                    <td>
                      {o.items.map(item => (
                        <div key={item.id} style={{ fontSize: '0.8125rem' }}>
                          {item.product.name}: {item.displayQuantity.toString()} {item.displayUnit}
                        </div>
                      ))}
                    </td>
                    <td>{formatINR(o.totalAmount.toString())}</td>
                    <td>
                      <span className={`badge badge-${o.status.toLowerCase()}`}>
                        {o.status}
                      </span>
                    </td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
