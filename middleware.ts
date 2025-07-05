import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  '/:slug'
]);

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/dashboard(.*)'
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // First check if it's a protected route (override slug pattern)
  if (isProtectedRoute(req)) {
    // Check authentication for protected routes
    const session = await auth();

    // If not authenticated, redirect to sign-in
    if (!session.userId) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // If it's an admin route, check for admin role
    if (isAdminRoute(req)) {
      if (session.orgRole !== 'admin') {
        const dashboardUrl = new URL('/dashboard', req.url);
        return NextResponse.redirect(dashboardUrl);
      }
    }
  }
  // If the route is public, allow access
  else if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  // Any other routes not explicitly public require authentication
  else {
    const session = await auth();
    if (!session.userId) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow access to the route
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
