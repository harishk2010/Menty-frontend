const InstructorRoutes={
    getInstructorData:"/user/instructors/",
    getInstructorDataById:"/user/instructors/instructor/",
    getInstructorTransactionsData:"/user/instructors/transactions",
    updateProfile:'/user/instructors/updateProfile',
    updatePassword:'/user/instructors/updatePassword',
    getAllPaginatedMentors:'/user/instructors/get/paginatedMentors',
    getMentorsExpertise:'/user/instructors/get/expertise',
    

    //verification
    sendVerification:'/user/verification/verificationRequest',
    sendReVerifyRequest:'/user/verification/reVerifyRequest',
    getRequestDataUrl:'/user/verification/request/',
    getAllRequestsUrl:'/user/verification/requests',
    approveRequestsUrl:'/user/verification/approveRequest',
    updatePlanProfile:'/user/instructors/updatePlanPrice/',

    //reviews
    addMentorReview:'/user/mentorReview/addReview',
    getMentorReviews:'/user/mentorReview/',
}
export default InstructorRoutes 