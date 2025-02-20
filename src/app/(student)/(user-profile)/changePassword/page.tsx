"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField2";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { updatePassword } from "@/api/studentApi";
import { toast } from "react-toastify";

export default function UpdatePasswordForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const loggedIn = useSelector((state: RootState) => state.user.email);
  const Student = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!loggedIn || !Student?.email) {
      setIsLoggedIn(false);
    }
  }, [loggedIn, Student]);

  // If the user is not logged in, redirect or show an error (optional)
  if (!isLoggedIn) {
    return <p>Please log in to update your password.</p>;
  }
  const passwordSchema = Yup.string()
    .trim()
    .matches(/^\S*$/, "Password must not contain spaces")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/\d/, "Password must have at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must have at least one special character (@$!%*?&)"
    )
    .required("Password is required");
  const PasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/^\S*$/, "Spaces are not allowed")
      .required("Current password is required"),

    newPassword: passwordSchema,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .matches(/^\S*$/, "Spaces are not allowed")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const response = await updatePassword(data);
      if (response?.success) {
        toast.success(response.message || "Password updated successfully");
      } else {
        toast.error(response?.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred while updating the password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white shadow rounded-lg p-6 mt-6 max-w-7xl mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">Update Password</h2>

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={PasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Form className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <InputField
                label="Current Password"
                type="password"
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <InputField
                label="New Password"
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter a new password"
              />
            </div>

            <div>
              <InputField
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your new password"
              />
            </div>

            <div className="col-span-full">
              <PrimaryButton
                type="submit"
                name={isSubmitting ? "Updating..." : "Update Password"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
