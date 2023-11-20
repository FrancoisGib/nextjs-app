import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from './middlewares/authMiddleware'
 
export function middleware(request: NextRequest) {
    let i = 0;
    while (i < middlewares.length) {
        const res = middlewares[i](request);
        if (res.redirect)
            return res.request;
        i++;
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}

type Middleware = (request: NextRequest) => {redirect: boolean, request: NextRequest | NextResponse<unknown>}
    

const middlewares: Middleware[] = [
    authMiddleware
];
