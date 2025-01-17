"use client";

import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import Loader from "@/app/components/fallbacks/Loader";
import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PasswordField from "@/app/components/common/forms/PasswordField";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/api/studentAuthentication"; // Replace with your API call

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
const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPasswordPage(): ReactElement {
  const router = useRouter();

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    try {
      const response = await resetPassword(data.newPassword); // Replace with your API call
      if (response.success) {
        toast.success("Password reset successfully");
        localStorage.removeItem("ForgotPassEmail")
        router.replace("/login"); // Redirect to login page
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-evenly max-h-screen items-center mt-10 py-3 px-5">
      {/* Lottie Animation */}
      {/* <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
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
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col justify-center shadow-[10px_10px_0px_0px_rgb(88,22,135,0.5)] items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8"
      >
        <h5 className="text-xl font-medium text-gray-900">
          Reset Your <span className="text-purple-700 font-semibold">Password</span>
        </h5>

        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 my-4 flex flex-col justify-center">
              {/* New Password Field */}
              <div>
                <PasswordField name="newPassword" placeholder="New Password" />
              </div>

              {/* Confirm Password Field */}
              <div>
                <PasswordField name="confirmPassword" placeholder="Confirm Password" />
              </div>

              {/* Submit Button */}
              <PrimaryButton name="Reset Password" type="submit" />

              <div className="text-sm font-medium text-gray-900 cursor-pointer">
                Remember your password?{" "}
                <a href="/login" className="text-purple-700 hover:underline">
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
