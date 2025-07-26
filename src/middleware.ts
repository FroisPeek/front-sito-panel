import { NextRequest, NextResponse } from 'next/server';
import routers from './constants/routes.config';
import ValidateToken from './services/validate.token';

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicRoute = routers.find(route => route.path === path);
    const authToken = request.cookies.get("accessToken")

    if (!authToken && !publicRoute?.isPublic) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        console.log("Não autenticado")
        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated == "redirect") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/home";

        return NextResponse.redirect(redirectUrl);
    }

    const isValid = await ValidateToken({ token: authToken });
    if (authToken && !isValid) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        console.log("Token inválido")
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}