import CourseRoutes from "@/@types/endPoints/courseEndpoints";
import { API } from "@/service/axios";
interface CourseData {
  courseName: string;
  description: string;
  price: string;
  category: string;
  level: string;
  duration: string;
  thumbnail: FileList | null;
  demoVideos: FileList | null;
}

export const addCouse = async (formData: FormData) => {
  try {
    const response = await API.post(CourseRoutes.ADD_NEW_COURSE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const isBoughtCourse = async (userId:string,coureId:string) => {
  try {
    const response = await API.post(`${CourseRoutes.IS_ALREADY_PURCHASED}${coureId}`, {userId}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateCourse = async (courseId: string, formData: FormData) => {
  try {

    const response = await API.post(
      `${CourseRoutes.UPDATE_COURSE}${courseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateChapter = async (chapterId: string, formData: FormData) => {
  try {

    const response = await API.post(
      `${CourseRoutes.UPDATE_CHAPTER}${chapterId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getChapter = async (chapterId: string) => {
  try {
    const response = await API.get(`${CourseRoutes.GET_CHAPTER}${chapterId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllCourses = async () => {
  try {
    const response = await API.get(CourseRoutes.GET_ALL_COURSES, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllInstructorCourses = async (userId: string) => {
  try {
    const response = await API.get(
      `${CourseRoutes.GET_ALL_Instructor_COURSES}${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllFilteredInstructorCourses = async (instructorId:string,
  currentPage:number,
  itemsPerPage:number,
  searchTerm:string,
  sortField:string,
  sortDirection:"asc" | "desc") => {
  try {
    
    const response = await API.get(
      `${CourseRoutes.GET_PAGINATED_INSTRUCTOR_COURSES}?instructorId=${instructorId}&page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&sortField=${sortField}&sortDirection=${sortDirection}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCourse = async (coureId: string) => {
  try {
    const response = await API.get(`${CourseRoutes.GET_COURSE}${coureId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const submitResult = async (
  coureId: string,
  {
    score,
    total,
  }: {
    score: number;
    total: number;
  }
) => {
  try {
    const response = await API.put(
      `${CourseRoutes.SUBMIT_QUIZZ_RESULT}${coureId}`,
      { score, total },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const handlePublish = async (coureId: string) => {
  try {
    const response = await API.put(
      `${CourseRoutes.UPDATE_PUBLISH_COURSE}${coureId}`,{},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const handleListingCourse = async (coureId: string) => {
  try {
    const response = await API.put(
      `${CourseRoutes.UPDATE_LISTING_COURSE}${coureId}`,{},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addChapter = async (formData: FormData, courseId: string) => {
  try {
    const response = await API.post(
      `${CourseRoutes.ADD_NEW_CHAPTER}${courseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllChapter = async (courseId: string) => {
  try {
    const response = await API.get(
      `${CourseRoutes.GET_ALL_CHAPTERS}${courseId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllChaptersDetails = async (courseId: string) => {
  try {
    const response = await API.get(
      `${CourseRoutes.GET_ALL_CHAPTERS_DETAILS}${courseId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllBoughtCourses = async (userId: string) => {
  try {
    const response = await API.get(
      `${CourseRoutes.GET_BOUGHT_COURSES}${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllCompletedCourses = async (userId: string) => {
  try {
    const response = await API.get(
      `${CourseRoutes.GET_COMPLETED_COURSES}${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getBoughtCourse = async (courseId: string) => {
  try {
    const response = await API.get(
      `${CourseRoutes.GET_BOUGHT_COURSE}${courseId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const chapterCompleted = async (chapterId: string,courseId:string) => {
  try {
    const response = await API.post(
      `${CourseRoutes.CHAPTER_COMPLETED}${chapterId}/course/${courseId}`,{},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPlayCourse = async (courseId: string) => {
  try {
    const response = await API.get(
      `${CourseRoutes.GET_Play_COURSE_DETAILS}${courseId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const payCourse = async (
  userId: string,
  courseId: string,
  txnid: string,
  amount: number,
  courseName: string
) => {
  try {
    const data = {userId, courseId, txnid, amount, courseName };
    const response = await API.post(CourseRoutes.PAYMENT, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {}
};

export const addQuizz = async (quizData: object) => {
  try {
    const response = await API.post(CourseRoutes.ADD_QUIZZ, quizData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editQuiz = async (id: string, quizData: object) => {
  try {
    const response = await API.put(
      `${CourseRoutes.EDIT_QUIZZ}${id}`,
      quizData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getQuizData = async (id: string) => {
  try {
    const response = await API.get(`${CourseRoutes.GET_QUIZZ}${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteCourse = async (id: string) => {
  try {
    const response = await API.delete(`${CourseRoutes.DELETE_COURSE}${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCourseCategories = async () => {
  try {
    
    const response = await API.get(CourseRoutes.COURSE_CATGEGORIES, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllPaginatedCourses = async (
  page = 1,
  limit = 9, // Changed to 9 to match your 3x3 grid layout
  search = "",
  sort = "popular",
  category: string[] = [], 
  level: string[] = []     
) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (search) {
      params.append('search', search);
    }
    
    if (sort) {
      params.append('sort', sort);
    }
    
    // Add category filters if any
    category.forEach(cat => {
      params.append('category', cat);
    });
    
    // Add level filters if any
    level.forEach(lvl => {
      params.append('level', lvl);
    });
    
    const response = await API.get(`${CourseRoutes.PAGINATED_COURSES}${params.toString()}`,{
      withCredentials:true
    });
    
    const data = await response.data
    return data;
  } catch (error) {
    throw error;
  }
};


export const addReview=async(courseId:string,rating:number,comment:string)=>{
  try {
    const response=await API.post(CourseRoutes.ADD_REVIEW,{courseId,rating,comment},{
      withCredentials:true
    })
    return response.data
    
  } catch (error) {
    throw error
  }
}
export const GetCourseReviews=async(courseId:string)=>{
  try {
    const response=await API.get(`${CourseRoutes.GET_REVIEW}${courseId}`,{
      withCredentials:true
    })
    return response.data
    
  } catch (error) {
    throw error
  }
}
export const getInstructorDashboard=async()=>{
  try {
    const response=await API.get(CourseRoutes.GET_INSTRUCTOR_DASHBOARD,{
      withCredentials:true
    })
    return response.data
    
  } catch (error) {
    throw error
  }
}