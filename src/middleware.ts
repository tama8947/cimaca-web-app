import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import { getToken, type JWT } from 'next-auth/jwt';
import { i18n } from '@/i18n.config';
import type { NextRequest } from 'next/server';

function getLocale (request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

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

const notAllowedRoutes = ['/'].concat(i18n.locales.map((lang) => `/${lang}`));

export async function middleware (request: NextRequest) {
  const session = await thereIsSession(request);

  const pathName = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
  );

  if (notAllowedRoutes.includes(pathName)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAuthRoute(pathName) && !pathnameIsMissingLocale) return loginRedirect(request, session);

  if (!isAuthRoute(pathName) && !pathnameIsMissingLocale) return logoutRedirect(request, session);

  // return NextResponse.next();
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathName.startsWith('/') ? '' : '/'}${pathName}`,
        request.url
      )
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  matcher: [
    '/',
    '/auth/login',
    '/((?!api|_next/static|_next/image|icons|favicon.ico).*)'
  ]
};
