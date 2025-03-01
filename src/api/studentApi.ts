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
// export const adminSearchStudents = async (query:{
//   q: string, 
//     role: string, 
//     page: number, 
//     limit: number
// }): Promise<any> => {
//   try {
//     const { q,role,page,limit}=query
//     console.log(q,role,page,limit,"response adminSearchStudents")
//     const response = await API.get(`${StudentRoutes.adminSearchStudents}?q=${q}&role=${role}&page=${page}&limit=${limit}`,{
//       headers:{
//         "Content-Type":"application/json"
//       },
//       withCredentials:true
//     });
//     console.log(response,"response adminSearchStudents")
//     return response?.data?.users;
//   } catch (error) {
//     console.error("Error in updateProfile API call:", error);
//   }
// };

export const adminSearchStudents = async (query: {
  q: string;
  role: string;
  page: number;
  limit: number;
}) => {
  try {
    const { q, role, page, limit } = query;

    // Log the query parameters for debugging
    console.log(q, role, page, limit, "query parameters in adminSearchStudents");

    // Make the API request
    // const response = await API.get(`${StudentRoutes.adminSearchStudents}/god`,{
    //         headers:{
    //           "Content-Type":"application/json"
    //         },
    //         withCredentials:true
    //       });
    // const response = await API.get(`${StudentRoutes.adminSearchStudents}?query=${q}&role=${role}&page=${page}&limit=${limit}`,{
            
    //         withCredentials:true
    //       });
    const response = await API.get(`http://localhost:5000/user/student/search?query=${q}&role=${role}&page=${page}&limit=${limit}`,{
            
            withCredentials:true
          });

    // Log the response for debugging
    console.log(response, "response from adminSearchStudents");

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error in adminSearchStudents API call:", error);
    throw error; // Re-throw the error to handle it in the calling function
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
