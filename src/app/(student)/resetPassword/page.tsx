"use client";

import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import { ReactElement } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PasswordField from "@/app/components/common/forms/PasswordField";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/api/studentAuthentication"; 


const passwordSchema = Yup.string()
  .trim()
  .matches(/^\S*$/, "Password must not contain spaces") 
  .min(6, "Password must be at least 6 characters") 
  .matches(/[A-Z]/, "Password must have at least one uppercase letter")
  .matches(/[a-z]/, "Password must have at least one lowercase letter") 
  .matches(/\d/, "Password must have at least one number") 
  .matches(/[@$!%*?&]/, "Password must have at least one special character (@$!%*?&)") 
  .required("Password is required");
// Validation Schema
const resetPasswordSchema = Yup.object().shape({
  newPassword:passwordSchema,
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
        router.replace("/login"); 
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
                <PasswordField label="New Password"name="newPassword" placeholder="New Password" />
              </div>

              {/* Confirm Password Field */}
              <div>
                <PasswordField label="Confirm Password" name="confirmPassword" placeholder="Confirm Password" />
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
