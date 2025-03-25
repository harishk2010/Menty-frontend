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
    console.log(response, "response from add course");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from isBoughtCourse");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCourse = async (courseId: string, formData: FormData) => {
  try {
    console.log("🚀 FormData Entries:", [...formData]);

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
    console.log(response, "response from add course");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateChapter = async (chapterId: string, formData: FormData) => {
  try {
    console.log("🚀 FormData Entries:", [...formData]);

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
    console.log(response, "response from updateChapter");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from getChapter");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllCourses = async () => {
  try {
    const response = await API.get(CourseRoutes.GET_ALL_COURSES, {
      withCredentials: true,
    });
    console.log(response.data, "response from getAllCourses");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response.data, "response from getAllCourses");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllFilteredInstructorCourses = async (instructorId:string,
  currentPage:number,
  itemsPerPage:number,
  searchTerm:string,
  sortField:string,
  sortDirection:"asc" | "desc") => {
  try {
    console.log(instructorId,currentPage,itemsPerPage,searchTerm,sortField,sortDirection,"uderidddd")
    
    const response = await API.get(
      `${CourseRoutes.GET_PAGINATED_INSTRUCTOR_COURSES}?instructorId=${instructorId}&page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&sortField=${sortField}&sortDirection=${sortDirection}`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data, "response from getAllCourses");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCourse = async (coureId: string) => {
  try {
    const response = await API.get(`${CourseRoutes.GET_COURSE}${coureId}`, {
      withCredentials: true,
    });
    console.log(response, "response from getCourse");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from getCourse");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from handlePublish");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from handleListingCourse");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from add course");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from addAllChapter");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response.data, "response from getAllBoughtCourses");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from getAllBoughtCourseee");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const chapterCompleted = async (chapterId: string) => {
  try {
    const response = await API.put(
      `${CourseRoutes.CHAPTER_COMPLETED}${chapterId}`,{},
      {
        withCredentials: true,
      }
    );
    console.log(response.data, "response from chapterCompleted");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from getAllBoughtCourses");
    return response.data;
  } catch (error) {
    console.log(error);
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
    console.log(response, "response from payment");
    return response.data;
  } catch (error) {}
};

export const addQuizz = async (quizData: object) => {
  try {
    console.log(quizData);
    const response = await API.post(CourseRoutes.ADD_QUIZZ, quizData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const editQuiz = async (id: string, quizData: object) => {
  try {
    console.log(quizData);
    const response = await API.put(
      `${CourseRoutes.EDIT_QUIZZ}${id}`,
      quizData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getQuizData = async (id: string) => {
  try {
    console.log(id);
    const response = await API.get(`${CourseRoutes.GET_QUIZZ}${id}`, {
      withCredentials: true,
    });
    console.log(response, "getQuizData");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCourse = async (id: string) => {
  try {
    console.log(id);
    const response = await API.delete(`${CourseRoutes.DELETE_COURSE}${id}`, {
      withCredentials: true,
    });
    console.log(response, "deletecourse");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCourseCategories = async () => {
  try {
    
    const response = await API.get(CourseRoutes.COURSE_CATGEGORIES, {
      withCredentials: true,
    });
    console.log(response.data, "getCourseCategories");

    return response.data;
  } catch (error) {
    console.log(error);
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
    
    console.log(response.data,"filtered courseeeee")
    const data = await response.data
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
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
    console.log(error)
  }
}
export const GetCourseReviews=async(courseId:string)=>{
  try {
    const response=await API.get(`${CourseRoutes.GET_REVIEW}${courseId}`,{
      withCredentials:true
    })
    console.log(response.data.data,"reviews")
    return response.data
    
  } catch (error) {
    console.log(error)
  }
}
export const getInstructorDashboard=async()=>{
  try {
    const response=await API.get(CourseRoutes.GET_INSTRUCTOR_DASHBOARD,{
      withCredentials:true
    })
    console.log(response.data.data,"reviews")
    return response.data
    
  } catch (error) {
    console.log(error)
  }
}