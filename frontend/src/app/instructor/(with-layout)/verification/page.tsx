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
import { getInstructorData } from "@/api/instructorApi";
import {
  getRequestData,
  reVerifyRequest,
  sendVerification,
} from "@/api/verificationApi";
import { useRouter } from "next/navigation";
import { FileText, Award, UserCircle, Info } from "lucide-react";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

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
  const [loading, setLoading] = useState(true);

  const loggedIn = useSelector((state: RootState) => state.instructor.email);
  const User = useSelector((state: RootState) => state.instructor);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && User?.email) {
        try {
          setLoading(true);
          const fetchedData = await getInstructorData(User.email);
          //check if already verified
          if (fetchedData?.isVerified) {
            toast.success("You are already verified");
            router.replace("/instructor/profile");

            return;
          }

          const fetchRequest = await getRequestData(User.email);
          setUserData(fetchRequest?.data || {});
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [loggedIn, User]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: any) => {
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

      if (response && response.success) {
        toast.success(response.message);
        setUserData(response.data);
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
    <div className="p-6 bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6 max-w-7xl mx-auto"
      >
        {/* Header Card */}
        <div className="bg-white px-6 py-5 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Instructor Verification
            </h1>
          </div>
        </div>
        {userData.comments?.length > 0 && (
          <div className="bg-red-200 px-3 py-2 rounded-lg shadow-lg border border-red-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <Info className="w-6 h-6 text-red-600 " />
              </div>
              <div className="p-2 rounded-lg">
                <h1 className="text-lg font-semibold text-red-700">Note:</h1>
              </div>
              <h1 className="text-md font-semibold text-gray-800">
                {" "}
                {userData.comments}{" "}
              </h1>
            </div>
          </div>
        )}

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <Formik
            initialValues={{
              username: userData?.username || "",
              degreeCertificate: userData?.degreeCertificateUrl || null,
              resume: userData?.resumeUrl || null,
            }}
            enableReinitialize
            validationSchema={VerificationSchema}
            onSubmit={
              Object.keys(userData).length > 0 ? reverifySumbit : handleSubmit
            }
          >
            {({
              isSubmitting,
              values,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <Form className="p-6">
                {/* Username field */}
                <div className="mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <UserCircle className="w-5 h-5 text-blue-600" />
                      <h2 className="text-sm font-medium text-gray-600">
                        Username
                      </h2>
                    </div>
                    <div className="pl-7">
                      <InputField
                        label=""
                        type="text"
                        name="username"
                        value={values.username || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your Username"
                      />
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Verification Documents
                  </h2>
                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    {/* Resume */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="flex flex-col"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h2 className="text-sm font-medium text-gray-600">
                          Resume
                        </h2>
                      </div>
                      <div className="relative group">
                        <div
                          className={`h-72 w-full rounded-lg border border-gray-300 bg-cover bg-center transition-all duration-300 group-hover:border-blue-500 ${
                            !resumePreview && !userData.resumeUrl
                              ? "flex flex-col justify-center items-center bg-gray-50"
                              : ""
                          }`}
                          style={
                            resumePreview
                              ? { backgroundImage: `url(${resumePreview})` }
                              : userData.resumeUrl
                              ? {
                                  backgroundImage: `url(${userData.resumeUrl})`,
                                }
                              : {}
                          }
                        >
                          {!resumePreview && !userData.resumeUrl && (
                            <>
                              <ImageNotSupportedIcon className="text-gray-400 text-lg" />
                              <p className="text-gray-500 text-sm mt-2">
                                No Document Uploaded
                              </p>
                            </>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-all duration-300">
                          <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer">
                            Upload Resume
                            <input
                              type="file"
                              name="resume"
                              accept="image/*"
                              onChange={(event) => {
                                const file = event.target.files?.[0] || null;
                                setFieldValue("resume", file);
                                handleFilePreview(file, setResumePreview);
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <ErrorMessage
                        name="resume"
                        component="div"
                        className="text-red-500 text-xs mt-2"
                      />
                    </motion.div>

                    {/* Degree Certificate */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="flex flex-col"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-blue-600" />
                        <h2 className="text-sm font-medium text-gray-600">
                          Degree Certificate
                        </h2>
                      </div>
                      <div className="relative group">
                        <div
                          className={`h-72 w-full rounded-lg border border-gray-300 bg-cover bg-center transition-all duration-300 group-hover:border-blue-500 ${
                            !degreePreview && !userData.degreeCertificateUrl
                              ? "flex flex-col justify-center items-center bg-gray-50"
                              : ""
                          }`}
                          style={
                            degreePreview
                              ? { backgroundImage: `url(${degreePreview})` }
                              : userData.degreeCertificateUrl
                              ? {
                                  backgroundImage: `url(${userData.degreeCertificateUrl})`,
                                }
                              : {}
                          }
                        >
                          {!degreePreview && !userData.degreeCertificateUrl && (
                            <>
                              <ImageNotSupportedIcon className="text-gray-400 text-lg" />
                              <p className="text-gray-500 text-sm mt-2">
                                No Document Uploaded
                              </p>
                            </>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-all duration-300">
                          <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer">
                            Upload Certificate
                            <input
                              type="file"
                              name="degreeCertificate"
                              accept="image/*"
                              onChange={(event) => {
                                const file = event.target.files?.[0] || null;
                                setFieldValue("degreeCertificate", file);
                                handleFilePreview(file, setDegreePreview);
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <ErrorMessage
                        name="degreeCertificate"
                        component="div"
                        className="text-red-500 text-xs mt-2"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  className="mt-10"
                >
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : Object.keys(userData).length > 0
                      ? "Reverify"
                      : "Submit"}
                  </button>
                </motion.div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
}
