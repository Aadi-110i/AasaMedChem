import { Microscope, Database, Zap, Shield, BarChart3, Globe } from 'lucide-react';
import Link from 'next/link';

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight">
            The Engine of <span className="text-blue-600">Modern Chemistry.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
            AasaMedChem is a specialized logistics infrastructure designed for precision, 
            compliance, and scale. Built for laboratories that demand absolute accuracy.
          </p>
          <Link href="/register" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-2xl shadow-slate-200 transition-all hover:scale-105 active:scale-95">
            Establish Your Node
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: <Database className="text-blue-600" />, title: "Distributed Registry", desc: "A unified, real-time database tracking every gram of your inventory across multiple global sites." },
              { icon: <Zap className="text-amber-500" />, title: "Automated Logistics", desc: "Instant quotation generation and automated stock locks to prevent race conditions during orders." },
              { icon: <Shield className="text-emerald-500" />, title: "Hardened Security", desc: "JWT-based authentication and granular role-based access control (RBAC) at every level." },
              { icon: <BarChart3 className="text-indigo-600" />, title: "Metric Precision", desc: "8-decimal floating point accuracy for chemical measurements and financial valuations." },
              { icon: <Microscope className="text-blue-500" />, title: "Lab-First UX", desc: "Interfaces designed specifically for lab technicians and chemical supply chain officers." },
              { icon: <Globe className="text-slate-400" />, title: "Global Sync", desc: "Low-latency synchronization ensuring your entire team sees the same reality, everywhere." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[32px] border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="mb-6 inline-flex p-4 bg-slate-50 rounded-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer-like CTA */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-black mb-8">Ready to modernize?</h2>
          <Link href="/register" className="px-8 py-4 bg-blue-600 rounded-xl font-bold transition-all hover:bg-blue-700">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
