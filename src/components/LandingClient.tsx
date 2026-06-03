'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ShieldCheck, Scale, Zap, ArrowRight, Microscope, CheckCircle2 } from 'lucide-react';

export default function LandingClient({ auth }: { auth: any }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Decorative background elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="container relative mx-auto px-6 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Industry Standard Logistics
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Precision Logistics for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Chemical Intelligence.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              The high-performance inventory and order management engine built specifically for modern laboratories and chemical suppliers.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
              {auth ? (
                <Link href={auth.role === 'ADMIN' ? '/admin' : '/seller'} 
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xl shadow-slate-200 transition-all flex items-center gap-2 group">
                  Access Dashboard <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight size={20} /></motion.div>
                </Link>
              ) : (
                <>
                  <Link href="/login" 
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-2xl shadow-blue-200/50 transition-all transform hover:scale-105 active:scale-95">
                    Sign In
                  </Link>
                  <Link href="/register" 
                    className="px-10 py-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95">
                    Create Free Account
                  </Link>
                </>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.2, zIndex: 20 }}
                    className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 italic relative z-10 cursor-default"
                  >
                    U{i}
                  </motion.div>
                ))}
              </div>
              <div className="text-sm text-slate-500 font-medium">
                Trusted by <span className="text-slate-900 font-bold underline decoration-blue-500 underline-offset-4 decoration-2">500+</span> chemical suppliers worldwide
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 100, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: -15, rotateX: 10 }}
            whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative perspective-1000 hidden lg:block"
          >
            <div className="relative z-10 p-10 rounded-[40px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ rotate: 180 }}
                    className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-xl shadow-blue-200"
                  >
                    <Microscope size={28} />
                  </motion.div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">Lab-Batch #A99</div>
                    <div className="text-xs text-slate-400 font-mono tracking-widest uppercase">ID: 8829-X01-2026</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-slate-900 tracking-tighter">99.98%</div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Purity Verified</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <span>Stability Index</span>
                    <span>85%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { label: "Storage", val: "12°C" },
                  { label: "Last Sync", val: "2m ago" }
                ].map((stat, i) => (
                  <div key={i} className="p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white transition-colors cursor-default group">
                    <div className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-widest">{stat.label}</div>
                    <div className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{stat.val}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Background 3D effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/30 blur-[100px] -z-10 rounded-full"></div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-56"
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Engineered for Accuracy.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">Standardizing the way chemical inventories are tracked and managed across global teams.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <ShieldCheck size={32} />, title: "Enterprise Access", desc: "Granular RBAC protocols for admins and sales officers with secure JWT validation." },
              { icon: <Scale size={32} />, title: "8-Decimal Depth", desc: "High-precision unit scales engineered for sensitive chemical and medical formulations." },
              { icon: <Zap size={32} />, title: "Instant Logistics", desc: "Automated quotation engine with real-time inventory reconciliation and stock locks." }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -12 }}
                className="group p-10 rounded-[40px] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all"
              >
                <div className="mb-8 inline-flex p-5 rounded-3xl bg-slate-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Value Prop */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-56 p-12 lg:p-24 rounded-[64px] bg-slate-950 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2),transparent_50%)]"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl lg:text-6xl font-black mb-10 leading-tight tracking-tighter">Ready to modernize your <br /><span className="text-blue-500">inventory protocols?</span></h2>
              <div className="space-y-6">
                {["Real-time Stock Monitoring", "Automated Compliance Reporting", "Seamless Team Collaboration"].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-slate-400 font-bold text-lg"
                  >
                    <CheckCircle2 size={24} className="text-blue-500" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/register" className="px-12 py-6 bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 rounded-3xl font-black text-xl transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
                Establish Your Lab Today
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="py-16 border-t border-slate-50 bg-slate-50/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 font-black text-slate-900 text-2xl tracking-tighter">
            <div className="p-1.5 bg-slate-900 rounded-lg text-white">
              <Microscope size={20} />
            </div>
            AASAMEDCHEM
          </div>
          <div className="text-sm text-slate-400 font-bold">
            © 2026 AASAMEDCHEM LOGISTICS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-10 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
