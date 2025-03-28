import axios from "axios";
import { userData } from "@/@types/userData";
import { API } from "@/service/axios";
import authentictaionRoutes from "@/@types/endPoints/authEndpoints";

export const signup = async (userData: userData): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.signup_Instructor,
      userData,
      {
        withCredentials: true, 
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response.status === 404) {
      throw error;
    }
  }
};

export const resendOtp = async (email: string,username:string): Promise<any> => {
  try {
    const response = await API.post(authentictaionRoutes.resendOtp_Instructor, {
      email,username
    },
    {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (otp: string): Promise<any> => {
  try {
    const response = await API.post(authentictaionRoutes.verifyOtp_Instructor, {
      otp,
    },
    {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.login_Instructor,
      {
        email,
        password,
      },
      {
        withCredentials: true, // Ensure that cookies are sent with the request
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.logout_Instructor,
      {},
      { withCredentials: true }
    ); // 2 parameter is the request part
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendResetLink = async (email: string): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.resetPasswordLink_Instructor,
      {
        email,
      },
      {
        withCredentials: true, // Ensure that cookies are sent with the request
      }
    ); // 2 parameter is the request part
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyResetOtp = async (
  email: string,
  otp: string
): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.verifyResetOtp_Instructor,
      {
        email,
        otp,
      },
      {
        withCredentials: true, // Ensure that cookies are sent with the request
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotResendOtp = async (email: string): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.forgotResendOtp_Instructor,
      {
        email,
      },{
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (password: string): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.resetPassword_Instructor,
      {
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const test = async () => {
  try {
    const response = await API.get(
      authentictaionRoutes.test_route,
      
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const instructorGoogleLogin = async (loginData: object) => {
  try {
    const response = await API.post(
      authentictaionRoutes.googleLogin_instructor,
      loginData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
