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
    console.log(response, "response from getCourse");
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
    console.log(response, "response from getAllBoughtCourses");
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
  courseId: string,
  txnid: string,
  amount: number,
  courseName: string
) => {
  try {
    const data = { courseId, txnid, amount, courseName };
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
