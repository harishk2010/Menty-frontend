const  authentictaionRoutes={
    signup_Instructor:"/api/auth/instructor/register",
    resendOtp_Instructor:'/api/auth/instructor/resendOtp',
    verifyOtp_Instructor:'/api/auth/instructor/createUser',
    login_Instructor:'/api/auth/instructor/login',
    logout_Instructor:'/api/auth/instructor/logout',
    resetPasswordLink_Instructor:'/api/auth/instructor/verifyEmail',
    verifyResetOtp_Instructor:'/api/auth/instructor/verifyResetOtp',
    forgotResendOtp_Instructor:'/api/auth/instructor/forgotResendOtp',
    resetPassword_Instructor:'/api/auth/instructor/resetPassword',
    googleLogin_instructor:'/api/auth/instructor/googleLogin',
    test_route:'/api/auth/instructor/test',

    //student routes

    signup_Student:"/api/auth/student/register",
    resendOtp_Student:'/api/auth/student/resendOtp',
    verifyOtp_Student:'/api/auth/student/createUser',
    login_Student:'/api/auth/student/login',
    logout_Student:'/api/auth/student/logout',
    resetPasswordLink_Student:'/api/auth/student/verifyEmail',
    verifyResetOtp_Student:'/api/auth/student/verifyResetOtp',
    forgotResendOtp_Student:'/api/auth/student/forgotResendOtp',
    resetPassword_Student:'/api/auth/student/resetPassword',
    googleLogin_Student:'/api/auth/student/googleLogin',

    //admin
    adminLogin:'/api/auth/admin/login',
    adminLogout:'/api/auth/admin/logout',
   

  
}

export default authentictaionRoutes