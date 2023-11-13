import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from './middlewares/authMiddleware'
 
export function middleware(request: NextRequest) {
    let i = 0;
    while (i < middlewares.length) {
        const middleware = middlewares[i];
        if (request.nextUrl.pathname === middleware.config) {
            return middleware.middleware(request);
        }
        i++;
    }    
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

type Middleware = {
    middleware: (request: NextRequest) => NextResponse<unknown>,
    config: string
}

const middlewares: Middleware[] = [
    {
        middleware: authMiddleware,
        config: "/"
    }
];
