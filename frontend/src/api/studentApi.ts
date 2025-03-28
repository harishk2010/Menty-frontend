import StudentRoutes from "@/@types/endPoints/studentEndpoints";
import { API } from "@/service/axios";

export const getStudentData = async (email: string | null): Promise<any> => {
  try {
    const response = await API.get(`${StudentRoutes.getStudentData}${email}`,{
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (formData: FormData): Promise<any> => {
  try {

    const response = await API.patch(StudentRoutes.updateProfile, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
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
    return response.data;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
  }
};

export const getAllStudents = async (): Promise<any> => {
  try {
    const response = await API.get(StudentRoutes.adminGetStudents,{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    });
    return response?.data?.users;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
  }
};

export const adminSearchStudents = async (query: {
  q: string;
  role: string;
  page: number;
  limit: number;
}) => {
  try {
    const { q, role, page, limit } = query;

  
    const response = await API.get(`http://localhost:5000/user/student/search?query=${q}&role=${role}&page=${page}&limit=${limit}`,{
            
            withCredentials:true
          });

  
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const getAllInstructors = async (): Promise<any> => {
  try {
    const response = await API.get(StudentRoutes.adminGetInstructors,{
      withCredentials: true,
    });
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
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const blockInstructor = async (email: string | null): Promise<any> => {
  try {
    const response = await API.post(`${StudentRoutes.adminBlockInstructor}${email}`,{},{
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getStudentDataById = async (studentId: string | null): Promise<any> => {
  try {
    const response = await API.get(
      // `/user/instructors/${email}`
      `${StudentRoutes.getStudentDataById}${studentId}`,{
        withCredentials:true
      }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
