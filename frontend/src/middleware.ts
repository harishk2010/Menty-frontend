// import { NextRequest, NextResponse } from "next/server";
// import { tokenVerify } from "./lib/security/tokenVerify";
// import { cookies } from "next/headers";

// export async function middleware(req: NextRequest) {

//     // const url = req.nextUrl.clone();
//     const url = new URL(req.url); // ✅ Correct way to modify URLs

//     // console.log(req.cookies.get('accessToken'))

//     if (
//         req.nextUrl.pathname.startsWith("/_next/") || // Static files
//         /\.(.*)$/.test(req.nextUrl.pathname)         // File extensions
//     ) {
//         // console.log('mw', req.nextUrl);

//         return NextResponse.next();
//     }

//     // Verify token and get user role
//     const role = await tokenVerify("accessToken", req);
//     // console.log('Role:', role);

//         const adminPublicRoutes=['/admin/login']
//         const adminProctectedRoutes=['/admin/dashboard','/admin/users','/admin/instructors','/admin/verifyInstructors','/admin/addMentorshipPlans','/admin/verifyInstructors/']

//     const studentPublicRoutes = ['/login', '/signup','/forgot-password','/'];
//     const studentProtectedRoutes = ['/home', '/profile','/editProfile','changePassword','/myCourses','/paymentFailure','/paymentSuccess'];
//     const instructorProtectedRoutes = ['/instructor/dashboard','/instructor/users', '/instructor/courses','/instructor/profile','/instructor/editProfile','/instructor/verification'];
//     const instructorPublicRoutes = ['/instructor/login', '/instructor/signup',"/instructor/forgot-password"];
//     console.log(req.nextUrl.pathname)

//     if (studentPublicRoutes.includes(req.nextUrl.pathname)) {

//         if (role === 'instructor' ) {
//             url.pathname = '/instructor/dashboard';
//             return NextResponse.redirect(url);
//         }
//     }
//     if (adminPublicRoutes.includes(req.nextUrl.pathname)) {

//         if (role === 'instructor') {
//             url.pathname = '/instructor/dashboard';
//             return NextResponse.redirect(url);
//         }
//     }
//     if (instructorProtectedRoutes.includes(req.nextUrl.pathname)) {

//         if (role !== 'instructor') {
//             url.pathname = '/instructor/login';
//             return NextResponse.redirect(url);
//         }
//     }

//     if (instructorPublicRoutes.includes(req.nextUrl.pathname)) {

//         if (role === 'instructor') {
//             url.pathname = '/instructor/dashboard';
//             return NextResponse.redirect(url);
//         }
//     }
//     if (instructorPublicRoutes.includes(req.nextUrl.pathname)) {

//         if (role === 'student') {
//             url.pathname = '/home';
//             return NextResponse.redirect(url);
//         }
//     }
//     if (adminPublicRoutes.includes(req.nextUrl.pathname)) {

//         if (role === 'student') {
//             url.pathname = '/home';
//             return NextResponse.redirect(url);
//         }
//     }
//     if (studentProtectedRoutes.includes(req.nextUrl.pathname)) {

//         if (role !== 'student') {
//             url.pathname = '/login';
//             return NextResponse.redirect(url);
//         }
//     }

//     if (studentPublicRoutes.includes(req.nextUrl.pathname)) {

//         if (role === 'student') {
//             url.pathname = '/home';
//             return NextResponse.redirect(url);
//         }
//     }
//     if(studentProtectedRoutes.includes(req.nextUrl.pathname)){
//         if (role === 'admin') {
//             url.pathname = '/admin/dashboard';
//             return NextResponse.redirect(url);
//         }
//     }
//     if(instructorProtectedRoutes.includes(req.nextUrl.pathname)){
//         if (role === 'admin') {
//             url.pathname = '/admin/dashboard';
//             return NextResponse.redirect(url);
//         }
//     }
//     if(studentPublicRoutes.includes(req.nextUrl.pathname)){
//         if (role === 'admin') {
//             url.pathname = '/admin/dashboard';
//             return NextResponse.redirect(url);
//         }
//     }
//     if(instructorPublicRoutes.includes(req.nextUrl.pathname)){
//         if (role === 'admin') {
//             url.pathname = '/admin/dashboard';
//             return NextResponse.redirect(url);
//         }
//     }
//     if (adminProctectedRoutes.includes(req.nextUrl.pathname)) {

//         if (role !== 'admin') {
//             url.pathname = '/admin/login';
//             return NextResponse.redirect(url);
//         }
//     }

//     if (adminPublicRoutes.includes(req.nextUrl.pathname)) {

//         if (role === 'admin') {
//             url.pathname = '/admin/dashboard';
//             return NextResponse.redirect(url);
//         }
//     }

//     return NextResponse.next();

// }

// export const config = {
//     matcher: [
//         "/admin/:path*",       // Admin routes
//         "/:path*",        // Student routes
//         "/instructor/:path*",  // Instructor routes
//     ],
// };
import { NextRequest, NextResponse } from "next/server";
import { tokenVerify } from "./lib/security/tokenVerify";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);

  // Skip middleware for static files and specific file extensions
  if (
    req.nextUrl.pathname.startsWith("/_next/") || // Static files
    /\.(.*)$/.test(req.nextUrl.pathname) // File extensions
  ) {
    return NextResponse.next();
  }

  // Verify token and get user role
  const role = await tokenVerify("accessToken", req);

  // Define public and protected routes for each role
  const adminPublicRoutes = ["/admin/login"];
  const adminProtectedRoutes = [
    "/admin/dashboard",
    "/admin/users",
    "/admin/instructors",
    "/admin/addCategory",
    "/admin/category",
    "/admin/verifyInstructors",
    "/admin/addMentorshipPlans",
    "/admin/verifyInstructors/[id]",
    "/admin/editCategory/[id]",
    "/admin/transactions",
  ];

  const studentPublicRoutes = [
    "/login",
    "/signup",
    "/resetPassword",
    "/forgot_password",
    "/forgot-password-otp",
    "/",
  ];
  const studentProtectedRoutes = [
    "/home",
    "/profile",
    "/editProfile",
    "/changePassword",
    "/myCourses",
    "/paymentFailure",
    "/paymentSuccess",
    "/course/[id]",
    "/coursePlay/[id]",
    "/attendQuiz/[id]",
    "/checkout",
    "/courseDetails",
    "/courses",
    "/bookings",
    "/bookSlot/[id]",
    "/certificate/[id]",
    '/mentors',
    '/mentorProfile/[id]'
  ];

  const instructorProtectedRoutes = [
    "/instructor/dashboard",
    "/instructor/users",
    "/instructor/courses",
    "/instructor/addCourse",
    "/instructor/profile",
    "/instructor/editProfile",
    "/instructor/verification",
    "/instructor/editQuizz/[id]",
    "/instructor/addQuizz/[id]",
    "/instructor/addChapters/[id]",
    "/instructor/chapters/[id]",
    "/instructor/chapters",
    "/instructor/editChapter/[id]",
    "/instructor/editCourse/[id]",
    "/instructor/transactions",
    "/instructor/slots",
    "/instructor/addSlots",
    "/instructor/bookings",
  ];
  const instructorPublicRoutes = [
    "/instructor/login",
    "/instructor/signup",
    "/instructor/otp",
    "/instructor/resetPassword",
    "/instructor/signup",
    "/instructor/forgot-password-otp",
    "/instructor/forgot_password",
  ];

  // Function to check if the current path matches any protected route pattern
  const isProtectedRoute = (path: string, protectedRoutes: string[]) => {
    return protectedRoutes.some((route) => {
      const routePattern = route.replace(/\[.*?\]/g, ".*"); // Replace dynamic segments with wildcard
      const regex = new RegExp(`^${routePattern}$`);
      return regex.test(path);
    });
  };

  const pathname = req.nextUrl.pathname;

  // Handle student routes
  if (studentPublicRoutes.includes(pathname)) {
    if (role === "instructor") {
      url.pathname = "/instructor/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (isProtectedRoute(pathname, studentProtectedRoutes)) {
    if (role !== "student") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Handle instructor routes
  if (instructorPublicRoutes.includes(pathname)) {
    if (role === "instructor") {
      url.pathname = "/instructor/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (isProtectedRoute(pathname, instructorProtectedRoutes)) {
    if (role !== "instructor") {
      url.pathname = "/instructor/login";
      return NextResponse.redirect(url);
    }
  }

  // Handle admin routes
  if (adminPublicRoutes.includes(pathname)) {
    if (role === "admin") {
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (isProtectedRoute(pathname, adminProtectedRoutes)) {
    if (role !== "admin") {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // Admin routes
    "/:path*", // Student routes
    "/instructor/:path*", // Instructor routes
  ],
};
