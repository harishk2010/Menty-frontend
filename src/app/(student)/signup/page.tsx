"use client";

import dynamic from "next/dynamic";
import { ReactElement, useState, useMemo, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { signup } from "@/api/studentAuthentication";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { signUp } from "@/@types/signUpType";

// Dynamically import components
const PrimaryButton = dynamic(
  () => import("@/app/components/buttons/PrimaryButton")
);
const Loader = dynamic(() => import("@/app/components/fallbacks/Loader"));
const InputField = dynamic(
  () => import("@/app/components/common/forms/InputField")
);
const PasswordField = dynamic(
  () => import("@/app/components/common/forms/PasswordField")
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
  const [loader, setLoader] = useState(false);
  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const router = useRouter();

  // Prefetch routes
  useMemo(() => {
    router.prefetch("/otp");
    router.prefetch("/login");
  }, [router]);

  const handleSubmit = useCallback(
    async (values: signUp) => {
      try {
        setLoader(true);
        const response = await signup(values);
        if (response.success) {
          localStorage.setItem("verificationTokenStudent", response.token);
          localStorage.setItem("email", values.email);
          toast.success(response.message);
          router.replace("/otp");
        } else {
          toast.error(response.message);
          setLoader(false);
        }
      } catch (error: any) {
        toast.error(error.message || "Unknown Error Occurred!");
        setLoader(false);
      }
    },
    [router]
  );

  return (
    <div className="flex flex-1 justify-center max-h-screen items-center mt-4 py-3 px-5">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col justify-center shadow-[10px_10px_0px_0px_rgb(88,22,135,0.5)] items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8"
      >
        <p className="text-xl font-medium text-gray-900 font-sans">
          Sign Up as 
          <span className="text-purple-700 font-semibold"> Student</span>
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false} // Optimize validation
          validateOnChange={false} // Optimize validation
        >
          {() => (
            <Form className="space-y-6 my-4 flex flex-col justify-center">
              <div>
                <InputField type="email" name="email" placeholder="Email" />
              </div>
              <div>
                <PasswordField name="password" placeholder="Password" />
              </div>
              <div>
                <PasswordField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              {!loader ? (
                <PrimaryButton type="submit" name="Register Account" />
              ) : (
                <Loader />
              )}
              <div className="text-sm font-medium text-gray-900 cursor-pointer">
                Have an account?{" "}
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
