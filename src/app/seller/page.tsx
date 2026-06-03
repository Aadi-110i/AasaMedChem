import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import OrderForm from '@/components/OrderForm';
import { formatINR } from '@/lib/units';

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
    <div className="container py-8">
      <h1 style={{ marginBottom: '2rem' }}>Seller Dashboard</h1>

      <div className="flex flex-col md-flex-row gap-8">
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: '1rem' }}>Create Quotation</h2>
          <OrderForm products={products} />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: '1rem' }}>Your Orders</h2>
          <div className="card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map(o => (
                  <tr key={o.id}>
                    <td>{o.id.slice(-8)}</td>
                    <td>{o.items[0]?.product.name}</td>
                    <td>{o.items[0]?.displayQuantity.toString()} {o.items[0]?.displayUnit}</td>
                    <td>{formatINR(o.totalAmount.toString())}</td>
                    <td>
                      <span className={`badge badge-${o.status.toLowerCase()}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {myOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No orders placed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
