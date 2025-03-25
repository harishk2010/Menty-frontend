import bookingRoutes from "@/@types/endPoints/bookingEndpoints";
import { API } from "@/service/axios";

export const createSlots = async (data:object) => {
  try {
    const response=await API.post(bookingRoutes.CREATE_SLOTS,data,{
        withCredentials:true
    })
    return response.data
  } catch (error) {
    
    throw error
  }
};
export const getSlots = async (instructorId:string) => {
  try {
    const response=await API.get(`${bookingRoutes.GET_ALL_SLOTS}${instructorId}`,{
        withCredentials:true
    })
    return response.data
  } catch (error) {
    
    throw error
  }
};
export const getSlot = async (slotId:string) => {
  try {
    const response=await API.get(`${bookingRoutes.GET__SLOT}${slotId}`,{
        withCredentials:true
    })
    return response.data
  } catch (error) {
    
    throw error
  }
};
export const removeSlot = async (slotId:string) => {
  try {
    const response=await API.delete(`${bookingRoutes.DELETE_SLOT}${slotId}`,{
        withCredentials:true
    })
    return response.data
  } catch (error) {
    
    throw error
  }
};
export const bookSlot = async (data:object) => {
  try {
    const response=await API.post(bookingRoutes.CREATE_NEW_BOOKING,data,{
        withCredentials:true
    })
    return response.data
  } catch (error) {
    
    throw error
  }
};
export const getStudentBookings = async (studentId:object) => {
  try {

    const response=await API.get(`${bookingRoutes.GET_STUDENT_BOOKINGS}${studentId}`,{
        withCredentials:true
    })
    return response.data
  } catch (error) {
    
    throw error
  }
};
export const getInstructorBookings = async (instructorId:string) => {
  try {

    const response=await API.get(`${bookingRoutes.GET_INSTRUCTOR_BOOKINGS}${instructorId}`,{
        withCredentials:true
    })
    return response.data
  } catch (error) {
    
    throw error
  }
};
export const getBookindDataById = async (bookingId:string) => {
  try {

    const response=await API.get(`${bookingRoutes.GET_BOOKING_DATA}${bookingId}`,{
        withCredentials:true
    })
    return response.data
  } catch (error) {
    
    throw error
  }
};
