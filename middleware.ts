import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Handle legacy /auth route - redirect to /signin
  if (request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // Protect admin routes - check for admin role
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Get the session cookie to check if user is authenticated
    const sessionCookie = request.cookies.get("a_session_console")

    if (!sessionCookie) {
      // No session, redirect to signin
      const signInUrl = new URL("/signin", request.url)
      signInUrl.searchParams.set("redirect", request.nextUrl.pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Note: We can't check the user's role here in middleware since we can't make async calls to Appwrite
    // The role check will be done in the admin layout component
    // This middleware just ensures the user has a session
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
