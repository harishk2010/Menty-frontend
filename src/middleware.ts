import { NextRequest, NextResponse } from "next/server";
import { tokenVerify } from "./lib/security/tokenVerify";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {

    // const url = req.nextUrl.clone();
    const url = new URL(req.url); // ✅ Correct way to modify URLs

    // console.log(req.cookies.get('accessToken'))
    
    if (
        req.nextUrl.pathname.startsWith("/_next/") || // Static files
        /\.(.*)$/.test(req.nextUrl.pathname)         // File extensions
    ) {
        // console.log('mw', req.nextUrl);

        return NextResponse.next();
    }

    // Verify token and get user role
    const role = await tokenVerify("accessToken", req);
    // console.log('Role:', role);

 
        const adminPublicRoutes=['/admin/login']
        const adminProctectedRoutes=['/admin/dashboard','/admin/users','/admin/instructors','/admin/verifyInstructors','/admin/addMentorshipPlans','/admin/verifyInstructors/']
 
    const studentPublicRoutes = ['/login', '/signup','/forgot-password','/'];
    const studentProtectedRoutes = ['/home', '/profile','/editProfile','changePassword'];
    const instructorProtectedRoutes = ['/instructor/dashboard','/instructor/users', '/instructor/courses','/instructor/profile','/instructor/editProfile','/instructor/verification'];
    const instructorPublicRoutes = ['/instructor/login', '/instructor/signup',"/instructor/forgot-password"];
    console.log(req.nextUrl.pathname)

    if (studentPublicRoutes.includes(req.nextUrl.pathname)) {
      
        if (role === 'instructor' ) {
            url.pathname = '/instructor/dashboard';
            return NextResponse.redirect(url);
        }
    }
    if (adminPublicRoutes.includes(req.nextUrl.pathname)) {
      
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
    if (instructorPublicRoutes.includes(req.nextUrl.pathname)) {
      
        if (role === 'student') {
            url.pathname = '/home';
            return NextResponse.redirect(url);
        }
    }
    if (adminPublicRoutes.includes(req.nextUrl.pathname)) {
      
        if (role === 'student') {
            url.pathname = '/home';
            return NextResponse.redirect(url);
        }
    }
    if (studentProtectedRoutes.includes(req.nextUrl.pathname)) {

        if (role !== 'student') {
            url.pathname = '/login'; 
            return NextResponse.redirect(url);
        }
    }

    if (studentPublicRoutes.includes(req.nextUrl.pathname)) {
       
        if (role === 'student') {
            url.pathname = '/home'; 
            return NextResponse.redirect(url);
        }
    }
    if(studentProtectedRoutes.includes(req.nextUrl.pathname)){
        if (role === 'admin') {
            url.pathname = '/admin/dashboard'; 
            return NextResponse.redirect(url);
        }
    }
    if(instructorProtectedRoutes.includes(req.nextUrl.pathname)){
        if (role === 'admin') {
            url.pathname = '/admin/dashboard'; 
            return NextResponse.redirect(url);
        }
    }
    if(studentPublicRoutes.includes(req.nextUrl.pathname)){
        if (role === 'admin') {
            url.pathname = '/admin/dashboard'; 
            return NextResponse.redirect(url);
        }
    }
    if(instructorPublicRoutes.includes(req.nextUrl.pathname)){
        if (role === 'admin') {
            url.pathname = '/admin/dashboard'; 
            return NextResponse.redirect(url);
        }
    }
    if (adminProctectedRoutes.includes(req.nextUrl.pathname)) {

        if (role !== 'admin') {
            url.pathname = '/admin/login'; 
            return NextResponse.redirect(url);
        }
    }

    if (adminPublicRoutes.includes(req.nextUrl.pathname)) {
       
        if (role === 'admin') {
            url.pathname = '/admin/dashboard'; 
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
   
    
}

export const config = {
    matcher: [
        "/admin/:path*",       // Admin routes
        "/:path*",        // Student routes
        "/instructor/:path*",  // Instructor routes
    ],
};
