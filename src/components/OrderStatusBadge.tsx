'use client';

import { useTransition } from 'react';
import { updateOrderStatus } from '@/app/actions/orders';
import { Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/Toast';

const STATUS_FLOW: Record<string, { next: 'PENDING' | 'APPROVED' | 'FULFILLED'; label: string }> = {
  PENDING: { next: 'APPROVED', label: 'Approve' },
  APPROVED: { next: 'FULFILLED', label: 'Fulfill' },
  FULFILLED: { next: 'PENDING', label: 'Reset' },
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-600 hover:bg-amber-100',
  APPROVED: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
  FULFILLED: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
};

export default function OrderStatusBadge({ orderId, status }: { orderId: string; status: string }) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const flow = STATUS_FLOW[status];

  const handleClick = () => {
    if (!flow) return;
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, flow.next);
      if (res?.error) {
        showToast('error', res.error);
      } else {
        showToast('success', `Order status → ${flow.next}`);
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer group disabled:opacity-50 ${STATUS_STYLES[status] || 'bg-slate-50 text-slate-500'}`}
      title={flow ? `Click to ${flow.label.toLowerCase()}` : ''}
    >
      {isPending ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <>
          {status}
          {flow && <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
        </>
      )}
    </button>
  );
}
