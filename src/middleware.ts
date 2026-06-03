import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenEdge } from './lib/auth';

function getDashboardPath(role: string): string {
  if (role === 'ADMIN') return '/admin';
  if (role === 'SELLER') return '/seller';
  return '/buyer';
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  if (pathname.startsWith('/admin') || pathname.startsWith('/seller') || pathname.startsWith('/buyer')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyTokenEdge(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-based access control
    if (pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
    }

    if (pathname.startsWith('/seller') && payload.role !== 'SELLER' && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
    }

    if (pathname.startsWith('/buyer') && payload.role !== 'BUYER') {
      return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
    }
  }

  // If already logged in, redirect away from login/register
  if (pathname === '/login' || pathname === '/register') {
    if (token) {
      const payload = await verifyTokenEdge(token);
      if (payload) {
        return NextResponse.redirect(new URL(getDashboardPath(payload.role), request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/buyer/:path*', '/login', '/register'],
};
