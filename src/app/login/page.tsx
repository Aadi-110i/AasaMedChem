'use client';

import { login } from '@/app/actions/auth';
import Link from 'next/link';
import { Fingerprint, Key, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const res = await login(formData);
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-[440px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to safety
        </Link>
        
        <div className="bg-white rounded-[32px] p-10 shadow-2xl shadow-slate-200 border border-slate-100">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-blue-50 text-blue-600 rounded-2xl mb-6">
              <Fingerprint size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Access Terminal</h1>
            <p className="text-slate-400 font-medium">Initialize your secure session</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest rounded-xl border border-red-100 text-center">
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Identifier</label>
              <input 
                type="email" 
                name="email" 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300" 
                required 
                placeholder="officer@aasa.lab" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Access Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  name="password" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300" 
                  required 
                  placeholder="••••••••" 
                />
                <Key size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
              </div>
            </div>
            
            <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2 group mt-4">
              Initialize Protocol <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">
              New officer? <Link href="/register" className="text-blue-600 hover:text-blue-700 underline underline-offset-4 ml-1">Request Credentials</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
