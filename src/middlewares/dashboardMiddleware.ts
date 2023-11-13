import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export function authMiddleware(request: NextRequest) {
    const isAuth = cookies().get("auth");
    let newUrl: string;
    if (isAuth)
        newUrl = "/dashboard";
    else
        newUrl = "/login";
    return NextResponse.rewrite(new URL(newUrl, request.nextUrl));
}

export const config = {
    matcher: '/',
}
