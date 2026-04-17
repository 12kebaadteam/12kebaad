import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Define protected routes
  const protectedRoutes = [
    '/courses',
    '/colleges',
    '/entrance-tests',
    '/recommendations',
    '/professional-courses',
    '/questions',
    '/update-profile',
    '/college',
    '/course',
    '/professional-course',
    '/entrance-test'
  ]

  // Check if the current path starts with any of the protected routes
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected) {
    // Check for user identity (cookie set during form submission)
    const userId = request.cookies.get('user_id')?.value
    // Also allow if there's a NextAuth session (token or cookie)
    const nextAuthSession = request.cookies.get('next-auth.session-token')?.value || 
                           request.cookies.get('__Secure-next-auth.session-token')?.value

    if (!userId && !nextAuthSession) {
      // Redirect to sign in page (the /form page)
      const url = request.nextUrl.clone()
      url.pathname = '/form'
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
