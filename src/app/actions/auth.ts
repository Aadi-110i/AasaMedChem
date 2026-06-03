'use server';

import { prisma } from '@/lib/prisma';
import { setAuthCookie, signToken, removeAuthCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

function getDashboardPath(role: string): string {
  if (role === 'ADMIN') return '/admin';
  if (role === 'SELLER') return '/seller';
  return '/buyer';
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: 'Invalid credentials' };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return { error: 'Invalid credentials' };
  }

  const token = await signToken({
    userId: user.id,
    email: user.email,
    role: user.role as 'ADMIN' | 'SELLER' | 'BUYER',
  });

  await setAuthCookie(token);
  redirect(getDashboardPath(user.role));
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string || 'BUYER';

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: 'User already exists' };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: role as Role,
    },
  });

  const token = await signToken({
    userId: user.id,
    email: user.email,
    role: user.role as 'ADMIN' | 'SELLER' | 'BUYER',
  });

  await setAuthCookie(token);
  redirect(getDashboardPath(user.role));
}

export async function logout() {
  await removeAuthCookie();
  redirect('/login');
}
