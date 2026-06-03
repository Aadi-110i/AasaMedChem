import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import SellerRequestForm from '@/components/SellerRequestForm';
import { ClipboardList, Clock, Activity, Target, FlaskConical } from 'lucide-react';

export default async function SellerDashboard() {
  const auth = await getAuth();

  const myRequests = await prisma.sellerRequest.findMany({
    where: { userId: auth?.userId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pt-10 pb-20">
      <div className="container mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-3">
            <Activity size={14} /> Operational Node Active
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Seller Hub</h1>
          <p className="text-slate-500 font-medium">Submit new chemical listings to the network administrators.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Request Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="flex items-center gap-3 mb-6">
                <FlaskConical size={20} className="text-slate-400" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Initialize Listing Request</h2>
              </div>
              <SellerRequestForm />
              
              <div className="mt-8 p-6 bg-slate-900 rounded-[32px] text-white relative overflow-hidden shadow-xl shadow-slate-200">
                <div className="absolute top-0 right-0 p-10 bg-white/10 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80 text-blue-400">
                    <Target size={14} /> Network Standard
                  </div>
                  <h3 className="text-xl font-black mb-2">Quality Control Protocol</h3>
                  <p className="text-sm font-medium opacity-80 leading-relaxed text-slate-400">All submissions undergo rigorous administrative review. Approvals typically clear within 2-4 network cycles.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: History */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardList size={20} className="text-slate-400" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Submission Ledger</h2>
            </div>
            
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Ref</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Compound</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Proposed Vol</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Network Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {myRequests.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="font-mono text-[10px] font-bold text-slate-400 uppercase">#{r.id.slice(-8).toUpperCase()}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="font-black text-slate-900">{r.chemicalName}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-900">{r.quantity} {r.unit}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            r.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 
                            r.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 
                            'bg-red-50 text-red-600'
                          }`}>{r.status}</span>
                        </td>
                      </tr>
                    ))}
                    {myRequests.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: '100px' }}>
                          <div className="flex flex-col items-center">
                            <Clock size={40} className="text-slate-200 mb-4" />
                            <div className="text-sm font-black text-slate-300 uppercase tracking-widest">No active submissions</div>
                          </div>
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
    </div>
  );
}
