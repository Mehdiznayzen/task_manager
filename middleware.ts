import {
    clerkMiddleware,
    createRouteMatcher,
    redirectToSignIn,
    ClerkMiddlewareAuthObject,
} from '@clerk/nextjs/server';

// Définir les routes protégées
const isProtectedRoute = createRouteMatcher([
    '/tasks(.*)',
]);

// Middleware Clerk
export default clerkMiddleware((auth: () => ClerkMiddlewareAuthObject, req) => {
    if (isProtectedRoute(req)) {
        const user = auth();
        if (!user) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};