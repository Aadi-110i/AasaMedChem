'use client';

import { register } from '@/app/actions/auth';
import Link from 'next/link';
import { UserPlus, Shield, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const res = await register(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Video/Visual Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#050608] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-transparent"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-h-[80%] object-contain mix-blend-screen opacity-90 z-10"
        >
          <source src="/videoforlogin.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 p-16 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex p-3 bg-emerald-500/20 backdrop-blur-md rounded-2xl text-emerald-400 mb-8 border border-emerald-500/30">
              <UserPlus size={32} />
            </div>
            <h2 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Establish Your <br />
              <span className="text-emerald-400">Digital Identity.</span>
            </h2>
            <p className="text-xl text-slate-300 font-medium leading-relaxed opacity-80">
              Joining the global AasaMedChem network. 
              Configure your credentials and assigned operational protocol.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-16 flex items-center gap-12 border-t border-white/10 pt-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-bold">1</div>
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Validate ID</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-bold">2</div>
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Assign Protocol</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-24 relative bg-white">
        <Link href="/" className="absolute top-8 left-8 lg:left-24 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Identity Registration</h1>
            <p className="text-slate-500 font-medium">Create your official laboratory credentials.</p>
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
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Identifier</label>
              <input 
                type="email" 
                name="email" 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[20px] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" 
                required 
                placeholder="officer@aasa.lab" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secure Cipher</label>
              <input 
                type="password" 
                name="password" 
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[20px] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" 
                required 
                placeholder="••••••••" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Assigned Protocol</label>
              <div className="relative">
                <select 
                  name="role" 
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[20px] outline-none transition-all font-bold text-slate-900 appearance-none"
                >
                  <option value="BUYER">Buyer (Purchase Chemicals)</option>
                  <option value="SELLER">Seller (Supply Chemicals)</option>
                  <option value="ADMIN">System Administrator (Root)</option>
                </select>
                <Shield size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-[20px] font-black text-lg shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-3 group mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 size={22} className="animate-spin" />
                  Establishing...
                </>
              ) : (
                <>
                  Establish Identity <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">
              Registered Unit? <Link href="/login" className="text-blue-600 hover:text-blue-700 underline underline-offset-4 ml-1">Terminal Login</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
