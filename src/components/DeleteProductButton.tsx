'use client';

import { useState, useTransition } from 'react';
import { deleteProduct } from '@/app/actions/products';
import { Trash2, Loader2, AlertTriangle, X } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function DeleteProductButton({ productId, productName }: { productId: string; productName: string }) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const { showToast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteProduct(productId);
      if (res?.error) {
        showToast('error', res.error);
      } else {
        showToast('success', `${productName} removed from registry`);
      }
      setShowConfirm(false);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
        title="Delete product"
      >
        <Trash2 size={18} />
      </button>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center" onClick={() => setShowConfirm(false)}>
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" style={{ animation: 'fadeIn 0.2s ease-out' }}></div>
          <div
            className="relative bg-white rounded-[28px] p-8 shadow-2xl max-w-sm w-full mx-6 border border-slate-100"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <button onClick={() => setShowConfirm(false)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-600 transition-colors">
              <X size={16} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-red-50 text-red-500 rounded-2xl mb-5">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Confirm Deletion</h3>
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">
                Remove <span className="font-black text-slate-900">{productName}</span> from the active registry? This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
