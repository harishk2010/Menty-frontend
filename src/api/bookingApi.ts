import bookingRoutes from "@/@types/endPoints/bookingEndpoints";
import { API } from "@/service/axios";

export const createSlots = async (data:object) => {
  try {
    const response=await API.post(bookingRoutes.CREATE_SLOTS,data,{
        withCredentials:true
    })
    console.log(response,"response from createSlots API")
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
};
export const getSlots = async (instructorId:string) => {
  try {
    const response=await API.get(`${bookingRoutes.GET_ALL_SLOTS}${instructorId}`,{
        withCredentials:true
    })
    console.log(response.data.data,"response from getALl slots API")
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
};
export const getSlot = async (slotId:string) => {
  try {
    const response=await API.get(`${bookingRoutes.GET__SLOT}${slotId}`,{
        withCredentials:true
    })
    console.log(response.data.data,"response from get slot API")
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
};
export const removeSlot = async (slotId:string) => {
  try {
    const response=await API.delete(`${bookingRoutes.DELETE_SLOT}${slotId}`,{
        withCredentials:true
    })
    console.log(response.data.data,"response from getALl slots API")
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
};
export const bookSlot = async (data:object) => {
  try {
    console.log(data)
    const response=await API.post(bookingRoutes.CREATE_NEW_BOOKING,data,{
        withCredentials:true
    })
    console.log(response.data.data,"response from bookSlot slots API")
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
};
export const getStudentBookings = async (studentId:object) => {
  try {

    const response=await API.get(`${bookingRoutes.GET_STUDENT_BOOKINGS}${studentId}`,{
        withCredentials:true
    })
    console.log(response.data.data,"response from student Bookings slots API")
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
};
export const getBookindDataById = async (bookingId:string) => {
  try {

    const response=await API.get(`${bookingRoutes.GET_BOOKING_DATA}${bookingId}`,{
        withCredentials:true
    })
    console.log(response.data.data,"response from student Bookings slots API")
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
};
