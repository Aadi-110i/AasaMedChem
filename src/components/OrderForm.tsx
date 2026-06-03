'use client';

import { useState, useMemo } from 'react';
import { placeOrder } from '@/app/actions/orders';
import { UnitType, formatINR, toBaseQuantity } from '@/lib/units';
import { Decimal } from 'decimal.js';

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
      setMessage({ type: 'success', text: 'Order placed successfully!' });
      setQuantity('1');
    }
    setLoading(false);
  };

  if (products.length === 0) return <p>No products available.</p>;

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-4">
      <h3 style={{ marginBottom: '0.5rem' }}>Place New Quotation</h3>
      
      {message && (
        <div className={`badge badge-${message.type === 'success' ? 'approved' : 'pending'}`} 
             style={{ width: '100%', textAlign: 'center', marginBottom: '1rem', padding: '0.5rem' }}>
          {message.text}
        </div>
      )}

      <div>
        <label className="label">Select Product</label>
        <select 
          className="input" 
          value={selectedProductId} 
          onChange={(e) => handleProductChange(e.target.value)}
          required
        >
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock.toString()})</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <div style={{ flex: 2 }}>
          <label className="label">Quantity</label>
          <input 
            type="number" 
            className="input" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)}
            step="0.00000001"
            min="0"
            required 
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className="label">Unit</label>
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

      <div className="flex justify-between items-center" style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius)' }}>
        <div>
          <span className="label" style={{ marginBottom: 0 }}>Estimated Total</span>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>
            {formatINR(calculatedPrice.toString())}
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || !quantity || Number(quantity) <= 0}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
}
