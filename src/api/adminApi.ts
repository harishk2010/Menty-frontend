 import adminRoutes from "@/@types/endPoints/adminEndpoints"
import { API } from "@/service/axios"

 export const addCategory=async(categoryName:string)=>{
    try {

        const response=await API.post(adminRoutes.add_category,{categoryName},{
            withCredentials:true
        })
        console.log(response,"response add category adminAPi")
        return response.data
        
    } catch (error) {
        console.log(error)
        throw error
    }
 }
 export const editCategory=async(id:string,categoryName:string)=>{
    try {

        const response=await API.put(adminRoutes.edit_category,{id,categoryName},{
            withCredentials:true
        })
        console.log(response,"editCategory  adminAPi")
        return response.data
        
    } catch (error) {
        console.log(error)
        throw error
    }
 }
 export const getCategories=async()=>{
    try {

        const response=await API.get(adminRoutes.get_All_categories,{
            withCredentials:true
        })
        console.log(response.data.data,"responsegetCategories adminAPi")
        return response.data.data
        
    } catch (error) {
        console.log(error)
        throw error
    }
 }
 export const listOrUnlistCategory=async(id:string)=>{
    try {

        const response=await API.put(`${adminRoutes.list_Unlist_category}${id}`,{
            withCredentials:true
        })
        console.log(response,"listOrUnlistCategory adminAPi")
        return response.data
        
    } catch (error) {
        console.log(error)
        throw error
    }
 }
 export const getCategory=async(id:string)=>{
    try {

        const response=await API.put(`${adminRoutes.get_category}${id}`,{
            withCredentials:true
        })
        console.log(response.data.data,"getCategory adminAPi")
        return response.data.data
        
    } catch (error) {
        console.log(error)
        throw error
    }
 }
 export const adminDashboard=async()=>{
    try {

        const response=await API.get(adminRoutes.get_adminDashboard,{
            withCredentials:true
        })
        console.log(response.data.data,"adminDashboard adminAPi")
        return response.data
        
    } catch (error) {
        console.log(error)
        throw error
    }
 }
 export const getAdminData=async(email:string)=>{
    try {

        const response=await API.get(`${adminRoutes.get_adminDetails}${email}`,{
            withCredentials:true
        })
        console.log(response.data.data,"getAdminData adminAPi")
        return response.data
        
    } catch (error) {
        console.log(error)
        throw error
    }
 }