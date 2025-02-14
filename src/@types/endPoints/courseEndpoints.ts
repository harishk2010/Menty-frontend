const CourseRoutes={
    ADD_NEW_COURSE:'/course/course/addCourse',
    UPDATE_COURSE:'/course/course/updateCourse/',
    UPDATE_PUBLISH_COURSE:'/course/course/handlePublish/',
    GET_ALL_COURSES:'/course/course/courses',
    GET_ALL_Instructor_COURSES:'/course/course/instructorCourses/',
    GET_COURSE:'/course/course/course/',
    
    ///chapter
    ADD_NEW_CHAPTER:'/course/chapter/addChapter/',
    GET_ALL_CHAPTERS:'/course/chapter/chapters/',
    UPDATE_CHAPTER:'/course/chapter/updateChapter/',
    GET_CHAPTER:'/course/chapter/chapter/',

    //payment
    PAYMENT:'/course/course/payment',

    //bought courses
    GET_BOUGHT_COURSES:'/course/course/boughtCourses/',
    GET_Play_COURSE_DETAILS:'/course/course/playCourseDetails/',
    CHAPTER_COMPLETED:'/course/course/chapterCompleted/',

    //quizz
    ADD_QUIZZ:'/course/course/addQuiz',
    EDIT_QUIZZ:'/course/course/editQuiz/',
    GET_QUIZZ:'/course/course/getQuiz/',
    SUBMIT_QUIZZ_RESULT:'/course/course/sumbitResult/',
}

export default CourseRoutes