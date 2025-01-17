import axios from "axios";
import { userData } from "@/@types/userData";
import { API } from "@/service/axios";
import authentictaionRoutes from "@/@types/endPoints/authEndpoints";

export const adminLogin = async (userData: userData): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.adminLogin,
      userData,{
        withCredentials:true
      }
    );
    console.log(response.data, "admin response");

    return response.data;
  } catch (error: any) {
    if (error.response.status === 404) {
      throw error;
    }
    console.log(error.message);
  }
};

export const adminLogout = async (): Promise<any> => {
    try {
      const response = await API.post(authentictaionRoutes.adminLogout,{},{withCredentials: true });// 2 parameter is the request part
      console.log(response.data, "response logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  };