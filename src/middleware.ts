import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get("authToken")?.value;

  // If the user is on the root path, redirect to /welcome
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  // Protected routes check (anything under /workspaces)
  if (pathname.startsWith("/workspaces")) {
    // If no auth token, redirect to welcome page
    if (!authToken) {
      return NextResponse.redirect(new URL("/welcome", request.url));
    }
  }

  // Public routes (welcome, login, signup pages)
  if (["/welcome", "/login", "/signup"].includes(pathname)) {
    // If auth token exists, redirect to main app
    if (authToken) {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }
  }

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
