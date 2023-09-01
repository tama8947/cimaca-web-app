import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT, getToken } from "next-auth/jwt";

const loginRedirect = (request: NextRequest, session: JWT | null) => {
  if (session?.name)
    return NextResponse.redirect(new URL("/dashboard", request.url));
};

const logoutRedirect = (request: NextRequest, session: JWT | null) => {
  if (Boolean(!session?.name))
    return NextResponse.redirect(new URL("/auth/login", request.url));
  else NextResponse.next()
};

const thereIsSession = async (request: NextRequest) => {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return session;
};

const excludedRoutes = (pathName: string) =>
  !pathName.includes("/auth/login") && !pathName.includes("create_recovery_token")

export async function middleware(request: NextRequest) {
  const session = await thereIsSession(request);
  const pathName = request.nextUrl.pathname;   
  if (pathName == "/")
    return NextResponse.redirect(new URL("/auth/login", request.url));
  if (pathName.includes("/auth/login")) return loginRedirect(request, session);
  if (excludedRoutes(pathName)) return logoutRedirect(request, session);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  matcher: ["/", "/auth/login", '/((?!api|_next/static|_next/image|favicon.ico).*)',],
};
