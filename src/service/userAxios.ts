import axios from "axios";

export const UserAPI = axios.create({
  baseURL: "http://localhost:5002", 
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
    credentials: "include",
  },
});


// UserAPI.interceptors.request.use(
//   (config) => {
//     const verificationTokenStudent = localStorage.getItem("verificationTokenStudent");
//     if (verificationTokenStudent) {
//       config.headers["the-verify-token"] = verificationTokenStudent;
//     }
//     return config;
//   },
//   (error) => {
//     console.error(error);
//   }
// );

// UserAPI.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.error(error.response.data.message);
//     }
//     return Promise.reject(error);
//   }
// );
