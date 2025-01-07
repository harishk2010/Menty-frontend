"use client";

import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import Loader from "@/app/components/fallbacks/Loader";
import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField";
import PasswordField from "@/app/components/common/forms/PasswordField";
import { useRouter } from "next/navigation";
import Link from "next/link"


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
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupPage(): ReactElement {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const router=useRouter()

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Signup Data: ", values);
    localStorage.setItem("signupData",JSON.stringify(values))
    router.push('/instructor/instructor-form1')


    
    // Add signup logic here
  };

  return (
    <div className="flex justify-evenly  max-h-screen items-center mt-24 py-3 px-5">
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
          Sign Up as{" "}
          <span className="text-purple-700 font-semibold">Instructor</span>
        </h5>

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
              <PrimaryButton name="Register Account" />

              <div className="text-sm font-medium text-gray-900 cursor-pointer">
                Have an account?{" "}
                <a href="/instructor/login" className="text-purple-700 hover:underline">
                  Log In
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
