'use client';

import { createSellerRequest } from '@/app/actions/seller-requests';
import { useTransition, useRef } from 'react';
import { useToast } from '@/components/Toast';
import { Loader2, Plus, Send } from 'lucide-react';

export default function SellerRequestForm() {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createSellerRequest(formData);
      
      if (result.error) {
        showToast('error', result.error);
      } else {
        showToast('success', 'Chemical listing request submitted successfully.');
        formRef.current?.reset();
      }
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
      <div className="space-y-6">
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Chemical Nomenclature</label>
          <input 
            type="text" 
            name="chemicalName" 
            required
            placeholder="e.g. Potassium Permanganate"
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium" 
          />
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Technical Description / Grade (Optional)</label>
          <textarea 
            name="description" 
            placeholder="e.g. Analytical grade, >99% purity..."
            rows={3}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300 resize-none" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Proposed Quantity</label>
            <input 
              type="number" 
              name="quantity" 
              placeholder="e.g. 500"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" 
            />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Unit</label>
            <select 
              name="unit" 
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
            >
              <option value="kg">Kilograms (kg)</option>
              <option value="g">Grams (g)</option>
              <option value="L">Liters (L)</option>
              <option value="mL">Milliliters (mL)</option>
              <option value="item">Items</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full mt-4 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Transmitting...
            </>
          ) : (
            <>
              <Send size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              Submit Listing Request
            </>
          )}
        </button>
      </div>
    </form>
  );
}
