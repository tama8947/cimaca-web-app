import { NextResponse } from 'next/server';
import { getToken, type JWT } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const loginRedirect = (request: NextRequest, session: JWT | null) => {
  if (session?.name !== undefined) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
};

const logoutRedirect = (request: NextRequest, session: JWT | null) => {
  if (request.nextUrl.pathname.includes('icons')) return NextResponse.next();

  if (session?.name === undefined) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  } else NextResponse.next();
};

const thereIsSession = async (request: NextRequest) => {
  const session = await getToken({
    req    : request,
    secret : process.env.NEXTAUTH_SECRET
  });
  return session;
};

const isAuthRoute = (pathName: string) =>
  pathName.includes('/auth/login') ||
  pathName.includes('/auth/forgot-password') ||
  pathName.includes('/auth/reset-password');

export async function middleware (request: NextRequest) {
  const session = await thereIsSession(request);

  const pathName = request.nextUrl.pathname;

  if (pathName === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAuthRoute(pathName)) return loginRedirect(request, session);

  if (!isAuthRoute(pathName)) return logoutRedirect(request, session);

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  matcher: [
    '/',
    '/auth/login',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
