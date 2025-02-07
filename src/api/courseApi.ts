import CourseRoutes from "@/@types/endPoints/courseEndpoints"
import { API } from "@/service/axios"

export const addCouse=async(formData:FormData)=>{
    try {

        const response=await API.post(CourseRoutes.ADD_NEW_COURSE,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            withCredentials:true
        })
        console.log(response,"response from add course")
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const updateCourse=async(formData:FormData)=>{
    try {

        const response=await API.post(CourseRoutes.ADD_NEW_COURSE,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            withCredentials:true
        })
        console.log(response,"response from add course")
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const getAllCourses=async()=>{
    try {

        const response=await API.get(CourseRoutes.GET_ALL_COURSES,{
           
            withCredentials:true
        })
        console.log(response,"response from getAllCourses")
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}
export const getCourse=async(coureId:string)=>{
    try {

        const response=await API.get(`${CourseRoutes.GET_COURSE}${coureId}`,{
           
            withCredentials:true
        })
        console.log(response,"response from getAllCourses")
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}