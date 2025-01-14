import axios from "axios";
import { userData } from "@/@types/userData";
import { API } from "@/service/axios";
import authentictaionRoutes from "@/@types/endPoints/authEndpoints";

export const signup = async (userData: userData): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.signup_Instructor,
      userData
    );
    console.log(response.data, "response");
    return response.data;
  } catch (error: any) {
    if (error.response.status === 404) {
      throw error;
    }
    console.log(error.message);
  }
};
export const resendOtp = async (email: string): Promise<any> => {
  try {
    const response = await API.post(authentictaionRoutes.resendOtp_Instructor, {
      email,
    });
    console.log(response.data, "response resendOtp");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (otp: string): Promise<any> => {
  try {
    const response = await API.post(authentictaionRoutes.verifyOtp_Instructor, {
      otp,
    });
    console.log(response.data, "response verifyOtp");
    return response.data;
  } catch (error) {
    throw error;
  }
};
