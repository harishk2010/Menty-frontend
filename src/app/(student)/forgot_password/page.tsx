"use client";

import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import Loader from "@/app/components/fallbacks/Loader";
import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { sendResetLink } from "@/api/studentAuthentication";
// import { sendResetLink } from "@/api/userAuthentication"; // Assuming this is the API function

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
const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPasswordPage(): ReactElement {
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: "",
  };

  const onSubmit = async (data: { email: string }) => {
    try {
      // Perform the request to send reset link
      const response = await sendResetLink(data.email);
      console.log(response.message);
      if (response?.success) {
        localStorage.setItem("ForgotPassEmail", response.data.email);
        toast.success(response.message);
        
        router.replace("/forgot-password-otp");
      } else {
        toast.error(
          response?.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-evenly max-h-screen items-center mt-10 py-3 px-5">
      {/* Lottie Animation */}
      {/* <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="sm:block hidden lg:mr-36"
      >
        <Player
          autoplay
          loop
          style={{ height: "400px", width: "400px" }}
          src="https://lottie.host/be2302b1-71d9-4ba5-ad8c-68b3e4d9923a/VFsZzRBBvQ.json"
        />
      </motion.div> */}

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
        <h5 className="text-xl font-medium text-gray-900">Forgot Password</h5>

        <Formik
          initialValues={initialValues}
          validationSchema={emailSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 my-4 flex flex-col justify-center">
              {/* Email Field */}
              <div>
                <InputField
                label="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>

              {/* Submit Button */}
              {!loader ? (
                <PrimaryButton type="submit" name="Verify Email" />
              ) : (
                <Loader />
              )}

              <div className="text-sm font-medium text-gray-900 cursor-pointer">
                Remembered?{" "}
                <a
                  href="/login"
                  className="text-purple-700 hover:underline"
                >
                  Log in here
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}
