import axios from "axios";
import { userData } from "@/@types/userData";
import { API } from "@/service/axios";
import authentictaionRoutes from "@/@types/endPoints/authEndpoints";

export const adminLogin = async (userData: userData): Promise<any> => {
  try {
    const response = await API.post(authentictaionRoutes.adminLogin, userData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    if (error.response.status === 404) {
      throw error;
    }
  }
};

export const adminLogout = async (): Promise<any> => {
  try {
    const response = await API.post(
      authentictaionRoutes.adminLogout,
      {},
      { withCredentials: true }
    ); // 2 parameter is the request part
    return response.data;
  } catch (error) {
    throw error;
  }
};
