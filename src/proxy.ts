import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected and auth routes
const protectedRoutes = ["/dashboard", "/profile", "/settings", "/admin", "/quotes"];
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and images
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Check if current route is protected or auth
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  // Check for Better Auth session cookie
  // Better Auth uses 'better-auth.session_token' by default
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  // 1. Unauthenticated user trying to access protected route -> Redirect to login
  if (isProtectedRoute && !sessionToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // 2. Authenticated user trying to access auth route (login/signup) -> Redirect to dashboard
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
