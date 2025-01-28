import InstructorRoutes from "@/@types/endPoints/InstructorRoutes"
import { API } from "@/service/axios"


export const sendVerification=async (formData:FormData)=>{
    try {
        const response=await API.post(InstructorRoutes.sendVerification,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        console.log(response,"response verification...")
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}