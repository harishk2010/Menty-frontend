import InstructorRoutes from "@/@types/endPoints/InstructorRoutes"
import { API } from "@/service/axios"


export const sendVerification=async (formData:FormData)=>{
    try {
        const response=await API.post(InstructorRoutes.sendVerification,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
       
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const reVerifyRequest=async (formData:FormData)=>{
    try {
        const response=await API.post(InstructorRoutes.sendReVerifyRequest,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
      
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const getRequestData=async (email:string)=>{
    try {
     
        const response=await API.get(`${InstructorRoutes.getRequestDataUrl}${email}`,{
            withCredentials:true
        })
      
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const getAllRequests=async ()=>{
    try {
      
        const response=await API.get(InstructorRoutes.getAllRequestsUrl,{
            withCredentials:true
        })
        
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const approveRequest=async (email:string,status:string,comment:string)=>{
    try {
  
        const response=await API.post(InstructorRoutes.approveRequestsUrl,{email,status,comment},{
            withCredentials:true
        })
        
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}