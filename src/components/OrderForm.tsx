'use client';

import { useState, useMemo } from 'react';
import { placeOrder } from '@/app/actions/orders';
import { UnitType, formatINR, toBaseQuantity } from '@/lib/units';
import { Decimal } from 'decimal.js';
import { ChevronRight, Cpu, Target } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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
    setLoading(true);
    setMessage(null);
    
    const res = await placeOrder(selectedProductId, quantity, unit);
    if (res.error) {
      setMessage({ type: 'error', text: res.error });
    } else {
      setMessage({ type: 'success', text: 'PROTOCOL_EXECUTED: ORDER_STAGED' });
      setQuantity('1');
    }
    setLoading(false);
  };

  if (products.length === 0) return <div className="mono" style={{ color: 'var(--text-dim)' }}>SYSTEM_ERR: NO_INVENTORY_DETECTED</div>;

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-6" style={{ background: 'rgba(255,255,255,0.01)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', opacity: 0.2 }}>
        <Cpu size={64} style={{ color: 'var(--accent-cyan)' }} />
      </div>

      <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
        <Target size={18} style={{ color: 'var(--accent-cyan)' }} />
        <h3 className="mono" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Quotation_Input_Matrix</h3>
      </div>
      
      {message && (
        <div className={`mono badge badge-${message.type === 'success' ? 'approved' : 'pending'}`} 
             style={{ width: '100%', textAlign: 'center', padding: '0.75rem', borderRadius: '0.5rem' }}>
          {message.text}
        </div>
      )}

      <div>
        <label className="label">Target_Subject</label>
        <select 
          className="input" 
          value={selectedProductId} 
          onChange={(e) => handleProductChange(e.target.value)}
          required
          style={{ width: '100%' }}
        >
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name} (AVAIL: {p.stock.toString()})</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <div style={{ flex: 2 }}>
          <label className="label">Quantity_Mass</label>
          <input 
            type="number" 
            className="input" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)}
            step="0.00000001"
            min="0"
            required 
            placeholder="0.00"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="label">Metric_ID</label>
          <select 
            className="input" 
            value={unit} 
            onChange={(e) => setUnit(e.target.value as UnitType)}
            required
          >
            {availableUnits.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0, 245, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <div className="flex justify-between items-center">
          <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>ESTIMATED_VALUATION</span>
          <div className="mono" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
            {formatINR(calculatedPrice.toString())}
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading || !quantity || Number(quantity) <= 0}>
          {loading ? 'PROCESSING_LOGIC...' : 'Execute_Order'}
          {!loading && <ChevronRight size={16} />}
        </button>
      </div>
    </form>
  );
}
