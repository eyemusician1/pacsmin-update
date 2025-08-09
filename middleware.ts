import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Handle legacy /auth route - redirect to /signin
  if (request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // Protect admin routes (in a real app, you'd check authentication)
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // For demo purposes, we'll allow access
    // In production, you'd check for valid admin session/token here
    const isAuthenticated = true // Replace with actual auth check

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", request.url))
    }
  }

  // Add security headers
  const response = NextResponse.next()

  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
