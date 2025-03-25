import chatRoutes from "@/@types/endPoints/chatEndpoints";
import { API } from "@/service/axios";

export const getChatHistoryById = async (bookingId:string) => {
    try {
  
      const response=await API.get(`${chatRoutes.CHAT_HISTORY}${bookingId}`,{
          withCredentials:true
      })
      return response.data
    } catch (error) {
      
      throw error
    }
  };

  export const uploadChatImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('chat', file);
      
      const response = await API.post(chatRoutes.CHAT_UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials:true
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }