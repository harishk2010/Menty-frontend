// "use client";

// import PrimaryButton from "@/app/components/buttons/PrimaryButton";
// import { ReactElement } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import InputField from "@/app/components/common/forms/InputField";
// import PasswordField from "@/app/components/common/forms/PasswordField";
// import { jwtDecode } from "jwt-decode";
// import { motion } from "framer-motion";
// import { Login } from "@/@types/LoginTypes";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { setUser } from "@/redux/slices/userSlice";
// import { useDispatch } from "react-redux";
// import { StudentGoogleLogin, login } from "@/api/studentAuthentication";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// const GoogleLogin = dynamic(
//   () => import("@react-oauth/google").then((mod) => mod.GoogleLogin),
//   { ssr: false }
// );
// // const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });

// import Link from "next/link";
// import { GOOGLE_CLIENT_ID } from "@/utils/constants";
// import dynamic from "next/dynamic";

// const loginSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("Invalid email")
//     .transform((value) => value?.trim())
//     .required("Email is required"),

//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .transform((value) => value?.replace(/\s+/g, ""))
//     .matches(/^\S*$/, "Spaces are not allowed")
//     .required("Password is required"),
// });

// export default function LoginPage(): ReactElement {
//   console.log(GOOGLE_CLIENT_ID);

//   const router = useRouter();
//   const dispatch = useDispatch();

//   const initialValues = {
//     email: "",
//     password: "",
//   };
//   const googleUrl =
//     process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
//     "241293973300-q7m09ls0fgqv5u72ft5707edbfnnn1qc.apps.googleusercontent.com";
//   console.log(googleUrl, "googleUrl");
//   const googleSubmit = async (credentialResponse: any) => {
//     console.log("gooogle");
//     try {
//       const decoded: any = jwtDecode(credentialResponse.credential);
//       console.log("decoded", decoded.name);
//       let response = await StudentGoogleLogin({
//         name: decoded.name,
//         email: decoded.email,
//         password: decoded.sub,
//       });
//       console.log(response.user, "responsee");
//       const user = response?.user;
//       console.log(user, "USERRRRR");
//       if (response) {
//         // localStorage.setItem('accesToken', response.token.accessToken)
//         // localStorage.setItem('refreshToken', response.token.refreshToken)
//         // localStorage.setItem('role', response.token.role)
//         dispatch(
//           setUser({
//             userId: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             profilePicUrl: user.profilePicUrl,
//           })
//         );
//         toast.success(response.message);
//         router.push("/home");
//       } else {
//         const { message } = response.response?.data;
//         toast.error(message);
//       }
//       // const user = response.data.user;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const onSubmit = async (data: Login) => {
//   //   try {
//   //     // Perform the login request
//   //     console.log("Response received:", data);
//   //     const response = await login(data.email, data.password); // Assuming `login` is an API function
//   //     console.log("Response received:>", response.message);

//   //     const user = response?.user;

//   //     if (response.success) {
//   //       // Store user data in localStorage and show success toast
//   //       localStorage.setItem("user", JSON.stringify(user));
//   //       toast.success("Welcome to Menty");

//   //       dispatch(
//   //         setUser({
//   //           userId: user._id,
//   //           name: user.username,
//   //           email: user.email,
//   //           role: user.role,
//   //           profilePicUrl: user.profilePicUrl,
//   //         })
//   //       );

//   //       router.push("/home");
//   //     } else {
//   //       // Log error and handle different error messages
//   //       toast.error(response.message);
//   //       console.log("res msg =>>>>", response?.message);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   const onSubmit = async (data: Login) => {
//     try {
//       const response = await login(data.email, data.password);
      
//       if (response.success) {
//         const user = response.user;
//         localStorage.setItem("user", JSON.stringify(user));
  
//         toast.success("Welcome to Menty");
  
//         // Ensure Redux is updated before navigation
//         await dispatch(
//           setUser({
//             userId: user._id,
//             name: user.username,
//             email: user.email,
//             role: user.role,
//             profilePicUrl: user.profilePicUrl,
//           })
//         );
  
//         setTimeout(() => {
//           router.replace("/home"); // Using replace to ensure proper navigation
//         }, 100); // Adding a slight delay before navigation
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   return (
//     <div className="flex justify-evenly max-h-screen  items-center mt-10 py-3 px-5">
//       {/* Form Section */}
//       <motion.div
//         initial={{ opacity: 0, x: 50 }} // Starts slightly below the viewport
//         animate={{ opacity: 1, x: 0 }} // Moves to its final position
//         transition={{
//           duration: 1, // Duration of the animation
//           ease: "easeOut", // Smooth easing
//         }}
//         className="flex flex-col justify-center shadow-[10px_10px_0px_0px_rgb(88,22,135,0.5)] items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 "
//       >
//         <p className="text-xl font-medium text-gray-900 font-sans">
//           Log In as
//           <span className="text-purple-700 font-semibold"> Student</span>
//         </p>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={loginSchema}
//           onSubmit={onSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="space-y-6 my-4 flex flex-col justify-center">
//               {/* Email Field */}
//               <div>
//                 <InputField
//                   type="email"
//                   label="Email"
//                   name="email"
//                   placeholder="Enter Email"
//                 />
//               </div>

//               {/* Password Field */}
//               <div>
//                 <PasswordField
//                   name="password"
//                   label="Password"
//                   placeholder="Password"
//                 />
//               </div>

//               {/* Remember Me */}
//               <div className="flex items-start gap-2">
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <Field
//                       type="checkbox"
//                       name="remember"
//                       id="remember"
//                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
//                     />
//                   </div>
//                   <label
//                     htmlFor="remember"
//                     className="ms-2 text-sm font-medium text-gray-900"
//                   >
//                     Remember me
//                   </label>
//                 </div>
//                 <Link
//                   href="/forgot_password"
//                   className="ms-auto text-sm font-medium text-purple-700 hover:underline"
//                 >
//                   Lost Password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <PrimaryButton name="Login to your account" type="submit" />

//               <div className="text-sm font-medium text-gray-900 cursor-pointer">
//                 Not registered?{" "}
//                 <a href="/signup" className="text-purple-700 hover:underline">
//                   Create account
//                 </a>
//               </div>
//               <GoogleOAuthProvider clientId={`${googleUrl}`}>
//                 <div>
//                   <GoogleLogin
//                     onSuccess={googleSubmit}
//                     onError={() => console.error("Google Login Failed")}
//                   />
//                 </div>
//               </GoogleOAuthProvider>
//             </Form>
//           )}
//         </Formik>
//       </motion.div>
//     </div>
//   );
// }
"use client";

import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import { ReactElement } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField";
import PasswordField from "@/app/components/common/forms/PasswordField";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { Login } from "@/@types/LoginTypes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { StudentGoogleLogin, login } from "@/api/studentAuthentication";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import { GOOGLE_CLIENT_ID } from "@/utils/constants";
import dynamic from "next/dynamic";

const GoogleLogin = dynamic(
  () => import("@react-oauth/google").then((mod) => mod.GoogleLogin),
  { ssr: false }
);

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .transform((value) => value?.trim())
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .transform((value) => value?.replace(/\s+/g, ""))
    .matches(/^\S*$/, "Spaces are not allowed")
    .required("Password is required"),
});

export default function LoginPage(): ReactElement {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  
  const googleUrl =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "241293973300-q7m09ls0fgqv5u72ft5707edbfnnn1qc.apps.googleusercontent.com";
  
  const googleSubmit = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      let response = await StudentGoogleLogin({
        name: decoded.name,
        email: decoded.email,
        password: decoded.sub,
      });
      
      const user = response?.user;
      
      if (response.success) {
        dispatch(
          setUser({
            userId: user._id,
            name: user.username,
            email: user.email,
            role: user.role,
            profilePicUrl: user.profilePicUrl,
          })
        );
        
        toast.success(response.message);
        // router.replace("/home");
        window.location.href = "/home";//forece to redierct sunce replace is inconsistent
      } else {
        toast.error(response.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred during Google login");
    }
  };

  const onSubmit = async (data: Login) => {
    try {
      const response = await login(data.email, data.password);
      
      if (response && response.user) {
        // If you need to store user data - but you mentioned using cookies instead
        // localStorage.setItem("user", JSON.stringify(response.user));
  
        toast.success("Welcome to Menty");
  
        // Dispatch to Redux (no await needed)
        dispatch(
          setUser({
            userId: response.user._id,
            name: response.user.username,
            email: response.user.email,
            role: response.user.role,
            profilePicUrl: response.user.profilePicUrl,
          })
        );
  
        // Use replace for cleaner navigation history
        // router.replace("/home");
        setTimeout(()=>{ window.location.href = "/home"},500);
       
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    }
  };
  
  return (
    <div className="flex justify-evenly max-h-screen items-center mt-10 py-3 px-5">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="flex flex-col justify-center shadow-[10px_10px_0px_0px_rgb(88,22,135,0.5)] items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 "
      >
        <p className="text-xl font-medium text-gray-900 font-sans">
          Log In as
          <span className="text-purple-700 font-semibold"> Student</span>
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 my-4 flex flex-col justify-center">
              {/* Email Field */}
              <div>
                <InputField
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter Email"
                />
              </div>

              {/* Password Field */}
              <div>
                <PasswordField
                  name="password"
                  label="Password"
                  placeholder="Password"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-start gap-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot_password"
                  className="ms-auto text-sm font-medium text-purple-700 hover:underline"
                >
                  Lost Password?
                </Link>
              </div>

              {/* Submit Button */}
              <PrimaryButton name="Login to your account" type="submit" />

              <div className="text-sm font-medium text-gray-900 cursor-pointer">
                Not registered?{" "}
                <a href="/signup" className="text-purple-700 hover:underline">
                  Create account
                </a>
              </div>
              <GoogleOAuthProvider clientId={`${googleUrl}`}>
                <div>
                  <GoogleLogin
                    onSuccess={googleSubmit}
                    onError={() => console.error("Google Login Failed")}
                  />
                </div>
              </GoogleOAuthProvider>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}