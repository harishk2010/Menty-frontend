import InstructorRoutes from "@/@types/endPoints/InstructorRoutes";
import { API } from "@/service/axios";

export const getInstructorData = async (email: string | null): Promise<any> => {
  try {
    console.log("getInsssss",email)
    const response = await API.get(
      // `/user/instructors/${email}`
      `${InstructorRoutes.getInstructorData}${email}`,{
        withCredentials:true
      }
    );
    console.log(response.data,"getInsssss")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getInstructorDataById = async (instructorId: string | null): Promise<any> => {
  try {
    console.log("getInsssss")
    const response = await API.get(
      // `/user/instructors/${email}`
      `${InstructorRoutes.getInstructorDataById}${instructorId}`,{
        withCredentials:true
      }
    );
    console.log(response.data,"getInsssss")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getInstructorTransactions = async (email: string | null,currentPage:number,itemsPerPage:number): Promise<any> => {
  try {
    console.log("getInsssss")
    const response = await API.get(
      // `/user/instructors/${email}`
      `${InstructorRoutes.getInstructorTransactionsData}?email=${email}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`,{
        withCredentials:true
      }
    );
    console.log(response.data,"getInsssss")
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};


export const updateProfile = async (formData: FormData): Promise<any> => {
  try {
    console.log("Inside updateProfile API call");

    const response = await API.post(InstructorRoutes.updateProfile, formData, {
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
    const response = await API.patch(InstructorRoutes.updatePassword, data, {
      withCredentials: true,
    });
    console.log(response, "response updatePassword");
    return response.data;
  } catch (error) {
    console.error("Error in updateProfile API call:", error);
  }
};
