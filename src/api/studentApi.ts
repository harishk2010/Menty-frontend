import StudentRoutes from "@/@types/endPoints/studentEndpoints";
import { API } from "@/service/axios";

export const getStudentData = async (email: string | null): Promise<any> => {
  try {
    const response = await API.get(`${StudentRoutes.getStudentData}${email}`);
    // console.log(response.data,"setstudent respone")
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
