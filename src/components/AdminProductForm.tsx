'use client';

import { useState, useTransition } from 'react';
import { createProduct } from '@/app/actions/products';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AdminProductForm() {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const res = await createProduct(formData);
      if (res?.error) {
        showToast('error', res.error);
      } else {
        showToast('success', 'Product registered to inventory');
        // Reset form
        const form = document.getElementById('admin-product-form') as HTMLFormElement;
        form?.reset();
      }
    });
  };

  return (
    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-10 bg-blue-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <PlusCircle size={20} className="text-blue-400" />
          <h2 className="text-lg font-black uppercase tracking-widest">Initialize Entry</h2>
        </div>
        
        <form id="admin-product-form" action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Designation</label>
            <input type="text" name="name" className="w-full px-5 py-4 bg-white/5 border border-white/10 focus:border-blue-400 rounded-2xl outline-none transition-all font-bold text-white placeholder:text-white/20" required placeholder="NACL_LAB_GRADE" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Metric</label>
              <select name="baseUnit" className="w-full px-5 py-4 bg-white/5 border border-white/10 focus:border-blue-400 rounded-2xl outline-none transition-all font-bold text-white appearance-none">
                <option value="GRAM">GRAM (g)</option>
                <option value="MILLILITER">ML (ml)</option>
                <option value="COUNT">ITEM (cnt)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rate (INR)</label>
              <input type="number" name="basePrice" step="0.00000001" className="w-full px-5 py-4 bg-white/5 border border-white/10 focus:border-blue-400 rounded-2xl outline-none transition-all font-bold text-white" required placeholder="0.00" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Initial Load</label>
            <input type="number" name="stock" step="0.00000001" className="w-full px-5 py-4 bg-white/5 border border-white/10 focus:border-blue-400 rounded-2xl outline-none transition-all font-bold text-white" required placeholder="0.00" />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              'Commit to Registry'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
