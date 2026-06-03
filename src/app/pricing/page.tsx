'use client';

import { useState } from 'react';
import { Calculator, Zap, Database, ArrowRight } from 'lucide-react';
import { UnitType, CONVERSIONS, pricePerUnit, formatINRPrecise, getCompatibleUnits } from '@/lib/units';
import Link from 'next/link';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Sodium Chloride (High Purity)', basePrice: '0.18', baseUnit: 'GRAM' },
  { id: '2', name: 'Ethanol 95% (Lab Grade)', basePrice: '0.45', baseUnit: 'MILLILITER' },
  { id: '3', name: 'Magnesium Sulfate', basePrice: '0.22', baseUnit: 'GRAM' },
];

export default function PricingPage() {
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCTS[0]);
  const [quantity, setQuantity] = useState('1');
  const [displayUnit, setDisplayUnit] = useState<UnitType>('kg');

  // Ensure selected unit is compatible when product changes
  const compatibleUnits = getCompatibleUnits(selectedProduct.baseUnit);
  if (!compatibleUnits.includes(displayUnit)) {
    setDisplayUnit(compatibleUnits[0]);
  }

  // Live calculation
  const q = parseFloat(quantity) || 0;
  let unitPriceStr = '0.000000';
  let totalStr = '0.000000';

  try {
    const unitPrice = pricePerUnit(selectedProduct.basePrice, displayUnit);
    unitPriceStr = formatINRPrecise(unitPrice);
    totalStr = formatINRPrecise(unitPrice.mul(q));
  } catch (e) {
    // Math error fallback
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 p-32 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-500/20">
            <Calculator size={14} /> 6-Decimal Precision
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Interactive Quotation Engine</h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Experience our zero-rounding-error architecture. Switch units dynamically and see exact financial calculations in real-time.
          </p>
        </div>
      </div>

      {/* Interactive Calculator Section */}
      <div className="container mx-auto px-6 -mt-20 relative z-20 pb-32">
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Select Target Compound</label>
                <div className="grid gap-3">
                  {MOCK_PRODUCTS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`text-left px-5 py-4 rounded-2xl border transition-all ${
                        selectedProduct.id === p.id 
                          ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-500/10' 
                          : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className={`font-bold ${selectedProduct.id === p.id ? 'text-blue-700' : 'text-slate-900'}`}>{p.name}</div>
                      <div className="text-xs font-medium text-slate-500 mt-1">Base: {formatINRPrecise(p.basePrice)} / {p.baseUnit.toLowerCase()}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Volume / Mass Requirement</label>
                <div className="flex gap-3">
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="0.1" step="0.1"
                    className="flex-1 px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-slate-900 text-lg" 
                  />
                  <select 
                    value={displayUnit}
                    onChange={(e) => setDisplayUnit(e.target.value as UnitType)}
                    className="w-32 px-5 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 appearance-none text-center cursor-pointer"
                  >
                    {compatibleUnits.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Output */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-16 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Calculated Unit Price</div>
                    <div className="font-mono text-xl text-emerald-400">{unitPriceStr} <span className="text-slate-500 text-sm">/ {displayUnit}</span></div>
                  </div>
                  <Database className="text-slate-600" size={24} />
                </div>

                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80 mb-2 flex items-center gap-2">
                    <Zap size={12} className="text-emerald-400" /> Exact Final Output
                  </div>
                  <div className="text-4xl md:text-5xl font-black font-mono tracking-tight text-white mb-2" style={{ textShadow: '0 4px 20px rgba(16, 185, 129, 0.4)' }}>
                    {totalStr}
                  </div>
                  <div className="text-xs font-medium text-slate-400">Guaranteed to 6 decimal places. No floating-point errors.</div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <Link href="/register" className="inline-flex items-center justify-center gap-2 w-full py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-black transition-colors group">
                    Create Terminal ID <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
