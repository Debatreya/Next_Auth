import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    console.log(request.nextUrl);
    
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup'

    // ? => May or maynot be present
    const token = request.cookies.get('token')?.value || ''

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
// Matching Paths

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
    ]
}