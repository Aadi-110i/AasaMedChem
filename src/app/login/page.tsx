'use client';

import { login } from '@/app/actions/auth';
import Link from 'next/link';
import { Fingerprint, Key, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    const res = await login(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Visual Section (Restored Split Layout) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-lab-deep items-center justify-center overflow-hidden">
        {/* Dynamic Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-transparent z-0"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 p-16 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex p-3 bg-blue-500/10 backdrop-blur-md rounded-2xl text-blue-400 mb-8 border border-white/10 shadow-xl">
              <Fingerprint size={32} />
            </div>
            <h2 className="text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Secure Access to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Chemical Intel.</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Synchronizing your terminal with global laboratory nodes. 
              Authorized access protocols active.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20 grid grid-cols-2 gap-12 border-t border-white/5 pt-12"
          >
            <div>
              <div className="text-4xl font-black text-white mb-1 tracking-tighter">100%</div>
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Encrypted Link</div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-1 tracking-tighter">NODE_01</div>
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Terminal ID</div>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Tech Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
      </div>

      {/* Right Side: Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-24 relative bg-white">
        <Link href="/" className="absolute top-8 left-8 lg:left-24 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Operator Login</h1>
            <p className="text-slate-500 font-medium">Verify credentials to initialize session.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest rounded-2xl border border-red-100 text-center shadow-sm"
            >
              {error}
            </motion.div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Identity ID</label>
              <input 
                type="email" 
                name="email" 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[20px] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 shadow-sm shadow-slate-100/50" 
                required 
                placeholder="officer@aasa.lab" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Access Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  name="password" 
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[20px] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 shadow-sm shadow-slate-100/50" 
                  required 
                  placeholder="••••••••" 
                />
                <Key size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-slate-950 hover:bg-slate-900 text-white rounded-[20px] font-black text-lg shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-3 group mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Validating...' : 'Initialize Session'} 
              {!loading && <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">
              Unregistered Unit? <Link href="/register" className="text-blue-600 hover:text-blue-700 underline underline-offset-4 ml-1">Establish Identity</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
