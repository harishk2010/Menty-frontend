import { logout } from "@/api/userAuthentication";
import { deleteCookie } from "@/utils/deleteCookie";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";


export const API = axios.create({
  baseURL:process.env.NEXT_PUBLIC_BASE_URL ,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
    credentials: 'include',
    
  },
});

API.interceptors.request.use(
  (config) => {
    const verificationToken = localStorage.getItem("verificationToken");
    const verificationTokenStudent = localStorage.getItem("verificationTokenStudent");

    if (verificationToken) {
      config.headers["the-verify-token"] = verificationToken;
    }
    if (verificationTokenStudent) {
      config.headers["the-verify-token"] = verificationTokenStudent;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Handle 401 Unauthorized error
      if (status === 401) {
        // Cookies.remove("accessToken");
        // deleteCookie('accessToken')
        // deleteCookie('refreshToken')
        logout()
        // Router.replace("/"); // Redirect to login or home page
      }

      // Log the error message
      console.log(error.response.data.message || "An error occurred");
    } else {
      console.log(error, "Axios error");
    }

    return Promise.reject(error);
  }
);
