import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function authMiddleware(request: NextRequest) {
    const token = cookies().get("token")?.value;
    let isAuth = token !== undefined;
    const authConfig = isAuth ? config.isAuth : config.isNotAuth;
    const path = request.nextUrl.pathname;
    if (!path.match(authConfig.agree)) {
        return {redirect: true, request: NextResponse.redirect(new URL(`${authConfig.redirect}`, request.url))};
    }
    return {redirect: false, request: request};
}

const config = {
    isAuth: {
        agree: "/[a-z]*[0-9]*/?",
        except: "\/(login|sign-up)",
        redirect: "/"
    },
    isNotAuth: {
        agree: "\/((login|sign-up)|post\/[0-9]+|profile\/[a-zA-Z]+)?$",
        except: "",
        redirect: "/login"
    }
}
