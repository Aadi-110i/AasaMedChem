import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import { ShieldCheck, Scale, Zap, ArrowRight, Activity, Microscope, CheckCircle2 } from 'lucide-react';

export default async function LandingPage() {
  const auth = await getAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="container relative mx-auto px-6 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Industry Standard Logistics
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Precision Logistics for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Chemical Intelligence.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              The high-performance inventory and order management engine built specifically for modern laboratories and chemical suppliers.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              {auth ? (
                <Link href={auth.role === 'ADMIN' ? '/admin' : '/seller'} 
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xl shadow-slate-200 transition-all flex items-center gap-2">
                  Access Dashboard <ArrowRight size={20} />
                </Link>
              ) : (
                <>
                  <Link href="/login" 
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xl shadow-blue-200 transition-all">
                    Sign In
                  </Link>
                  <Link href="/register" 
                    className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-bold transition-all">
                    Create Free Account
                  </Link>
                </>
              )}
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 italic">
                    U{i}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-500 font-medium">
                Trusted by <span className="text-slate-900 font-bold">500+</span> chemical suppliers worldwide
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between mb-8 pb-6 border-bottom border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
                    <Microscope size={28} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Lab-Batch #A99</div>
                    <div className="text-xs text-slate-500 font-mono">ID: 8829-X01-2026</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900">99.98%</div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Purity Verified</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-blue-600"></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>STORAGE: 12°C</span>
                  <span>CAPACITY: 85%</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold mb-1">STABILITY</div>
                  <div className="text-lg font-bold text-slate-900 text-nowrap">OPTIMAL</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-400 font-bold mb-1">LAST SYNC</div>
                  <div className="text-lg font-bold text-slate-900 text-nowrap">2m AGO</div>
                </div>
              </div>
            </div>
            
            {/* Background card decorations */}
            <div className="absolute top-10 -right-10 w-full h-full bg-slate-900 rounded-3xl -z-10 translate-x-4 translate-y-4 opacity-5"></div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">Engineered for Accuracy.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">Standardizing the way chemical inventories are tracked and managed across global teams.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck size={32} />, title: "Enterprise Access", desc: "Granular RBAC protocols for admins and sales officers with secure JWT validation." },
              { icon: <Scale size={32} />, title: "8-Decimal Depth", desc: "High-precision unit scales engineered for sensitive chemical and medical formulations." },
              { icon: <Zap size={32} />, title: "Instant Logistics", desc: "Automated quotation engine with real-time inventory reconciliation and stock locks." }
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Prop */}
        <div className="mt-40 p-12 lg:p-20 rounded-[40px] bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">Ready to modernize your inventory protocols?</h2>
              <div className="space-y-4">
                {["Real-time Stock Monitoring", "Automated Compliance Reporting", "Seamless Team Collaboration"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <CheckCircle2 size={20} className="text-blue-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/register" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-blue-900/50">
                Establish Your Lab Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-slate-100 bg-slate-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 font-black text-slate-900 text-xl tracking-tighter">
            <Microscope size={24} className="text-blue-600" />
            AASAMEDCHEM
          </div>
          <div className="text-sm text-slate-400 font-bold">
            © 2026 AASAMEDCHEM LOGISTICS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-xs font-black text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
