"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField2";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/app/components/fallbacks/Loader";
import { getInstructorData, updateProfile } from "@/api/instructorApi";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { getRequestData, reVerifyRequest, sendVerification } from "@/api/verificationApi";
import { useRouter } from "next/navigation";

const VerificationSchema = Yup.object().shape({
  username: Yup.string()
  .min(5, "Username must be at least 5 characters")
  .matches(/^\S.*\S$|^\S$/, "Username cannot start or end with a space")
  .required("Username is Required"),
  degreeCertificate: Yup.mixed().required("Degree Certificate is required"),
  resume: Yup.mixed().nullable().required("Resume is required"),
});

export default function VerificationForm() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [degreePreview, setDegreePreview] = useState<string | null>(null);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  const loggedIn = useSelector((state: RootState) => state.instructor.email);
  const User = useSelector((state: RootState) => state.instructor);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && User?.email) {
        try {
          const fetchedData = await getInstructorData(User.email);
          const fetchRequest = await getRequestData(User.email);
          console.log("req===>", fetchRequest?.data);
          setUserData(fetchRequest?.data || {});
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, [loggedIn, User]);

  if (!userData) {
    return <Loader />;
  }

 
  const handleSubmit = async (data: any) => {
    console.log(data, User.email, "formData");
    const email = User.email;
    const formData = new FormData();
  
    if (data.degreeCertificate) {
      formData.append("degreeCertificate", data.degreeCertificate);
    }
  
    if (data.resume) {
      formData.append("resume", data.resume);
    }
  
    formData.append("username", data.username);
    if (email) {
      formData.append("email", email);
    }
  
    try {
      const response = await sendVerification(formData);
      console.log("API Response:", response);
  
      if (response && response.success) {
        toast.success(response.message);
        setUserData(response.data); // Use response.data instead of response.user
        router.replace("/instructor/profile");
      } else {
        console.error("Invalid response:", response);
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const reverifySumbit = async (data: any) => {
    console.log(data, User.email, "reverify ==>formData");
    const email = User.email;
    const formData = new FormData();

    if (data.degreeCertificate) {
      formData.append("degreeCertificate", data.degreeCertificate);
    }

    if (data.resume) {
      formData.append("resume", data.resume);
    }

    formData.append("username", data.username);
    if (email) {
      formData.append("email", email);
    }

    try {
      const response = await reVerifyRequest(formData);
      console.log("API Response:", response);

      if (response && response.message && response.data) {
        toast.success(response.message);
        setUserData(response.data);
        router.replace("/instructor/profile");
      } else {
        console.error("Invalid response:", response);
        toast.error("Reverification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in reverifySumbit:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleFilePreview = (
    file: File | null,
    setPreview: (url: string | null) => void
  ) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
    } else {
      setPreview(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white shadow rounded-lg p-6 mt-6 max-w-7xl mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">Verification Form</h2>

      <Formik
        initialValues={{
          username: userData?.username || "",
          degreeCertificate: userData?.degreeCertificateUrl || null,
          resume: userData?.resumeUrl || null,
        }}
        enableReinitialize
        validationSchema={VerificationSchema}
        onSubmit={Object.keys(userData).length > 0 ? reverifySumbit : handleSubmit}
      >
        {({
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-4">
            <div>
              <InputField
                label="Username"
                type="text"
                name="username"
                value={values.username || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Username"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 space-y-4 ">
              <div className="flex flex-col justify-center items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree Certificate
                </label>
                <input
                  type="file"
                  name="degreeCertificate"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    setFieldValue("degreeCertificate", file);
                    handleFilePreview(file, setDegreePreview);
                  }}
                  className="mt-1 block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="degreeCertificate"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
                {degreePreview ? (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Preview:</p>
                    <div
                      style={{
                        backgroundImage: `url(${degreePreview})`,
                      }}
                      className="w-64 h-64 bg-cover border rounded-lg"
                      title="Degree Certificate Preview"
                    />
                  </div>
                ) : userData.degreeCertificateUrl ? (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Preview:</p>
                    <div
                      style={{
                        backgroundImage: `url(${userData.degreeCertificateUrl})`,
                      }}
                      className="w-64 h-64 bg-cover border rounded-lg"
                      title="Degree Certificate Preview"
                    />
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Preview:</p>
                    <div
                      className=" flex flex-col justify-center items-center w-64 h-64 bg-cover border rounded-lg"
                      title="Degree Certificate Preview"
                    >
                      <ImageNotSupportedIcon className="text-black text-sm " />
                      <p className="text-black text-sm">No Document Uploaded</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume
                </label>
                <input
                  type="file"
                  name="resume"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    setFieldValue("resume", file);
                    handleFilePreview(file, setResumePreview);
                  }}
                  className="mt-1 block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="resume"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
                {resumePreview ? (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Preview:</p>
                    <div
                      style={{
                        backgroundImage: `url(${resumePreview})`,
                      }}
                      className="w-64 h-64 bg-cover border rounded-lg"
                      title="Degree Certificate Preview"
                    />
                  </div>
                ) : userData.resumeUrl ? (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Preview:</p>
                    <div
                      style={{
                        backgroundImage: `url(${userData.resumeUrl})`,
                      }}
                      className="w-64 h-64 bg-cover border rounded-lg"
                      title="Degree Certificate Preview"
                    />
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Preview:</p>
                    <div
                      className=" flex flex-col justify-center items-center w-64 h-64 bg-cover border rounded-lg"
                      title="Degree Certificate Preview"
                    >
                      <ImageNotSupportedIcon className="text-black text-sm " />
                      <p className="text-black text-sm">No Document Uploaded</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid w-full">
              {Object.keys(userData).length > 0 ? (
                <PrimaryButton
                  type="submit"
                  name={isSubmitting ? "Submitting..." : "Reverify"}
                />
              ) : (
                <PrimaryButton
                  type="submit"
                  name={isSubmitting ? "Submitting..." : "Submit"}
                />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}