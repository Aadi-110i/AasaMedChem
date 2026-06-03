import { Decimal } from 'decimal.js';

export type UnitType = 'g' | 'kg' | 'mL' | 'L' | 'item';

export const CONVERSIONS: Record<UnitType, { factor: Decimal, base: 'GRAM' | 'MILLILITER' | 'COUNT' }> = {
  'g': { factor: new Decimal(1), base: 'GRAM' },
  'kg': { factor: new Decimal(1000), base: 'GRAM' },
  'mL': { factor: new Decimal(1), base: 'MILLILITER' },
  'L': { factor: new Decimal(1000), base: 'MILLILITER' },
  'item': { factor: new Decimal(1), base: 'COUNT' },
};

export function toBaseQuantity(quantity: number | string | Decimal, unit: UnitType): Decimal {
  const q = new Decimal(quantity);
  const conversion = CONVERSIONS[unit];
  return q.mul(conversion.factor);
}

export function fromBaseQuantity(baseQuantity: number | string | Decimal, unit: UnitType): Decimal {
  const bq = new Decimal(baseQuantity);
  const conversion = CONVERSIONS[unit];
  return bq.div(conversion.factor);
}

export function formatINR(amount: number | string | Decimal): string {
  const a = new Decimal(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(a.toNumber());
}
