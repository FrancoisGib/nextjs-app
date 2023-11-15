import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export function authMiddleware(request: NextRequest) {
    const isAuth = cookies().has("auth");
    const path = request.nextUrl.pathname;
    if (!isAuth) {
        const {agree} = config.isNotAuth;
        if (!agree.includes(path))
            return {redirect: true, request: NextResponse.redirect(new URL("/login", request.url))}
        else
            return {redirect: false, request: request}
    }
    else {
        const {except} = config.isAuth;
        if (except.includes(path))
            return {redirect: true, request: NextResponse.redirect(new URL("/", request.url))}
        else
            return {redirect: false, request: request}
    }
}

const config = {
    isAuth: {
        except: ["/login", "/sign-up"]
    },
    isNotAuth: {
        agree: ["/login", "/sign-up", "/test"],
    }
}