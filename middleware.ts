import {NextRequest, NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl

    // Protect dashboard routes
    if (pathname.startsWith('/dashboard')) {
        // Add your authentication logic here
        // For now, we'll allow all requests
        // In production, check for valid session/JWT
        return NextResponse.next()
    }

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
        // Add your admin authentication logic here
        // Check if user has admin role
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*']
}
