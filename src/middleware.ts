import { NextRequest, NextResponse } from "next/server";
import { tokenVerify } from "./lib/security/tokenVerify";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {

    const url = req.nextUrl.clone();
    console.log(req.cookies.get('accessToken'))
    
    if (
        req.nextUrl.pathname.startsWith("/_next/") || // Static files
        /\.(.*)$/.test(req.nextUrl.pathname)         // File extensions
    ) {
        return NextResponse.next();
    }

    // Verify token and get user role
    const role = await tokenVerify("accessToken", req);
    console.log('Role:', role);

 
 
    const studentPublicRoutes = ['/login', '/signup'];
    const instructorProtectedRoutes = ['/instructor/dashboard', '/instructor/courses'];
    const instructorPublicRoutes = ['/instructor/login', '/instructor/signup'];
    console.log(req.nextUrl.pathname)

    if (studentPublicRoutes.includes(req.nextUrl.pathname)) {
      
        if (role === 'instructor') {
            url.pathname = '/instructor/dashboard';
            return NextResponse.redirect(url);
        }
    }
    if (instructorProtectedRoutes.includes(req.nextUrl.pathname)) {

        if (role !== 'instructor') {
            url.pathname = '/instructor/login'; 
            return NextResponse.redirect(url);
        }
    }

    if (instructorPublicRoutes.includes(req.nextUrl.pathname)) {
       
        if (role === 'instructor') {
            url.pathname = '/instructor/dashboard'; 
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        // "/admin/:path*",       // Admin routes
        "/:path*",        // Student routes
        "/instructor/:path*",  // Instructor routes
    ],
};
