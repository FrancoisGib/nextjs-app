import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
/*export function authMiddleware(request: NextRequest) {
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
}*/


export function authMiddleware(request: NextRequest) {
    const isAuth = cookies().has("auth");
    const authConfig = isAuth ? config.isAuth : config.isNotAuth;
    const path = request.nextUrl.pathname;
    if (!path.match(authConfig.agree) || path.match(authConfig.except)) {
        return {redirect: true, request: NextResponse.redirect(new URL(authConfig.redirect, request.url))};
    }
    return {redirect: false, request: request};
}

const config = {
    isAuth: {
        agree: "/[a-z]*/?",
        except: "(\/login|\/sign-up)$",
        redirect: "/"
    },
    isNotAuth: {
        agree: "(\/login|\/sign-up)$",
        except: "\/dashboard",
        redirect: "/login"
    }
}