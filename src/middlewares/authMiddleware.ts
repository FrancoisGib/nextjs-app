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
    const token = cookies().get("token")?.value;
    let isAuth = false;
    let id = "";
    if (token)
        isAuth = true;
    const authConfig = isAuth ? config.isAuth : config.isNotAuth;
    const path = request.nextUrl.pathname;
    if (!path.match(authConfig.agree) || path.match(authConfig.except)) {
        return {redirect: true, request: NextResponse.redirect(new URL(`${authConfig.redirect}/${id}`, request.url))};
    }
    return {redirect: false, request: request};
}

const config = {
    isAuth: {
        agree: "/[a-z]*[0-9]*/?",
        except: "\/(login|sign-up)",
        redirect: "/dashboard"
    },
    isNotAuth: {
        agree: "\/((login|sign-up)|post\/[0-9]+)?",
        except: "\/dashboard",
        redirect: "/login"
    }
}