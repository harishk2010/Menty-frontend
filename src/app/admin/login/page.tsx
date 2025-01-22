"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PrimaryColorButton from "@/app/components/buttons/PrimaryColorButton";
import { ReactElement } from "react";
import InputField from "@/app/components/common/forms/InputField";
import PasswordField from "@/app/components/common/forms/PasswordField";
import { adminLogin } from "@/api/adminAuthentication";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage(): ReactElement {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const router= useRouter()
  // Handle form submission
  const handleSubmit = async(values: { email: string; password: string }) => {

    const response= await adminLogin(values) 
    if(response.success){
      toast.success(response.message)
      router.push('/admin/dashboard')
     
    }else{
      toast.error(response.message)
    }
    console.log("Form Values:", response);
    // Add login API logic here
  };

  return (
    <div className="flex justify-center h-screen items-center bg-gray-800 px-5">
      <div className="flex  flex-col justify-center shadow-md shadow-blue-300 items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8">
        <h5 className="text-xl font-medium text-gray-900">
          Log In as <span className="text-gray-700 font-semibold">Admin</span>
        </h5>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 my-4 flex flex-col justify-center">
              <div>
                
                <InputField
                label="email"
                type="email"
                  name="email"
                  placeholder="Enter Email"/>
              </div>

              <div>
                <PasswordField label="password" name="password" placeholder="Enter Password"  />
              </div>

              <PrimaryColorButton
                name={isSubmitting ? "Logging in..." : "Login to your account"}
                colorOne={"gray-700"}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
