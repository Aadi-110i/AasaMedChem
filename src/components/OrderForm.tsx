'use client';

import { useState, useMemo, useTransition } from 'react';
import { placeOrder } from '@/app/actions/orders';
import { UnitType, formatINR, toBaseQuantity } from '@/lib/units';
import { Decimal } from 'decimal.js';
import { ChevronRight, Cpu, Target, Loader2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

interface Product {
  id: string;
  name: string;
  baseUnit: 'GRAM' | 'MILLILITER' | 'COUNT';
  basePrice: string | number | Decimal;
  stock: string | number | Decimal;
}

export default function OrderForm({ products }: { products: Product[] }) {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState<UnitType>(() => {
    const first = products[0];
    if (!first) return 'g';
    if (first.baseUnit === 'GRAM') return 'g';
    if (first.baseUnit === 'MILLILITER') return 'mL';
    return 'item';
  });
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const selectedProduct = useMemo(() => 
    products.find(p => p.id === selectedProductId),
  [products, selectedProductId]);

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
    const product = products.find(p => p.id === productId);
    if (product) {
      if (product.baseUnit === 'GRAM') setUnit('g');
      else if (product.baseUnit === 'MILLILITER') setUnit('mL');
      else setUnit('item');
    }
  };

  const availableUnits = useMemo(() => {
    if (!selectedProduct) return [];
    if (selectedProduct.baseUnit === 'GRAM') return ['g', 'kg'] as UnitType[];
    if (selectedProduct.baseUnit === 'MILLILITER') return ['mL', 'L'] as UnitType[];
    return ['item'] as UnitType[];
  }, [selectedProduct]);

  const calculatedPrice = useMemo(() => {
    if (!selectedProduct || !quantity || isNaN(Number(quantity))) return new Decimal(0);
    try {
      const baseQuantity = toBaseQuantity(quantity, unit);
      return new Decimal(selectedProduct.basePrice.toString()).mul(baseQuantity);
    } catch {
      return new Decimal(0);
    }
  }, [selectedProduct, quantity, unit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await placeOrder(selectedProductId, quantity, unit);
      if (res.error) {
        showToast('error', res.error);
      } else {
        showToast('success', `Order placed: ${quantity} ${unit} of ${selectedProduct?.name}`);
        setQuantity('1');
      }
    });
  };

  if (products.length === 0) return (
    <div className="p-10 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[32px]">
      <div className="text-slate-300 font-black uppercase tracking-widest text-xs">ERR: NO_INVENTORY_DETECTED</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <Cpu size={120} />
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Target size={18} />
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Metric Input Matrix</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 text-nowrap">Target Subject</label>
          <select 
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 appearance-none"
            value={selectedProductId} 
            onChange={(e) => handleProductChange(e.target.value)}
            required
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name} (AVAIL: {p.stock.toString()})</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 text-nowrap">Quantity Mass</label>
            <input 
              type="number" 
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              step="0.00000001"
              min="0"
              required 
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 text-nowrap">Metric ID</label>
            <select 
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 appearance-none"
              value={unit} 
              onChange={(e) => setUnit(e.target.value as UnitType)}
              required
            >
              {availableUnits.map(u => (
                <option key={u} value={u}>{u.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
        <div className="flex justify-between items-end px-1">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Net valuation</div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter">
              {formatINR(calculatedPrice.toString())}
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:bg-slate-300 disabled:shadow-none" 
          disabled={isPending || !quantity || Number(quantity) <= 0}
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Executing...
            </>
          ) : (
            <>
              Establish Order
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
