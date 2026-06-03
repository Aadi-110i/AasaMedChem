'use client';

import { useEffect, useState, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  exiting?: boolean;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

function ToastNotification({ toast, onRemove }: { toast: ToastItem; onRemove: (id: string) => void }) {
  const [progress, setProgress] = useState(100);
  const duration = 4000;

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining > 0) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const timeout = setTimeout(() => onRemove(toast.id), duration);
    return () => clearTimeout(timeout);
  }, [toast.id, onRemove]);

  const icon = {
    success: <CheckCircle2 size={18} />,
    error: <XCircle size={18} />,
    info: <Info size={18} />,
  }[toast.type];

  const colors = {
    success: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', bar: 'bg-emerald-500' },
    error: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', bar: 'bg-red-500' },
    info: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', bar: 'bg-blue-500' },
  }[toast.type];

  return (
    <div
      className={`${colors.bg} ${colors.text} ${colors.border} border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${toast.exiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}
      style={{ animation: toast.exiting ? undefined : 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="px-5 py-4 flex items-center gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <span className="text-sm font-bold flex-1">{toast.message}</span>
        <button onClick={() => onRemove(toast.id)} className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity">
          <X size={14} />
        </button>
      </div>
      <div className="h-[3px] w-full bg-black/5">
        <div className={`h-full ${colors.bar} transition-none`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted && createPortal(
        <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-3 w-[380px] max-w-[calc(100vw-48px)] pointer-events-none">
          {toasts.map(toast => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastNotification toast={toast} onRemove={removeToast} />
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
