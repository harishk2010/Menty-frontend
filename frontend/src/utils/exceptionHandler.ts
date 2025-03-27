import { logout } from "@/api/userAuthentication";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { ApiError } from "next/dist/server/api-utils";


export const authErrorHandler=async (error:Error)=>{
    try {
        if (error instanceof AxiosError) {
            console.log("Axios Error:", error);
      
            // ✅ Accessing the status code
            const statusCode = error.response?.status;
            console.log("Status Code:", statusCode);
            if(statusCode==400){
                console.log("removeing")
                // Cookies.remove('accessToken')
                // Cookies.remove('refreshToken')
                // await logout()
                // await logout
            }
            if(statusCode==401)  throw new ApiError(400,"eror"); 
      
         
            console.log("Response Data:", error.response?.data);
      
            return statusCode; // Return status code if needed
          } else {
            throw error
          }
        
    } catch (error) {
        
    }
}