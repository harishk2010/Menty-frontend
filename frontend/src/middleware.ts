// import { NextRequest, NextResponse } from "next/server";
// import { tokenVerify } from "./lib/security/tokenVerify";

// export async function middleware(req: NextRequest) {
//   const url = new URL(req.url);

//   // Skip middleware for static files and specific file extensions
//   if (
//     req.nextUrl.pathname.startsWith("/_next/") || // Static files
//     /\.(.*)$/.test(req.nextUrl.pathname) // File extensions
//   ) {
//     return NextResponse.next();
//   }

//   // Verify token and get user role
//   const role = await tokenVerify("accessToken", req);

//   const adminPublicRoutes = ["/admin/login"];
//   const adminProtectedRoutes = [
//     "/admin/dashboard",
//     "/admin/users",
//     "/admin/instructors",
//     "/admin/addCategory",
//     "/admin/category",
//     "/admin/verifyInstructors",
//     "/admin/addMentorshipPlans",
//     "/admin/verifyInstructors/[id]",
//     "/admin/editCategory/[id]",
//     "/admin/transactions",
//   ];

//   const studentPublicRoutes = [
//     "/login",
//     "/signup",
//     "/resetPassword",
//     "/forgot_password",
//     "/forgot-password-otp",
//     "/",
//   ];
//   const studentProtectedRoutes = [
//     "/home",
//     "/profile",
//     "/editProfile",
//     "/changePassword",
//     "/myCourses",
//     "/paymentFailure",
//     "/paymentSuccess",
//     "/course/[id]",
//     "/coursePlay/[id]",
//     "/attendQuiz/[id]",
//     "/checkout",
//     "/courseDetails",
//     "/courses",
//     "/bookings",
//     "/bookSlot/[id]",
//     "/certificate/[id]",
//     '/mentors',
//     '/mentorProfile/[id]'
//   ];

//   const instructorProtectedRoutes = [
//     "/instructor/dashboard",
//     "/instructor/users",
//     "/instructor/courses",
//     "/instructor/addCourse",
//     "/instructor/profile",
//     "/instructor/editProfile",
//     "/instructor/verification",
//     "/instructor/editQuizz/[id]",
//     "/instructor/addQuizz/[id]",
//     "/instructor/addChapters/[id]",
//     "/instructor/chapters/[id]",
//     "/instructor/chapters",
//     "/instructor/editChapter/[id]",
//     "/instructor/editCourse/[id]",
//     "/instructor/transactions",
//     "/instructor/slots",
//     "/instructor/addSlots",
//     "/instructor/bookings",
//   ];
//   const instructorPublicRoutes = [
//     "/instructor/login",
//     "/instructor/signup",
//     "/instructor/otp",
//     "/instructor/resetPassword",
//     "/instructor/signup",
//     "/instructor/forgot-password-otp",
//     "/instructor/forgot_password",
//   ];

//   // Additional routes to whitelist (e.g., payment services, external routes)
//   const whitelistedRoutes = [
//     "/payment/",
//     "/webhook/",
//     "/api/",
//     "/external-service/",
//   ];

//   // Improved route matching function
//   const isRouteMatch = (path: string, routes: string[]) => {
//     return routes.some((route) => {
//       // Replace dynamic segments with a pattern that matches any segment
//       const routePattern = route
//         .replace(/\[.*?\]/g, '[^/]+')  // Replace [id] with a non-slash pattern
//         .replace(/\*/g, '.*');  // Allow wildcards

//       // Create a regex that matches the entire path or is a prefix
//       const regex = new RegExp(`^${routePattern}(/.*)?$`);
//       return regex.test(path);
//     });
//   };

//   // Check if route is whitelisted
//   const isWhitelistedRoute = (path: string) => {
//     return whitelistedRoutes.some(route => path.startsWith(route));
//   };

//   const pathname = req.nextUrl.pathname;

//   // Whitelist check - allow these routes regardless of role
//   if (isWhitelistedRoute(pathname)) {
//     return NextResponse.next();
//   }

//   // Handle student routes
//   if (role === "student") {
//     // Redirect student from admin or instructor routes
//     if (
//       isRouteMatch(pathname, adminPublicRoutes) ||
//       isRouteMatch(pathname, adminProtectedRoutes) ||
//       isRouteMatch(pathname, instructorPublicRoutes) ||
//       isRouteMatch(pathname, instructorProtectedRoutes)
//     ) {
//       url.pathname = "/home";
//       return NextResponse.redirect(url);
//     }

//     // Redirect student from their own public routes when logged in
//     if (isRouteMatch(pathname, studentPublicRoutes)) {
//       url.pathname = "/home";
//       return NextResponse.redirect(url);
//     }

//     // Ensure student stays in student routes
//     if (!isRouteMatch(pathname, [...studentPublicRoutes, ...studentProtectedRoutes])) {
//       url.pathname = "/home";
//       return NextResponse.redirect(url);
//     }
//   }

//   // Handle instructor routes
//   if (role === "instructor") {
//     // Redirect instructor from admin or student routes
//     if (
//       isRouteMatch(pathname, adminPublicRoutes) ||
//       isRouteMatch(pathname, adminProtectedRoutes) ||
//       isRouteMatch(pathname, studentPublicRoutes) ||
//       isRouteMatch(pathname, studentProtectedRoutes)
//     ) {
//       url.pathname = "/instructor/dashboard";
//       return NextResponse.redirect(url);
//     }

//     // Redirect instructor from their own public routes when logged in
//     if (isRouteMatch(pathname, instructorPublicRoutes)) {
//       url.pathname = "/instructor/dashboard";
//       return NextResponse.redirect(url);
//     }

//     // Ensure instructor stays in instructor routes
//     if (!isRouteMatch(pathname, [...instructorPublicRoutes, ...instructorProtectedRoutes])) {
//       url.pathname = "/instructor/dashboard";
//       return NextResponse.redirect(url);
//     }
//   }

//   // Handle admin routes
//   if (role === "admin") {
//     // Redirect admin from student or instructor routes
//     if (
//       isRouteMatch(pathname, studentPublicRoutes) ||
//       isRouteMatch(pathname, studentProtectedRoutes) ||
//       isRouteMatch(pathname, instructorPublicRoutes) ||
//       isRouteMatch(pathname, instructorProtectedRoutes)
//     ) {
//       url.pathname = "/admin/dashboard";
//       return NextResponse.redirect(url);
//     }

//     // Redirect admin from their own public routes when logged in
//     if (isRouteMatch(pathname, adminPublicRoutes)) {
//       url.pathname = "/admin/dashboard";
//       return NextResponse.redirect(url);
//     }

//     // Ensure admin stays in admin routes
//     if (!isRouteMatch(pathname, [...adminPublicRoutes, ...adminProtectedRoutes])) {
//       url.pathname = "/admin/dashboard";
//       return NextResponse.redirect(url);
//     }
//   }

//   // Handle unauthenticated access
//   if (!role) {
//     if (
//       isRouteMatch(pathname, studentProtectedRoutes) ||
//       isRouteMatch(pathname, instructorProtectedRoutes) ||
//       isRouteMatch(pathname, adminProtectedRoutes)
//     ) {
//       // Redirect to appropriate login page based on route
//       if (pathname.startsWith("/instructor/")) {
//         url.pathname = "/instructor/login";
//       } else if (pathname.startsWith("/admin/")) {
//         url.pathname = "/admin/login";
//       } else {
//         url.pathname = "/login";
//       }
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/admin/:path*", // Admin routes
//     "/:path*", // Student routes
//     "/instructor/:path*", // Instructor routes
//   ],
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
    "/myCertificates",
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
    if (role === "student") {
      url.pathname = "/home";
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