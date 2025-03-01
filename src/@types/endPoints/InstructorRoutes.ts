const InstructorRoutes={
    getInstructorData:"/user/instructors/",
    getInstructorDataById:"/user/instructors/instructor/",
    getInstructorTransactionsData:"/user/instructors/transactions",
    updateProfile:'/user/instructors/updateProfile',
    updatePassword:'/user/instructors/updatePassword',
    getAllPaginatedMentors:'/user/instructors/get/paginatedMentors',
    getMentorsExpertise:'/user/instructors/expertise',
    

    //verification
    sendVerification:'/user/verification/verificationRequest',
    sendReVerifyRequest:'/user/verification/reVerifyRequest',
    getRequestDataUrl:'/user/verification/request/',
    getAllRequestsUrl:'/user/verification/requests',
    approveRequestsUrl:'/user/verification/approveRequest',
    updatePlanProfile:'/user/instructors/updatePlanPrice/'
}
export default InstructorRoutes 