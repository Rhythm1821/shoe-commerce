import { NextResponse } from 'next/server'
 
export function middleware(request) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/register' || path === '/verify-email'
  const accessToken = request.cookies.get('accessToken')?.value
  
  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
 
export const config = {
  matcher: ['/login', '/register', '/verify-email']
}