import InstructorRoutes from "@/@types/endPoints/InstructorRoutes"
import { API } from "@/service/axios"


export const sendVerification=async (formData:FormData)=>{
    try {
        const response=await API.post(InstructorRoutes.sendVerification,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        console.log(response.data,"response verification...")
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
            }
        })
        console.log(response.data,"response verification...")
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const getRequestData=async (email:string)=>{
    try {
        console.log("insideeeee")
        const response=await API.get(`${InstructorRoutes.getRequestDataUrl}${email}`)
        console.log(response,"response getRequestData...")
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const getAllRequests=async ()=>{
    try {
        console.log("insideeeee getAllRequests")
        const response=await API.get(InstructorRoutes.getAllRequestsUrl)
        console.log(response,"response getAllRequests...")
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const approveRequest=async (email:string,status:string)=>{
    try {
        console.log("insideeeee getAllRequests")
        const response=await API.post(InstructorRoutes.approveRequestsUrl,{email,status})
        console.log(response.data,"response approveRequest...")
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}