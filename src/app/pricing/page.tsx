import { CheckCircle2, Coins, Microscope, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 container mx-auto px-6 text-center">
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
          Value Built on <span className="text-blue-600">Precision.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mb-16">
          Transparent, lab-grade pricing designed to scale with your laboratory operations. 
          From small research nodes to global enterprise labs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          {/* Starter */}
          <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col h-full hover:bg-white hover:shadow-2xl transition-all">
            <div className="mb-8">
              <div className="p-3 bg-white inline-flex rounded-2xl shadow-sm text-slate-400 mb-6"><Microscope size={24} /></div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Research Node</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-slate-900">₹0</span>
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Free Forever</span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Perfect for independent researchers and small lab setups.</p>
            </div>
            <ul className="space-y-4 mb-12">
              {["Single Lab Node", "Up to 100 SKUs", "Standard Audit Logs", "8-Decimal Precision"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-auto w-full py-4 bg-slate-900 text-white text-center rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-colors">
              Establish Access
            </Link>
          </div>

          {/* Professional */}
          <div className="p-10 bg-blue-600 rounded-[40px] text-white flex flex-col h-full shadow-2xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 bg-white/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="mb-8">
              <div className="p-3 bg-white/10 backdrop-blur-md inline-flex rounded-2xl mb-6 text-white"><Coins size={24} /></div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">Production Lab</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-white">₹4,999</span>
                <span className="text-white/60 font-bold uppercase text-[10px] tracking-widest">/ Node / MO</span>
              </div>
              <p className="text-white/80 text-sm font-medium leading-relaxed">Engineered for high-volume supply chains and established labs.</p>
            </div>
            <ul className="space-y-4 mb-12">
              {["Unlimited Inventory", "Advanced Multi-Node Sync", "Real-time Stock Locks", "API Protocol Access", "Priority Compliance Support"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                  <CheckCircle2 size={16} className="text-white/40" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-auto w-full py-4 bg-white text-blue-600 text-center rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors">
              Request Trial
            </Link>
          </div>

          {/* Enterprise */}
          <div className="p-10 bg-slate-900 rounded-[40px] text-white flex flex-col h-full hover:shadow-2xl transition-all">
            <div className="mb-8">
              <div className="p-3 bg-white/5 inline-flex rounded-2xl mb-6 text-slate-400"><Building2 size={24} /></div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">Global Grid</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black">Custom</span>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">Dedicated infrastructure for multinational pharmaceutical networks.</p>
            </div>
            <ul className="space-y-4 mb-12">
              {["Custom Data Governance", "White-label Portal", "24/7 Security Ops", "On-premise Deployment", "Custom Compliance Audits"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                  <CheckCircle2 size={16} className="text-blue-500" /> {item}
                </li>
              ))}
            </ul>
            <button className="mt-auto w-full py-4 border-2 border-white/10 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-colors">
              Contact Root Admins
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.3em] mb-4">No hidden protocols.</p>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">All pricing includes standard end-to-end encryption and automatic version updates across the AasaMedChem network.</p>
        </div>
      </section>
    </div>
  );
}
