import StudentRoutes from "@/@types/endPoints/studentEndpoints"
import { API } from "@/service/axios"
import { UserAPI } from "@/service/userAxios"


export const getStudentData=async(email:string | null):Promise<any>=>{
    try {
        const response=await API.get(`${StudentRoutes.getStudentData}${email}`)
        // console.log(response.data,"setstudent respone")
        return response?.data
    } catch (error) {
        console.log(error)
        
    }

}
export const updateProfile=async(id:string,data:Object | null):Promise<any>=>{
    try {
        console.log("inside updateProfile respone")
        const response=await API.patch(StudentRoutes.updateProfile,{id,data})
        console.log(response.data.user,"updateProfile respone")
        return response?.data
    } catch (error) {
        console.log(error)
        
    }

}