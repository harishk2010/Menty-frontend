const InstructorRoutes={
    getInstructorData:'/api/user/instructors/',
    getInstructorDataById:'/api/user/instructors/instructor/',
    getInstructorTransactionsData:'/api/user/instructors/transactions',
    updateProfile:'/api/user/instructors/updateProfile',
    updatePassword:'/api/user/instructors/updatePassword',
    getAllPaginatedMentors:'/api/user/instructors/get/paginatedMentors',
    getMentorsExpertise:'/api/user/instructors/get/expertise',
    

    //verification
    sendVerification:'/api/user/verification/verificationRequest',
    sendReVerifyRequest:'/api/user/verification/reVerifyRequest',
    getRequestDataUrl:'/api/user/verification/request/',
    getAllRequestsUrl:'/api/user/verification/requests',
    approveRequestsUrl:'/api/user/verification/approveRequest',
    updatePlanProfile:'/api/user/instructors/updatePlanPrice/',

    //reviews
    addMentorReview:'/api/user/mentorReview/addReview',
    getMentorReviews:'/api/user/mentorReview/',
}
export default InstructorRoutes 