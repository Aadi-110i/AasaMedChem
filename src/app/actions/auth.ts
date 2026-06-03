'use server';

import { prisma } from '@/lib/prisma';
import { setAuthCookie, signToken, removeAuthCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

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
    role: user.role as 'ADMIN' | 'SELLER',
  });

  await setAuthCookie(token);
  
  if (user.role === 'ADMIN') {
    redirect('/admin');
  } else {
    redirect('/seller');
  }
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string || 'SELLER';

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
    role: user.role as 'ADMIN' | 'SELLER',
  });

  await setAuthCookie(token);

  if (user.role === 'ADMIN') {
    redirect('/admin');
  } else {
    redirect('/seller');
  }
}

export async function logout() {
  await removeAuthCookie();
  redirect('/login');
}
