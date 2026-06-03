'use client';

import { useTransition } from 'react';
import { updateRequestStatus } from '@/app/actions/seller-requests';
import { useToast } from '@/components/Toast';
import { Check, X, Loader2 } from 'lucide-react';

export default function SellerRequestActions({ requestId }: { requestId: string }) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleAction = async (status: 'APPROVED' | 'REJECTED') => {
    startTransition(async () => {
      const result = await updateRequestStatus(requestId, status);
      if (result.error) {
        showToast('error', result.error);
      } else {
        showToast('success', `Request marked as ${status}`);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleAction('APPROVED')}
        disabled={isPending}
        className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-colors disabled:opacity-50"
        title="Approve Request"
      >
        {isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
      </button>
      <button
        onClick={() => handleAction('REJECTED')}
        disabled={isPending}
        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50"
        title="Reject Request"
      >
        {isPending ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
      </button>
    </div>
  );
}
