import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware({ url, nextUrl, cookies }: NextRequest) {
  const { pathname } = nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  )
    return NextResponse.next();

  const jwt = cookies.get('jwt');

  if (pathname.startsWith('/auth')) {
    if (jwt) return NextResponse.redirect(new URL('/', url));
  } else {
    if (!jwt) return NextResponse.redirect(new URL('/auth/login', url));
  }

  return NextResponse.next();
}
