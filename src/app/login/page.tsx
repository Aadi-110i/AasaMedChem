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
      {/* Left Side: Video/Visual Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        >
          <source src="/videoforlogin.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10 p-16 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex p-3 bg-blue-500/20 backdrop-blur-md rounded-2xl text-blue-400 mb-8 border border-blue-500/30">
              <Fingerprint size={32} />
            </div>
            <h2 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Secure Access to <br />
              <span className="text-blue-400">Chemical Intelligence.</span>
            </h2>
            <p className="text-xl text-slate-300 font-medium leading-relaxed opacity-80">
              Initializing neural-link with global inventory protocols. 
              Authorized personnel only beyond this point.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-12"
          >
            <div>
              <div className="text-3xl font-black text-white mb-1 tracking-tighter">100%</div>
              <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">End-to-End Encryption</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1 tracking-tighter">8-DEC</div>
              <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Metric Precision</div>
            </div>
          </motion.div>
        </div>
        
        {/* Floating background particles could go here */}
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
            <p className="text-slate-500 font-medium">Synchronize with the AasaMedChem grid.</p>
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
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[20px] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" 
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
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[20px] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" 
                  required 
                  placeholder="••••••••" 
                />
                <Key size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-[20px] font-black text-lg shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-3 group mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Initializing...' : 'Initialize Session'} 
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
