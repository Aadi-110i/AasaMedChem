'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
  ShieldCheck, Scale, Zap, ArrowRight, Microscope, CheckCircle2, 
  Globe2, Cpu, BarChart4, Beaker, Network, Workflow, Star
} from 'lucide-react';

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

  const scrollVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] pointer-events-none" 
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
                Version 4.0 Protocol Active
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.05] mb-8">
                The Fabric of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Chemical Trust.</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
                High-performance infrastructure for global chemical supply chains. 
                Precision unit management meets enterprise-grade security.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
                {auth ? (
                  <Link href={auth.role === 'ADMIN' ? '/admin' : '/seller'} 
                    className="px-10 py-5 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl font-black shadow-2xl shadow-slate-200 transition-all flex items-center gap-2 group text-lg">
                    Access Grid <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight size={22} /></motion.div>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" 
                      className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl shadow-2xl shadow-blue-200/50 transition-all transform hover:scale-105 active:scale-95">
                      Sign In
                    </Link>
                    <Link href="/register" 
                      className="px-12 py-5 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 rounded-2xl font-black text-xl transition-all transform hover:scale-105 active:scale-95">
                      Join the Network
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>

            {/* 3D Visual Card */}
            <motion.div 
              initial={{ opacity: 0, x: 100, rotateY: 20 }}
              animate={{ opacity: 1, x: 0, rotateY: -15, rotateX: 10 }}
              whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 relative perspective-1000 hidden lg:block"
            >
              <div className="relative z-10 p-12 rounded-[56px] bg-white/90 backdrop-blur-3xl border border-white shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] transition-all overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                   <Network size={200} />
                </div>
                
                <div className="flex items-center justify-between mb-10 pb-8 border-b border-slate-100">
                  <div className="flex items-center gap-5">
                    <motion.div 
                      whileHover={{ rotate: 180 }}
                      className="p-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl text-white shadow-xl shadow-blue-200"
                    >
                      <Microscope size={32} />
                    </motion.div>
                    <div>
                      <div className="font-black text-slate-900 text-xl tracking-tight">Node_Sync Active</div>
                      <div className="text-xs text-slate-400 font-mono tracking-[0.2em] uppercase font-bold mt-1">ID: ASM-990-2026</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-slate-900 tracking-tighter">99.9%</div>
                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Accuracy Verified</div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                      <span>Integrity Metric</span>
                      <span>100%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8">
                  {[
                    { label: "Throughput", val: "8.2k/hr" },
                    { label: "Precision", val: "8-DEC" }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-[32px] bg-slate-50/50 border border-slate-100 hover:bg-white transition-all cursor-default group hover:shadow-xl hover:shadow-slate-100">
                      <div className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{stat.val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-blue-100/20 blur-[120px] -z-10 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INFRASTRUCTURE STATS SECTION */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.1),transparent_40%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            {[
              { val: "₹140B+", label: "Capital Tracked", icon: <BarChart4 /> },
              { val: "24/7", label: "Metric Monitoring", icon: <Zap /> },
              { val: "8-DEC", label: "Decimal Precision", icon: <Scale /> },
              { val: "Global", label: "Node Distribution", icon: <Globe2 /> }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-blue-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                <div className="text-4xl font-black tracking-tighter mb-2">{s.val}</div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREMIUM PRODUCT CATALOG (Replacing generic features) */}
      <section className="py-56 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
            className="text-center mb-24"
          >
            <div className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4">Precision Procurement</div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter">Explore Laboratory <span className="text-blue-600">Standard Batches.</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-xl leading-relaxed">
              Browse our verified chemical inventory. Each entry is batch-coded, purity-verified, and ready for instant logistics routing.
            </p>
          </motion.div>

          {/* Amazon-style Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { 
                name: "Sodium Chloride (ACS Grade)", 
                id: "NACL-99-A", 
                price: "₹0.18", 
                unit: "gram",
                purity: "99.9%",
                rating: 4.9,
                reviews: 124,
                tag: "Best Seller",
                imageColor: "bg-blue-50"
              },
              { 
                name: "Ethanol (Anhydrous)", 
                id: "ETH-100-P", 
                price: "₹0.45", 
                unit: "ml",
                purity: "100%",
                rating: 4.8,
                reviews: 89,
                tag: "High Purity",
                imageColor: "bg-emerald-50"
              },
              { 
                name: "Magnesium Sulfate", 
                id: "MGSO4-LAB", 
                price: "₹0.22", 
                unit: "gram",
                purity: "98.5%",
                rating: 4.7,
                reviews: 56,
                tag: "Bulk Ready",
                imageColor: "bg-indigo-50"
              }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-[40px] border border-slate-200 overflow-hidden hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)] transition-all duration-700 flex flex-col"
              >
                {/* Product Image Area */}
                <div className={`relative h-72 ${p.imageColor} flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-700`}>
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{p.tag}</span>
                    <span className="px-4 py-1.5 bg-white/80 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100">{p.purity} Purity</span>
                  </div>
                  <Microscope size={80} className="text-slate-900/10" />
                  <div className="absolute bottom-6 right-6 p-4 bg-white rounded-2xl shadow-xl shadow-slate-200/50">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Base Valuation</div>
                     <div className="text-xl font-black text-slate-900">{p.price}<span className="text-slate-400 text-xs font-bold">/{p.unit}</span></div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                    </div>
                    <span className="text-xs font-bold text-slate-400">({p.reviews} Verified Inquiries)</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">{p.name}</h3>
                  <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest mb-6 font-bold">Standard Batch Ref: {p.id}</p>
                  
                  <div className="mt-auto space-y-6">
                    <div className="flex justify-between items-center py-4 border-y border-slate-50">
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Availability</div>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          In-Stock Node
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Min. Order</div>
                        <div className="text-slate-900 font-black">1.00 <span className="text-xs uppercase">Metric</span></div>
                      </div>
                    </div>

                    <Link href="/register" className="w-full py-5 bg-slate-50 group-hover:bg-blue-600 text-slate-900 group-hover:text-white text-center rounded-2xl font-black uppercase text-xs tracking-widest transition-all duration-500 flex items-center justify-center gap-3">
                      Generate Quote <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <button className="text-slate-400 font-black uppercase text-xs tracking-[0.3em] hover:text-blue-600 transition-colors py-4 px-8 border border-slate-200 rounded-2xl hover:bg-white">
                View Expanded Catalog (500+ Items)
             </button>
          </div>
        </div>
      </section>

      {/* 4. [NEW] LAB-TO-LEDGER WORKFLOW */}
      <section className="py-56 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.95]">From Specimen <br /><span className="text-blue-600">to Ledger.</span></h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  Our end-to-end operational protocol ensures that laboratory physical stock is 
                  perfectly synchronized with financial valuations instantly.
                </p>
              </motion.div>

              <div className="space-y-8">
                {[
                  { icon: <Beaker />, title: "Batch Initialization", desc: "Define chemical base units and purity valuations." },
                  { icon: <Workflow />, title: "Automated Routing", desc: "Quotations are instantly routed to verification nodes." },
                  { icon: <Cpu />, title: "Atomic Deductions", desc: "Precision stock deductions prevent over-ordering." }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="flex gap-6 items-start"
                  >
                    <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">{step.icon}</div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-1">{step.title}</h4>
                      <p className="text-slate-400 font-medium">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-[56px] p-2 overflow-hidden shadow-2xl"
              >
                <div className="bg-slate-800 rounded-[48px] p-12 text-white">
                  <div className="font-mono text-[10px] text-blue-400 uppercase tracking-[0.3em] mb-12">SYSTEM_RUNTIME_VISUAL</div>
                  <div className="space-y-12">
                    {[80, 60, 95].map((w, i) => (
                      <div key={i} className="space-y-4">
                        <div className="flex justify-between items-end">
                          <div className="text-xs font-black uppercase tracking-widest">Protocol_{i+1}</div>
                          <div className="text-2xl font-black">{w}%</div>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${w}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. [NEW] TESTIMONIALS SECTION */}
      <section className="py-56 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
             <div className="inline-flex p-3 bg-slate-950 text-white rounded-2xl mb-8"><Star size={24} /></div>
             <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Validated by Industry Leaders.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { name: "Dr. Elena V.", role: "Lead Chemist, BioGrid Labs", text: "The 8-decimal precision is a game-changer. We've eliminated inventory discrepancies entirely since establishing our node." },
              { name: "Marcus Thorne", role: "Logistics Director, ChemLink", text: "Automated quotations and instant stock locks solved our biggest problem: double-selling high-value chemical batches." }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-16 rounded-[64px] bg-slate-50 border border-slate-100 relative group hover:bg-slate-950 hover:text-white transition-all duration-700"
              >
                <div className="text-4xl font-black mb-8 leading-relaxed italic">"{t.text}"</div>
                <div>
                   <div className="font-black text-xl uppercase tracking-tighter">{t.name}</div>
                   <div className="text-blue-500 font-black uppercase text-[10px] tracking-widest mt-1">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-56 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto p-12 lg:p-32 rounded-[80px] bg-slate-950 text-white relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(37,99,235,0.4)]"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_60%)]"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1">
              <h2 className="text-5xl lg:text-8xl font-black mb-12 leading-[0.9] tracking-tighter">Ready to modernize <br /><span className="text-blue-500 underline decoration-white/10 underline-offset-8">your lab?</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {["Real-time Stock Monitoring", "Automated Compliance", "Multi-Node Sync", "Precision Valuations"].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-slate-400 font-black uppercase text-xs tracking-widest"
                  >
                    <CheckCircle2 size={18} className="text-blue-500" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/register" className="px-16 py-8 bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 rounded-3xl font-black text-2xl transition-all shadow-[0_32px_64px_rgba(37,99,235,0.4)]">
                Establish Identity
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-24 border-t border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3 font-black text-slate-900 text-3xl tracking-tighter">
                <div className="p-2 bg-slate-900 rounded-xl text-white">
                  <Microscope size={24} />
                </div>
                AASAMEDCHEM
              </div>
              <p className="text-slate-400 font-bold text-sm tracking-tight text-center md:text-left">Standardizing precision logistics <br />for the global chemical network.</p>
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-12 text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                <a href="#" className="hover:text-blue-600 transition-colors">Platform</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Network</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Nodes</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Legal</a>
              </div>
              <div className="text-[10px] text-slate-300 font-black uppercase tracking-widest">
                © 2026 AASAMEDCHEM LOGISTICS NODES. ALL RIGHTS RESERVED.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
