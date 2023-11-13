import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export function authMiddleware(request: NextRequest) {
    const isAuth = cookies().get("auth");
    const newUrl = isAuth ? "/dashboard" : "/login";
    return NextResponse.rewrite(new URL(newUrl, request.url));
}



