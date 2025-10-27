import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './libs/utils/session';

// 1. Specify public routes
const authRoutes = ['/login', '/register'];
const publicRoutes = ['/', '/product'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(path);
  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );

  // 3. Get the session from the cookie
  const session = await getSession();

  // 4. Redirect to /login if the user is not authenticated
  if (!isPublicRoute && !isAuthRoute && !session.isLogin) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 5. Redirect to / if the user is authenticated
  if (isAuthRoute && session.isLogin) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|media|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)'],
};
