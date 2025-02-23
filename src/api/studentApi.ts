import StudentRoutes from "@/@types/endPoints/studentEndpoints";
import { API } from "@/service/axios";

export const getStudentData = async (email: string | null): Promise<any> => {
  try {
    const response = await API.get(`${StudentRoutes.getStudentData}${email}`,{
      withCredentials: true,
    });
    console.log(response.data,"setstudent respone")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (formData: FormData): Promise<any> => {
  try {
    console.log("Inside updateProfile API call");

    const response = await API.patch(StudentRoutes.updateProfile, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(response.data.user, "updateProfile response");
    return response?.data;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
  }
};

export const updatePassword = async (data: any): Promise<any> => {
  try {
    const response = await API.patch(StudentRoutes.updatePassword, data, {
      withCredentials: true,
    });
    console.log(response,"response updatePassword")
    return response.data;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
  }
};

export const getAllStudents = async (): Promise<any> => {
  try {
    console.log("response getAllStudents11")
    const response = await API.get(StudentRoutes.adminGetStudents,{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    });
    console.log(response.data.users,"response getAllStudents")
    return response?.data?.users;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
  }
};

export const getAllInstructors = async (): Promise<any> => {
  try {
    console.log("response getAllStudents11")
    const response = await API.get(StudentRoutes.adminGetInstructors,{
      withCredentials: true,
    });
    console.log(response.data.users,"response getAllStudents")
    return response?.data?.users;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
  }
};


export const blockStudent = async (email: string | null): Promise<any> => {
  try {
    const response = await API.patch(`${StudentRoutes.adminBlockStudent}${email}`,{
      withCredentials: true,
    });
    // console.log(response.data,"setstudent respone")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const blockInstructor = async (email: string | null): Promise<any> => {
  try {
    const response = await API.patch(`${StudentRoutes.adminBlockInstructor}${email}`,{
      withCredentials: true,
    });
    // console.log(response.data,"setstudent respone")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getStudentDataById = async (studentId: string | null): Promise<any> => {
  try {
    console.log("getInsssss")
    const response = await API.get(
      // `/user/instructors/${email}`
      `${StudentRoutes.getStudentDataById}${studentId}`,{
        withCredentials:true
      }
    );
    console.log(response.data,"getstudentDataaaa")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
