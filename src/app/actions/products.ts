'use server';

import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { Decimal } from 'decimal.js';

export async function createProduct(formData: FormData) {
  const auth = await getAuth();
  if (!auth || auth.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const baseUnit = formData.get('baseUnit') as 'GRAM' | 'MILLILITER' | 'COUNT';
  const basePrice = formData.get('basePrice') as string;
  const stock = formData.get('stock') as string;

  if (!name || !baseUnit || !basePrice || !stock) {
    return { error: 'Missing required fields' };
  }

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        baseUnit,
        basePrice: new Decimal(basePrice),
        stock: new Decimal(stock),
      },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { error: 'Failed to create product' };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const auth = await getAuth();
  if (!auth || auth.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const basePrice = formData.get('basePrice') as string;
  const stock = formData.get('stock') as string;

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        basePrice: basePrice ? new Decimal(basePrice) : undefined,
        stock: stock ? new Decimal(stock) : undefined,
      },
    });
    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { error: 'Failed to update product' };
  }
}

export async function deleteProduct(id: string) {
  const auth = await getAuth();
  if (!auth || auth.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { error: 'Failed to delete product' };
  }
}
