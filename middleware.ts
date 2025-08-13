import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Handle legacy /auth route - redirect to /signin
  if (request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // For admin routes, we'll let the AdminGuard handle all authentication
  // The middleware will only handle basic security headers

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
