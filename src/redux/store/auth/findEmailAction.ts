import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const findEmailAction=createAsyncThunk(
    "user/find-email",
    async (email:string,{rejectWithValue})=>{
        try {
            console.log("inside action---")
            const response= await axios.get(
                `/auth/available-email/${email}`
            )
            if(response.data.success){
                console.log("done")
            }else{
                console.log("false")
            }
            
        } catch (error) {
            const e:AxiosError =error as AxiosError
            return rejectWithValue(e.response?.data)
            
        }
    }
)