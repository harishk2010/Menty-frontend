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
    console.log(response.data, "response login");
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
    console.log(response.data, "response logout");
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
      }
    ); // 2 parameter is the request part
    console.log(response.data, "response sendRestLink");
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
    console.log(response.data, "response verifyRestOtp");
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
      }
    );
    console.log(response.data, "response resendOtp");
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
    console.log(response.data, "response passwordReset");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const test = async () => {
  try {
    const response = await API.post(
      authentictaionRoutes.test_route,
      {},
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
