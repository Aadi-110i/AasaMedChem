import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import BuyerClient from '@/components/BuyerClient';
import { redirect } from 'next/navigation';

export default async function BuyerDashboard() {
  const auth = await getAuth();

  if (!auth) {
    redirect('/login');
  }
  
  if (auth.role !== 'BUYER' && auth.role !== 'ADMIN') {
    redirect('/');
  }

  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
  });

  const orders = await prisma.order.findMany({
    where: { userId: auth.userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  // Simple serializable objects for client component
  const serializedProducts = products.map(p => ({
    ...p,
    basePrice: p.basePrice.toString(),
    stock: p.stock.toString(),
  }));

  const serializedOrders = orders.map(o => ({
    ...o,
    totalAmount: o.totalAmount.toString(),
    items: o.items.map(item => ({
      ...item,
      displayQuantity: item.displayQuantity.toString(),
      product: { name: item.product.name }
    }))
  }));

  return <BuyerClient products={serializedProducts as any} initialOrders={serializedOrders as any} />;
}
