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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px] opacity-40 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-100 rounded-full blur-[100px] opacity-30 translate-y-1/2 translate-x-1/2"></div>

      <Link href="/" className="absolute top-8 left-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors group z-20">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[480px] bg-white rounded-[40px] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-2xl mb-6 shadow-sm">
            <UserPlus size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Identity Registration</h1>
          <p className="text-slate-500 font-medium leading-relaxed">Establish your official laboratory credentials and operational protocol.</p>
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
            Registered Node? <Link href="/login" className="text-blue-600 hover:text-blue-700 underline underline-offset-4 ml-1">Terminal Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
