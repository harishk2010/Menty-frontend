import axios from 'axios';
import {userData} from "@/@types/userData"
import { API } from '@/service/axios';
import authentictaionRoutes from '@/@types/endPoints/authEndpoints';

export const signup = async (userData: userData): Promise<any> => {
  try {
    
    const response = await API.post(authentictaionRoutes.signup, userData);
    console.log(response.data,"response")
    return response;
  } catch (error: any) {
    if (error.response.status === 404) {
      throw error
  }
  console.log(error.message)
  }
};
