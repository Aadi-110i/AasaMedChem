import { prisma } from '@/lib/prisma';
import { formatINR } from '@/lib/units';
import { Database, Box, History, TrendingUp, AlertCircle, Inbox, Tag } from 'lucide-react';
import AdminProductForm from '@/components/AdminProductForm';
import DeleteProductButton from '@/components/DeleteProductButton';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import SellerRequestActions from '@/components/SellerRequestActions';
import { Decimal } from 'decimal.js';

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  const sellerRequests = await prisma.sellerRequest.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  // Calculate Analytics
  const totalRevenue = orders
    .filter(o => o.status !== 'PENDING')
    .reduce((acc, order) => acc.add(order.totalAmount as any), new Decimal(0));
  
  const lowStockProducts = products.filter(p => new Decimal(p.stock as any).lt(10));
  const pendingRequests = sellerRequests.filter(r => r.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-10 pb-20">
      <div className="container mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-3">
            <AlertCircle size={14} /> System Root Access
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Central Operations</h1>
          <p className="text-slate-500 font-medium">Global inventory, analytics, and transaction oversight node.</p>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><TrendingUp size={24} /></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Yield</span>
            </div>
            <div className="text-3xl font-black text-slate-900 relative z-10">{formatINR(totalRevenue.toString())}</div>
            <p className="text-xs text-slate-400 font-bold mt-1 uppercase relative z-10">Processed Revenue</p>
          </div>
          
          <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Box size={24} /></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</span>
            </div>
            <div className="text-3xl font-black text-slate-900">{products.length}</div>
            <p className="text-xs text-slate-400 font-bold mt-1 uppercase">Tracked Batches</p>
          </div>
          
          <div className={`bg-white p-8 rounded-[24px] border shadow-sm ${lowStockProducts.length > 0 ? 'border-red-200 bg-red-50/30' : 'border-slate-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${lowStockProducts.length > 0 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}><AlertCircle size={24} /></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alerts</span>
            </div>
            <div className="text-3xl font-black text-slate-900">{lowStockProducts.length}</div>
            <p className="text-xs text-slate-400 font-bold mt-1 uppercase">Low Stock Warnings</p>
          </div>

          <div className={`bg-white p-8 rounded-[24px] border shadow-sm ${pendingRequests > 0 ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${pendingRequests > 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}><Inbox size={24} /></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Required</span>
            </div>
            <div className="text-3xl font-black text-slate-900">{pendingRequests}</div>
            <p className="text-xs text-slate-400 font-bold mt-1 uppercase">Pending Seller Requests</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 mb-12">
          {/* Left Column: Form */}
          <div className="xl:col-span-1">
            <div className="sticky top-28">
              <AdminProductForm />
            </div>
          </div>

          {/* Right Column: Tables */}
          <div className="xl:col-span-2 space-y-12">
            
            {/* Seller Requests */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <Tag size={20} className="text-slate-400" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Seller Listing Requests</h2>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Personnel</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Proposed Listing</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Review</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {sellerRequests.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="text-xs font-bold text-slate-900">{r.user.email}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-black text-slate-900">{r.chemicalName}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                              Vol: {r.quantity} {r.unit}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              r.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 
                              r.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 
                              'bg-red-50 text-red-600'
                            }`}>{r.status}</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            {r.status === 'PENDING' && (
                              <div className="flex justify-end">
                                <SellerRequestActions requestId={r.id} />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {sellerRequests.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center">
                            <div className="text-sm font-black text-slate-300 uppercase tracking-widest">No pending requests</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-6">
                <Database size={20} className="text-slate-400" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Active Inventory Registry</h2>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Designation</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Class</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Valuation</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Ops</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="font-black text-slate-900">{p.name}</div>
                            <div className="text-[10px] font-bold text-slate-300 font-mono mt-1">ID: {p.id.slice(-8).toUpperCase()}</div>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500">{p.baseUnit}</span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-blue-600">{formatINR(p.basePrice.toString())}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Stock: {p.stock.toString()}</div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <DeleteProductButton productId={p.id} productName={p.name} />
                          </td>
                        </tr>
                      ))}
                      {products.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center">
                            <div className="text-sm font-black text-slate-300 uppercase tracking-widest">No products in registry</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-6">
                <History size={20} className="text-slate-400" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Recent Operational Logs</h2>
              </div>
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Ref Hash</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Personnel</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Spec</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6 font-mono text-[10px] font-bold text-slate-400">#{o.id.toUpperCase()}</td>
                          <td className="px-8 py-6">
                            <div className="text-xs font-bold text-slate-900">{o.user.email}</div>
                          </td>
                          <td className="px-8 py-6">
                            {o.items.map(item => (
                              <div key={item.id} className="text-xs font-bold text-slate-500">
                                {item.product.name} ({item.displayQuantity.toString()} {item.displayUnit})
                              </div>
                            ))}
                          </td>
                          <td className="px-8 py-6">
                            <OrderStatusBadge orderId={o.id} status={o.status} />
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center">
                            <div className="text-sm font-black text-slate-300 uppercase tracking-widest">No transactions detected</div>
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
      </div>
    </div>
  );
}
