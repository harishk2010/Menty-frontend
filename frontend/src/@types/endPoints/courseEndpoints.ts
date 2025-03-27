const CourseRoutes = {
  ADD_NEW_COURSE: "/api/course/course/addCourse",
  UPDATE_COURSE: "/api/course/course/updateCourse/",
  UPDATE_PUBLISH_COURSE: "/api/course/course/handlePublish/",
  UPDATE_LISTING_COURSE: "/api/course/course/listCourse/",
  GET_ALL_COURSES: "/api/course/course/courses",
  GET_ALL_Instructor_COURSES: "/api/course/course/instructorCourses/",
  GET_COURSE: "/api/course/course/course/",
  DELETE_COURSE: "/api/course/course/delete/",
  PAGINATED_COURSES: "/api/course/course/paginatedCourses?",
  COURSE_CATGEGORIES: "/api/course/course/courses/categories",
  GET_PAGINATED_INSTRUCTOR_COURSES: "/api/course/course/filteredCourses",
  IS_ALREADY_PURCHASED: "/api/course/course/isBoughtCourse/",

  ///chapter
  ADD_NEW_CHAPTER: "/api/course/chapter/addChapter/",
  GET_ALL_CHAPTERS: "/api/course/chapter/chapters/",
  GET_ALL_CHAPTERS_DETAILS: "/api/course/chapter/chapterDetails/",
  UPDATE_CHAPTER: "/api/course/chapter/updateChapter/",
  GET_CHAPTER: "/api/course/chapter/chapter/",

  //payment
  PAYMENT: "/api/course/course/payment",

  //bought courses
  GET_BOUGHT_COURSES: "/api/course/course/boughtCourses/",
  GET_BOUGHT_COURSE: "/api/course/course/boughtCourse/",
  GET_Play_COURSE_DETAILS: "/api/course/course/playCourseDetails/",
  CHAPTER_COMPLETED: "/api/course/course/chapterCompleted/",

  //quizz
  ADD_QUIZZ: "/api/course/quiz/addQuiz",
  EDIT_QUIZZ: "/api/course/quiz/editQuiz/",
  GET_QUIZZ: "/api/course/quiz/getQuiz/",
  SUBMIT_QUIZZ_RESULT: "/api/course/quiz/sumbitResult/",

  //review
  ADD_REVIEW: "/api/course/review/addReview",
  GET_REVIEW: "/api/course/review/",

  //instructor Dashboard
  GET_INSTRUCTOR_DASHBOARD: "/api/course/course/instructorDashboard",
};

export default CourseRoutes;
