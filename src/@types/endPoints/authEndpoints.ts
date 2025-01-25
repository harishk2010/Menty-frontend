const  authentictaionRoutes={
    signup_Instructor:"/auth/instructor/register",
    resendOtp_Instructor:'/auth/instructor/resendOtp',
    verifyOtp_Instructor:'/auth/instructor/createUser',
    login_Instructor:'/auth/instructor/login',
    logout_Instructor:'/auth/instructor/logout',
    resetPasswordLink_Instructor:'/auth/instructor/verifyEmail',
    verifyResetOtp_Instructor:'/auth/instructor/verifyResetOtp',
    forgotResendOtp_Instructor:'/auth/instructor/forgotResendOtp',
    resetPassword_Instructor:'/auth/instructor/resetPassword',
    googleLogin_instructor:'/auth/instructor/googleLogin',
    test_route:'/auth/instructor/test',

    //student routes

    signup_Student:"/auth/student/register",
    resendOtp_Student:'/auth/student/resendOtp',
    verifyOtp_Student:'/auth/student/createUser',
    login_Student:'/auth/student/login',
    logout_Student:'/auth/student/logout',
    resetPasswordLink_Student:'/auth/student/verifyEmail',
    verifyResetOtp_Student:'/auth/student/verifyResetOtp',
    forgotResendOtp_Student:'/auth/student/forgotResendOtp',
    resetPassword_Student:'/auth/student/resetPassword',
    googleLogin_Student:'/auth/student/googleLogin',

    //admin
    adminLogin:'/auth/admin/login',
    adminLogout:'/auth/admin/logout',
   

  
}

export default authentictaionRoutes