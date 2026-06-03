import { ShieldCheck, FileText, CheckCircle2, Lock, Scale, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function CompliancePage() {
  const certifications = [
    { title: "ISO 9001:2015", desc: "Quality Management Systems", icon: <CheckCircle2 className="text-blue-500" /> },
    { title: "cGMP Certified", desc: "Current Good Manufacturing Practice", icon: <ShieldCheck className="text-emerald-500" /> },
    { title: "REACH Compliant", desc: "EU Chemical Regulation", icon: <Scale className="text-purple-500" /> },
    { title: "EPA Registered", desc: "Environmental Protection Agency", icon: <Leaf className="text-green-500" /> },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-0 right-0 p-32 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-emerald-500/20">
            <Lock size={14} /> Zero-Compromise Policy
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Compliance & Safety</h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Our platform rigorously adheres to global pharmaceutical and chemical distribution standards. Verification is mandatory.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-20 relative z-20 pb-32 max-w-6xl">
        
        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-white rounded-[24px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                {cert.icon}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{cert.title}</h3>
              <p className="text-sm font-medium text-slate-500">{cert.desc}</p>
            </div>
          ))}
        </div>

        {/* SDS Section */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
              <FileText size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Safety Data Sheets (SDS)</h2>
              <p className="text-slate-500 font-medium">Digital repository of material safety protocols</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center">
            <ShieldCheck size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Authenticated Access Only</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto mb-6">
              Due to strict regulatory compliance, full Safety Data Sheets (SDS) and material composition reports are only accessible to verified Buyers and Sellers.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/login" className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                Terminal Login
              </Link>
              <Link href="/register" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                Verify Identity
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
