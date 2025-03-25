"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getInstructorData, updateProfile } from "@/api/instructorApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getCategories } from "@/api/adminApi";
import { User, Phone, BookOpen, Camera, X } from "lucide-react";

// Validation schema
const PersonalDetailsSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .matches(/^\S.*\S$|^\S$/, "Username cannot start or end with a space")
    .required("Username is Required"),
  mobile: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, "Invalid phone number")
    .required("Phone is required"),
  profile: Yup.mixed().nullable()
    .test(
      "profile-required",
      "Profile Image is needed!",
      function (value) {
        // If profilePicUrl exists, no need for a new file
        if (this.parent.profilePicUrl) return true;
        // Otherwise, a file is required
        return !!value;
      }
    ),
  expertise: Yup.string().min(3, "Expertise must be at least 3 characters").required("Expertise is Required"),
});

interface Expertise {
  _id: string,
  categoryName: string
}

export default function EditProfile() {
  const [instructorData, setInstructorData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [expertiseOptions, setExpertiseOptions] = useState<Expertise[] | null>();
  const [isLoading, setIsLoading] = useState(false);

  const loggedIn = useSelector((state: RootState) => state.instructor.email);
  const Instructor = useSelector((state: RootState) => state.instructor);

  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && Instructor?.email) {
        setIsLoading(true);
        try {
          const fetchedData = await getInstructorData(Instructor.email);
          const expertises = await getCategories();
          
          setExpertiseOptions(expertises || []);
          setInstructorData(fetchedData || {});
        } catch (error) {
          console.error("Error fetching instructor data:", error);
          toast.error("Failed to load profile data");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, [loggedIn, Instructor]);

  const handleImagePreview = (file: File | null) => {
    if (file) {
      // Validate file is an image
      if (!file.type.startsWith('image/')) {
        toast.warn("Please select an image file");
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.warn('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      const formData = new FormData();

      // Check if profile image exists and append it to form data
      if (data.profile && data.profile instanceof File) {
        formData.append("profile", data.profile);
      }

      // Append other fields
      for (const key of Object.keys(data)) {
        if (key !== "profile") {
          formData.append(key, data[key]);
        }
      }

      const response = await updateProfile(formData);
      
      if (response) {
        toast.success("Profile updated successfully");
        setInstructorData(response.user);
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !instructorData) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-700">Please log in to edit your profile.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6">
        <h2 className="text-2xl font-bold text-white">Personal Details</h2>
        <p className="text-purple-100 mt-1">Update your profile information</p>
      </div>

      {instructorData && (
        <Formik
          initialValues={{
            ...instructorData,
            profilePicUrl: instructorData?.profilePicUrl || "",
          }}
          validationSchema={PersonalDetailsSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            errors,
            touched
          }) => (
            <Form className="p-6">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={containerVariants}
              >
                {/* Username Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={values.username || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your username"
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.username && touched.username 
                          ? "border-red-500" 
                          : "border-gray-300"
                      } rounded-md shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                    />
                  </div>
                  {errors.username && touched.username && (
                    <p className="mt-1 text-sm text-red-600">{String(errors.username)}</p>
                  )}
                </motion.div>

                {/* Phone Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      value={values.mobile || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your phone number"
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.mobile && touched.mobile 
                          ? "border-red-500" 
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                    />
                  </div>
                  {errors.mobile && touched.mobile && (
                    <p className="mt-1 text-sm text-red-600">{String(errors.mobile)}</p>
                  )}
                </motion.div>

                {/* Expertise Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expertise
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="expertise"
                      value={values.expertise || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.expertise && touched.expertise 
                          ? "border-red-500" 
                          : "border-gray-300"
                      } rounded-md shadow-sm text-gray-800 focus:ring-purple-500 focus:border-purple-500 sm:text-sm appearance-none`}
                    >
                      <option value="" disabled>Select your expertise</option>
                      {expertiseOptions?.map((option) => (
                        <option key={option._id} value={option.categoryName}>
                          {option.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.expertise && touched.expertise && (
                    <p className="mt-1 text-sm text-red-600">{String(errors.expertise)}</p>
                  )}
                </motion.div>

                {/* Profile Picture */}
                <motion.div 
                  variants={itemVariants}
                  className="sm:col-span-2 flex flex-col items-center"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>

                  <div className="relative w-32 h-32 mb-4">
                    {imagePreview ? (
                      <div
                        className="w-full h-full rounded-full bg-cover bg-center border-4 border-purple-100 shadow-md"
                        style={{
                          backgroundImage: `url(${imagePreview})`,
                        }}
                      />
                    ) : values.profilePicUrl ? (
                      <div
                        className="w-full h-full rounded-full bg-cover bg-center border-4 border-purple-100 shadow-md"
                        style={{
                          backgroundImage: `url(${values.profilePicUrl})`,
                        }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-4 border-purple-100 shadow-md">
                        <Camera className="h-10 w-10 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row w-full max-w-md space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="relative flex-grow">
                      <input
                        type="file"
                        name="profile"
                        id="profile-upload"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0] || null;
                          setFieldValue("profile", file);
                          handleImagePreview(file);
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="profile-upload"
                        className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Choose Image
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue("profile", null);
                        handleImagePreview(null);
                      }}
                      className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-blue-700"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </button>
                    <button className="bg-green-700 font-serif font-semibold hover:bg-black rounded-md px-4 py-2">hari</button>
                  </div>
                  {errors.profile && touched.profile && (
                    <p className="mt-2 text-sm text-red-600">{String(errors.profile)}</p>
                  )}
                </motion.div>
              </motion.div>

              {/* Submit Button */}
              <motion.div 
                className="mt-8"
                variants={itemVariants}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </motion.div>
            </Form>
          )}
        </Formik>
      )}
    </motion.div>
  );
}