const InstructorRoutes={
    getInstructorData:"/user/instructors/",
    getInstructorTransactionsData:"/user/instructors/transactions",
    updateProfile:'/user/instructors/updateProfile',
    updatePassword:'/user/instructors/updatePassword',
    

    //verification
    sendVerification:'/user/verification/verificationRequest',
    sendReVerifyRequest:'/user/verification/reVerifyRequest',
    getRequestDataUrl:'/user/verification/request/',
    getAllRequestsUrl:'/user/verification/requests',
    approveRequestsUrl:'/user/verification/approveRequest'
}
export default InstructorRoutes 