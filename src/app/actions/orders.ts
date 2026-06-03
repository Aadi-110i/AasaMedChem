'use server';

import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { Decimal } from 'decimal.js';
import { toBaseQuantity, UnitType } from '@/lib/units';

export async function placeOrder(productId: string, quantity: string, unit: UnitType) {
  const auth = await getAuth();
  if (!auth) {
    return { error: 'Unauthorized' };
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return { error: 'Product not found' };
  }

  const baseQuantity = toBaseQuantity(quantity, unit);
  
  if (product.stock.lt(baseQuantity)) {
    return { error: 'Insufficient stock' };
  }

  const totalPrice = product.basePrice.mul(baseQuantity);

  try {
    await prisma.$transaction(async (tx) => {
      // Update stock
      await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: baseQuantity } },
      });

      // Create order
      await tx.order.create({
        data: {
          userId: auth.userId,
          totalAmount: totalPrice,
          items: {
            create: {
              productId,
              displayQuantity: new Decimal(quantity),
              displayUnit: unit,
              baseQuantity,
              unitPrice: product.basePrice,
              subtotal: totalPrice,
            },
          },
        },
      });
    });

    revalidatePath('/seller');
    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { error: 'Failed to place order' };
  }
}

export async function updateOrderStatus(orderId: string, newStatus: 'PENDING' | 'APPROVED' | 'FULFILLED') {
  const auth = await getAuth();
  if (!auth || auth.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    revalidatePath('/admin');
    revalidatePath('/seller');
    return { success: true };
  } catch {
    return { error: 'Failed to update order status' };
  }
}
