import chatRoutes from "@/@types/endPoints/chatEndpoints";
import { API } from "@/service/axios";

export const getChatHistoryById = async (bookingId:string) => {
    try {
  
      const response=await API.get(`${chatRoutes.CHAT_HISTORY}${bookingId}/history`,{
          withCredentials:true
      })
      console.log(response.data.data,"response from getChatHistoryById API")
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  };