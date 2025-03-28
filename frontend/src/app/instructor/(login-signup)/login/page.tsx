"use client";

import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import Loader from "@/app/components/fallbacks/Loader";
import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField";
import PasswordField from "@/app/components/common/forms/PasswordField";
import { jwtDecode } from 'jwt-decode';
import {motion} from "framer-motion"
import { Login } from "@/@types/LoginTypes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/instructorSlice";
import { useDispatch, useSelector } from "react-redux";
import { instructorGoogleLogin, login } from "@/api/userAuthentication";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { GOOGLE_CLIENT_ID } from "@/utils/constants";
import { RootState } from "@/redux/store";
// Dynamically import the Player component from Lottie with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div>
        <Loader />
      </div>
    ),
  }
);

// Validation Schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage(): ReactElement {

  const router= useRouter()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state:RootState) => state.instructor.userId?true:false);

  if(isLoggedIn){
    router.replace(`/instructor/dashboard`);
  }

  const initialValues = {
    email: "",
    password: "",
  };
  const googleSubmit = async (credentialResponse: any) => {


    try {
      const decoded: any = jwtDecode(credentialResponse.credential)
      let response = await instructorGoogleLogin({ name: decoded.name, email: decoded.email, password: decoded.sub })
      const user = response?.user;
      if (response.success) {
   
        dispatch((setUser({
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePicUrl:user.profilePicUrl
        })))
        toast.success(response.message)
        router.push('/instructor/dashboard')

      } else {
        const { message } = response.response?.data
        toast.error(message)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data: Login) => {
    try {
      
      const response = await login(data.email,data.password); 

      const user = response?.user;

      if (user) {
      
       
        toast.success("Welcome to Menty");

        dispatch((setUser({
          userId: user._id,
          name: user.username,
          email: user.email,
          role: user.role,
          profilePicUrl:user.profilePicUrl
        })))

            
          router.replace(`/instructor/dashboard`);
       
      } else {
      
        toast.error(response.message);

      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex justify-evenly max-h-screen  items-center  ">
      {/* Lottie Animation */}
     
      

      
      <motion.div
          initial={{ opacity: 0, x: -50 }} // Starts slightly below the viewport
          animate={{ opacity: 1, x: 0 }} // Moves to its final position
          transition={{
            duration: 1, // Duration of the animation
            ease: "easeOut", // Smooth easing
          }} className="sm:block hidden  lg:mr-36">
        <Player
          autoplay
          loop
          style={{ height: "400px", width: "400px" }}
          src="https://lottie.host/be2302b1-71d9-4ba5-ad8c-68b3e4d9923a/VFsZzRBBvQ.json"
        />
      </motion.div>

      {/* Form Section */}
      <motion.div
          initial={{ opacity: 0, x: 50 }} // Starts slightly below the viewport
          animate={{ opacity: 1, x: 0 }} // Moves to its final position
          transition={{
            duration: 1, // Duration of the animation
            ease: "easeOut", // Smooth easing
          }} className="flex flex-col justify-center shadow-[10px_10px_0px_0px_rgb(88,22,135,0.5)] h-s w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-4">
        <h5 className="text-xl font-medium text-gray-900">
          Log In as{" "}
          <span className="text-purple-700 font-semibold">Instructor</span>
        </h5>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 my-4 flex flex-col justify-center">
              {/* Email Field */}
              <div>
                <InputField label="email" type="email" name="email" placeholder="Email" />
              </div>

              {/* Password Field */}
              <div>
                <PasswordField label="password" name="password" placeholder="Password" />
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
                <Link href="/instructor/forgot_password" className="ms-auto text-sm font-medium text-purple-700 hover:underline">
                
                  Lost Password?
                
                </Link>
              </div>

              {/* Submit Button */}
              <PrimaryButton name="Login to your account" type="submit" />

              <div className="text-sm font-medium text-gray-900 cursor-pointer">
                Not registered?{" "}
                <a href="/instructor/signup" className="text-purple-700 hover:underline">
                  Create account
                </a>
              </div>
              <GoogleOAuthProvider clientId="241293973300-q7m09ls0fgqv5u72ft5707edbfnnn1qc.apps.googleusercontent.com">
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
