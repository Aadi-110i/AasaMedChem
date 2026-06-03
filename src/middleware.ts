import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenEdge } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  if (pathname.startsWith('/admin') || pathname.startsWith('/seller')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyTokenEdge(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-based access control
    if (pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/seller', request.url));
    }

    if (pathname.startsWith('/seller') && payload.role !== 'SELLER' && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // If already logged in, redirect away from login/register
  if (pathname === '/login' || pathname === '/register') {
    if (token) {
      const payload = await verifyTokenEdge(token);
      if (payload) {
        return NextResponse.redirect(new URL(payload.role === 'ADMIN' ? '/admin' : '/seller', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/login', '/register'],
};
