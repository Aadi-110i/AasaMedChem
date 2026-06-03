import { Decimal } from 'decimal.js';

export type UnitType = 'g' | 'kg' | 'mL' | 'L' | 'item';

export const CONVERSIONS: Record<UnitType, { factor: Decimal, base: 'GRAM' | 'MILLILITER' | 'COUNT' }> = {
  'g': { factor: new Decimal(1), base: 'GRAM' },
  'kg': { factor: new Decimal(1000), base: 'GRAM' },
  'mL': { factor: new Decimal(1), base: 'MILLILITER' },
  'L': { factor: new Decimal(1000), base: 'MILLILITER' },
  'item': { factor: new Decimal(1), base: 'COUNT' },
};

// Unit labels for display
export const UNIT_LABELS: Record<UnitType, string> = {
  'g': 'grams',
  'kg': 'kilograms',
  'mL': 'milliliters',
  'L': 'liters',
  'item': 'items',
};

// Get the base unit label
export const BASE_UNIT_LABELS: Record<string, string> = {
  'GRAM': 'g',
  'MILLILITER': 'mL',
  'COUNT': 'item',
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

// Get price per display unit (6 decimal places)
export function pricePerUnit(basePricePerBaseUnit: number | string | Decimal, displayUnit: UnitType): Decimal {
  const bp = new Decimal(basePricePerBaseUnit);
  const conversion = CONVERSIONS[displayUnit];
  // price per display unit = base price × factor
  // e.g. base price ₹0.18/g → price per kg = 0.18 × 1000 = ₹180
  return bp.mul(conversion.factor);
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

// Format with 6 decimal precision for conversion display
export function formatPrecise(amount: number | string | Decimal): string {
  const a = new Decimal(amount);
  return a.toFixed(6);
}

export function formatINRPrecise(amount: number | string | Decimal): string {
  const a = new Decimal(amount);
  return `₹${a.toFixed(6)}`;
}

// Get compatible units for a base unit
export function getCompatibleUnits(baseUnit: string): UnitType[] {
  if (baseUnit === 'GRAM') return ['g', 'kg'];
  if (baseUnit === 'MILLILITER') return ['mL', 'L'];
  return ['item'];
}
