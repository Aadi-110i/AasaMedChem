'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, ClipboardList, Clock, Activity, Target, 
  Search, Star, Microscope, ArrowRight, X, ChevronRight
} from 'lucide-react';
import { formatINR, toBaseQuantity, UnitType } from '@/lib/units';
import { placeOrder } from '@/app/actions/orders';
import { Decimal } from 'decimal.js';

interface Product {
  id: string;
  name: string;
  description: string | null;
  baseUnit: 'GRAM' | 'MILLILITER' | 'COUNT';
  basePrice: string;
  stock: string;
}

interface Order {
  id: string;
  totalAmount: string;
  status: string;
  createdAt: Date;
  items: {
    product: { name: string };
    displayQuantity: string;
    displayUnit: string;
  }[];
}

export default function BuyerClient({ products, initialOrders }: { products: Product[], initialOrders: Order[] }) {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState<UnitType>('g');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const filteredProducts = useMemo(() => 
    products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
  [products, search]);

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
      return new Decimal(selectedProduct.basePrice).mul(baseQuantity);
    } catch {
      return new Decimal(0);
    }
  }, [selectedProduct, quantity, unit]);

  const handleOpenOrder = (product: Product) => {
    setSelectedProduct(product);
    if (product.baseUnit === 'GRAM') setUnit('g');
    else if (product.baseUnit === 'MILLILITER') setUnit('mL');
    else setUnit('item');
    setQuantity('1');
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setLoading(true);
    
    const res = await placeOrder(selectedProduct.id, quantity, unit);
    if (res.error) {
      setMessage({ type: 'error', text: res.error });
    } else {
      setMessage({ type: 'success', text: 'PROTOCOL_EXECUTED: ORDER_STAGED' });
      setTimeout(() => setSelectedProduct(null), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. STORE HEADER */}
      <div className="bg-white border-b border-slate-100 py-12 mb-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-3">
                <Activity size={14} /> Operational Node Active
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 italic tracking-tight">AasaMedChem Store</h1>
              <p className="text-slate-500 font-medium max-w-md">Browse verified laboratory batches and establish precise procurement protocols.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  type="text" 
                  placeholder="Search chemical designation..." 
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[20px] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowHistory(true)}
                className="px-6 py-4 bg-white border-2 border-slate-100 hover:border-slate-200 rounded-[20px] font-black text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2 transition-all"
              >
                <ClipboardList size={18} /> History
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* 2. PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {filteredProducts.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full"
            >
              <div className="h-48 bg-slate-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest rounded-full">BATCH_VERIFIED</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-full border border-emerald-100">99.9% Purity</span>
                </div>
                <Microscope size={60} className="text-slate-200 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Rate</div>
                  <div className="text-sm font-black text-slate-900 leading-none">{formatINR(p.basePrice)}<span className="text-[10px] text-slate-400">/{p.baseUnit.toLowerCase()}</span></div>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map(starIdx => <Star key={starIdx} size={10} fill="currentColor" />)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">(Lab_Grade)</span>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">{p.name}</h3>
                <p className="text-slate-400 text-xs font-medium mb-6 line-clamp-2">{p.description || 'Verified industrial chemical compound for precise laboratory protocols.'}</p>
                
                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-center py-3 border-y border-slate-50">
                    <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      In-Stock Node
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Avail Capacity</div>
                      <div className="text-xs font-black text-slate-900 italic">{p.stock} <span className="text-[10px] uppercase">{p.baseUnit}</span></div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleOpenOrder(p)}
                    className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-blue-600 active:scale-95 shadow-xl shadow-slate-200 hover:shadow-blue-200"
                  >
                    Initialize Quotation
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. ORDER MODAL (OVERLAY) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[500px] bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 lg:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm"><Microscope size={24} /></div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedProduct.name}</h2>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Batch Protocol Setup</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {message && (
                  <div className={`mb-8 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                  }`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quantity Mass</label>
                      <input 
                        type="number" 
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)}
                        step="0.000001"
                        min="0"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Metric ID</label>
                      <select 
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 appearance-none"
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

                  <div className="p-6 bg-slate-900 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 bg-blue-500 rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
                    <div className="relative z-10">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Net Valuation</div>
                      <div className="text-4xl font-black tracking-tighter mb-4">{formatINR(calculatedPrice.toString())}</div>
                      
                      <button 
                        type="submit" 
                        disabled={loading || !quantity || Number(quantity) <= 0}
                        className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:bg-slate-700 shadow-xl shadow-blue-900/40"
                      >
                        {loading ? 'Executing...' : 'Establish Order'}
                        {!loading && <ChevronRight size={18} />}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. HISTORY SIDE PANEL */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[600px] h-full bg-white shadow-2xl flex flex-col"
            >
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Ledger History</h2>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Personnel Transaction Logs</div>
                </div>
                <button onClick={() => setShowHistory(false)} className="p-3 bg-white hover:bg-slate-100 rounded-2xl shadow-sm transition-colors border border-slate-100 text-slate-400 hover:text-slate-900">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 space-y-6">
                {initialOrders.map(o => (
                  <div key={o.id} className="p-8 rounded-[32px] border border-slate-100 bg-white hover:border-blue-100 transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div className="font-mono text-[10px] font-bold text-slate-300">REF_ID: #{o.id.slice(-8).toUpperCase()}</div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        o.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 
                        o.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 
                        'bg-blue-50 text-blue-600'
                      }`}>{o.status}</span>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-lg font-black text-slate-900 mb-1">{o.items[0]?.product.name}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          {o.items[0]?.displayQuantity} {o.items[0]?.displayUnit}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Total Valuation</div>
                        <div className="text-xl font-black text-slate-900">{formatINR(o.totalAmount)}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {initialOrders.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                    <Clock size={64} className="mb-4" />
                    <div className="text-sm font-black uppercase tracking-[0.3em]">ZERO_RECORDS</div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
