import axios from "axios"

export const API = axios.create({
    baseURL:"http://localhost:5001",
    headers:{
        "Content-Type":"application/json",
        "withCredentials":true
    }
})