"use client";

import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import Loader from "@/app/components/fallbacks/Loader";
import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField";
import PasswordField from "@/app/components/common/forms/PasswordField";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { findEmailAction } from "@/redux/store/auth/findEmailAction";
import { useDispatch} from "react-redux"
import { signup } from "@/api/userAuthentication";
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion";
import { signUp } from "@/@types/signUpType";

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
const signupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(/^\S*$/, "Password must not contain spaces")
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupPage(): ReactElement {
  const [error,setError]=useState("")
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const router=useRouter()


  const handleSubmit = async (values:signUp) => {
    const {name, email, password,  confirmPassword} = values
  try {

    const response = await signup(values);
    console.log(response,"ressss")
    if (response.success) {
      toast.success(response.data.message);
    } 

  } catch (error:any) {
    if (error.response?.status === 404) {
      toast.error(error.response.data.message);
    
  } else {
      console.log('error: ', error)
  }
  }
   
};


  return (
    <div className="flex flex-1 justify-center  max-h-screen items-center mt-4 py-3 px-5">
      {/* Lottie Animation */}
      <motion.div
          initial={{ opacity: 0, x: -50 }} // Starts slightly below the viewport
          animate={{ opacity: 1, x: 0 }} // Moves to its final position
          transition={{
            duration: 1, // Duration of the animation
            ease: "easeOut", // Smooth easing
          }} className="sm:block hidden mr-24">
        <Player
          autoplay
          loop
          style={{ height: "400px", width: "400px" }}
          src="https://lottie.host/0527ab17-4073-49bd-bc4d-6c17cb7295f9/cRRMSdyI2l.json"
        />
      </motion.div>

      {/* Form Section */}
      <motion.div
          initial={{ opacity: 0, x: 50 }} // Starts slightly below the viewport
          animate={{ opacity: 1, x: 0 }} // Moves to its final position
          transition={{
            duration: 1, // Duration of the animation
            ease: "easeOut", // Smooth easing
          }} className="flex flex-col justify-center shadow-[10px_10px_0px_0px_rgb(88,22,135,0.5)] items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8">
        <h5 className="text-xl font-medium text-gray-900">
          Sign Up as{" "}
          <span className="text-purple-700 font-semibold">Instructor</span>
        </h5>
        {error&&<p className="text-red-600">{error}</p>}

        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 my-4 flex flex-col justify-center">
              {/* Email Field */}
              <div>
                <InputField type="email" name="email" placeholder="Email" />
              </div>

              {/* Password Field */}
              <div>
                <PasswordField name="password" placeholder="Password" />
              </div>

              {/* Confirm Password Field */}
              <div>
                <PasswordField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>

              {/* Submit Button */}
              <PrimaryButton type="submit" name="Register Account"  />

              <div className="text-sm font-medium text-gray-900 cursor-pointer">
                Have an account?{" "}
                <a href="/instructor/login" className="text-purple-700 hover:underline">
                  Log In
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}
