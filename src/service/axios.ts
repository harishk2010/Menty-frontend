import axios from "axios";
import { verify } from "crypto";


export const API = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

API.interceptors.request.use(
  (config) => {
    const verificationToken = localStorage.getItem("verificationToken");

    if (verificationToken) {
      config.headers["the-verify-token"] = verificationToken;
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
      const { data } = error.response;
      console.log(data.message);
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  }
);
