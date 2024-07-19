import { NextResponse } from 'next/server'
 
export function middleware(request) {
  const path = request.nextUrl.pathname
  const type = request.cookies.get('type')?.value

  // For buyer
  if (type === 'buyer') {
    const isPublicPath = path === '/login' || path === '/register' || path === '/verify-email'
    const accessToken = request.cookies.get('accessToken')?.value
    
    if (isPublicPath && accessToken) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // For seller
  if (type === 'seller') {
    const isPublicPath = path === '/seller/login' || path === '/seller/register' || path === '/seller/verify-email'
    const accessToken = request.cookies.get('accessToken')?.value
    
    if (isPublicPath && accessToken) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}
 
export const config = {
  matcher: ['/login', '/register', '/verify-email', '/seller/login', '/seller/register', '/seller/verify-email']
}