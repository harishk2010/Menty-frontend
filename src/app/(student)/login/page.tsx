"use client";

import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import Loader from "@/app/components/fallbacks/Loader";
import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField";
import PasswordField from "@/app/components/common/forms/PasswordField";


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

// Validation Schemas
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const signupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
  .matches(/^\S*$/, "Password must not contain spaces")
  .min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function LoginPage(): ReactElement {
  const [isLogin, setIsLogin] = useState(true);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form Data: ", values);
    // Handle login or signup logic here
  };

  return (
    <div className="flex justify-evenly max-h-screen items-center my-8 py-3 px-5">
      {/* Lottie Animation */}
      <div className="sm:block hidden">
        <Player
          autoplay
          loop
          style={{ height: "400px", width: "400px" }}
          src="https://lottie.host/be2302b1-71d9-4ba5-ad8c-68b3e4d9923a/VFsZzRBBvQ.json"
        />
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center shadow-md items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8">
        <h5 className="text-xl font-medium text-gray-900">
          {isLogin ? "Log In" : "Sign Up"} as{" "}
          <span className="text-purple-700 font-semibold">Student</span>
        </h5>

        <Formik
          initialValues={initialValues}
          validationSchema={isLogin ? loginSchema : signupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 my-4 flex flex-col justify-center">
              {/* Email Field */}
              <div>
              <InputField  type="email"
                  name="email"
                  placeholder="Email"/>
              </div>

              {/* Password Field */}
              <div>
              <PasswordField name="password" placeholder="Password"  />
              </div>

              {/* Confirm Password Field */}
              {!isLogin && (
                <div>
                   <PasswordField name="confirmPassword" placeholder="confirmPassword"  />
                  
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-start gap-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="ms-auto text-sm font-medium text-purple-700 hover:underline"
                >
                  Lost Password?
                </a>
              </div>

              {/* Submit Button */}
              <PrimaryButton
                name={isLogin ? "Login to your account" : "Register Account"}
              />
              <div
                onClick={() => setIsLogin((prev) => !prev)}
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                {isLogin ? (
                  <>
                    Not registered?{" "}
                    <a className="text-purple-700 hover:underline">
                      Create account
                    </a>
                  </>
                ) : (
                  <>
                    Have an account?{" "}
                    <a className="text-purple-700 hover:underline">Log In</a>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
