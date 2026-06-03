'use server';

import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createSellerRequest(formData: FormData) {
  const auth = await getAuth();
  if (!auth || auth.role !== 'SELLER') {
    return { error: 'Unauthorized. Only sellers can submit requests.' };
  }

  const chemicalName = formData.get('chemicalName') as string;
  const description = formData.get('description') as string;
  const quantity = formData.get('quantity') as string;
  const unit = formData.get('unit') as string;

  if (!chemicalName) {
    return { error: 'Chemical name is required' };
  }

  try {
    await prisma.sellerRequest.create({
      data: {
        userId: auth.userId,
        chemicalName,
        description,
        quantity,
        unit,
        status: 'PENDING',
      },
    });

    revalidatePath('/seller');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to create request:', error);
    return { error: 'Failed to submit request' };
  }
}

export async function updateRequestStatus(id: string, status: 'APPROVED' | 'REJECTED') {
  const auth = await getAuth();
  if (!auth || auth.role !== 'ADMIN') {
    return { error: 'Unauthorized. Only admins can update status.' };
  }

  try {
    await prisma.sellerRequest.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/admin');
    revalidatePath('/seller');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update status' };
  }
}
