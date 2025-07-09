import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get("authToken")?.value;

  // Helper function to check if user is authenticated
  const isAuthenticated = () => !!authToken;

  // Define route types
  const publicRoutes = ["/welcome"];
  const authRoutes = ["/login", "/signup"]; // Routes that should redirect to workspaces if already logged in
  const protectedRoutes = ["/workspaces"];

  // Check if current path matches any route type
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Root path handling
  if (pathname === "/") {
    if (isAuthenticated()) {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  // Handle protected routes
  if (isProtectedRoute) {
    if (!isAuthenticated()) {
      return NextResponse.redirect(new URL("/welcome", request.url));
    }

    // If accessing /workspaces without a specific workspace ID, let it through
    // The page component will handle workspace selection
    if (pathname === "/workspaces") {
      return NextResponse.next();
    }

    // For specific workspace routes like /workspaces/[workspaceId], also let it through
    // The page component will handle workspace loading and validation
    if (pathname.startsWith("/workspaces/")) {
      return NextResponse.next();
    }
  }

  // Handle auth routes (login, signup)
  if (isAuthRoute) {
    if (isAuthenticated()) {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }
    return NextResponse.next();
  }

  // Handle public routes (welcome page)
  if (isPublicRoute) {
    if (isAuthenticated()) {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }
    return NextResponse.next();
  }

  // Allow all other routes (API routes, static files, etc.)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
