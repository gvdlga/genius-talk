
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('betterauth_token');

  if (!token) {
    return NextResponse.redirect(new URL(process.env.BETTERAUTH_LOGIN_URL!, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api/auth/login|api/auth/callback|_next/static|_next/image|favicon.ico).*)',
};
