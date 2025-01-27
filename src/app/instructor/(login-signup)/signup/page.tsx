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
import { signup } from "@/api/userAuthentication";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { signUp } from "@/@types/signUpType";


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
  username:Yup.string().min(5,"Username must be atleast 5 characters")
    .required("Username is Required"),
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
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const router = useRouter();

  const handleSubmit = async (values: signUp) => {
    try {
      setLoader((prev) => !prev);

      const response = await signup(values);
      console.log(response, "ressss");
      if (response.success) {
       
        localStorage.setItem("verificationToken",response.token);
        localStorage.setItem("email",values.email)
        console.log("sucess");

        toast.success(response.message);
        router.replace("/instructor/otp");
      } else {
        toast.error(response.message);
        setLoader((prev) => !prev);
      }
    } catch (error: any) {
      toast.error(error.message || "Unknown Error Occured !");
    }
  };

  return (
    <div className="flex flex-1 justify-center  max-h-screen items-center mt-4 py-3 px-5">
 
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
        <h5 className="text-xl font-medium text-gray-900">
          Sign Up as{" "}
          <span className="text-purple-700 font-semibold">Instrutor</span>
        </h5>
        {error && <p className="text-red-600">{error}</p>}

        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-2 my-1 flex flex-col justify-center">
             <div>
                <InputField type="username" name="username" label="Username" placeholder="Enter Your Name" />
              </div>
              <div>
                <InputField label="email" type="email" name="email" placeholder="Email" />
              </div>

          
              <div>
                <PasswordField label="password" name="password" placeholder="Password" />
              </div>

        
              <div>
                <PasswordField
                label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm Password..."
                />
              </div>

          
              {!loader ? (
                <PrimaryButton type="submit" name="Register Account" />
              ) : (
                <Loader />
              )}

              <div className="text-sm font-medium text-gray-900 cursor-pointer">
                Have an account?{" "}
                <a
                  href="/login"
                  className="text-purple-700 hover:underline"
                >
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
