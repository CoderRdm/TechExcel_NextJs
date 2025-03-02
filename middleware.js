import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // Allow public access to API routes and login/signup pages
  publicRoutes: ["/api(.*)", "/Login", "/SigUup"],
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Protect non-static routes
    '/', 
    '/(trpc)(.*)', // Protect TRPC routes (if used)
  ],
};