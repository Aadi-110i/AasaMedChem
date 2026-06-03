import { ShieldCheck, FileCheck, Lock, Fingerprint, Eye, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="py-24 container mx-auto px-6 text-center">
        <div className="inline-flex p-4 bg-blue-600 text-white rounded-3xl mb-8 shadow-xl shadow-blue-100">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
          Trust by <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Verification.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mb-16">
          Compliance is not a checkbox; it is our architecture. AasaMedChem is built to 
          satisfy the most stringent laboratory safety and data integrity standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {[
            { icon: <FileCheck />, title: "Full Audit Trails", desc: "Every inventory adjustment and order is timestamped and cryptographically linked to an authorized officer." },
            { icon: <Fingerprint />, title: "Officer Identity", desc: "Granular verification protocols ensuring that high-value transactions are only executed by certified personnel." },
            { icon: <Lock />, title: "Data Isolation", desc: "Multi-tenant architecture with high-entropy encryption for sensitive laboratory records and pricing models." },
            { icon: <ClipboardCheck />, title: "Metric Validation", desc: "Automatic verification of unit conversions to prevent calculation errors in highly sensitive chemical orders." }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
              <div className="mb-6 text-blue-600 group-hover:scale-110 transition-transform inline-block">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">Meets Global Standards</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-200">
            <div className="text-2xl font-black italic tracking-tighter">GLP_CERT</div>
            <div className="text-2xl font-black italic tracking-tighter">ISO_9001</div>
            <div className="text-2xl font-black italic tracking-tighter">HIPAA_SECURE</div>
            <div className="text-2xl font-black italic tracking-tighter">GDPR_READY</div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-8">Need a specialized audit?</h2>
          <p className="text-lg font-medium mb-12 opacity-80 max-w-xl mx-auto italic">Our security team can provide custom documentation for institutional requirements.</p>
          <button className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg transition-all hover:bg-slate-50">
            Download Security Whitepaper
          </button>
        </div>
      </section>
    </div>
  );
}
