"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField2";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getInstructorData, updateProfile } from "@/api/instructorApi";
import { toast } from "react-toastify";
import Loader from "@/app/components/fallbacks/Loader";
import { useRouter } from "next/navigation";
import { getCategories } from "@/api/adminApi";

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
  expertise: Yup.string().min(3, "expertise must be at least 3 characters").required("Expertised is Required"),
  // skills: Yup.string().min(3, "skill must be at least 3 characters").required("Skills is important"),
});

interface Expertise{
  _id:string,
  categoryName:string
}

export default function PersonalDetailsForm() {
  
  const [studentData, setStudentData] = useState<any>(null); // Initially set to null
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [expertiseOptions,setExpertiseOptions]=useState<Expertise[] | null>()

  const loggedIn = useSelector((state: RootState) => state.instructor.email);
  const Instructor = useSelector((state: RootState) => state.instructor);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && Instructor?.email) {
        try {
          const fetchedData = await getInstructorData(Instructor.email);
          const expertises=await getCategories()
          // if(!expertises){
          //   throw new Error("No Expertises!")
          // }
          console.log(expertises,"expertesise")
          setExpertiseOptions(expertises|| [])
          setStudentData(fetchedData || {}); // Set fetched data or empty object
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, [loggedIn, Instructor]);

  // Check if studentData is null and show a loading state
  if (studentData === null) {
    return <Loader />;
  }
  const handleImagePreview = (file: File | null) => {
    if (file) {
      // Validate file is an image
                if (!file.type.startsWith('image/')) {
                 toast.warn("Choose Only Image Files!")
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

  const handleSubmit = async (data: typeof studentData) => {
    console.log('data: ', data)

    const formData = new FormData();

    // Check if profile image exists and append it to form data
    if (data.profile && data.profile) {
      formData.append("profile", data.profile);
    }

    // Append other fields
    for (const key of Object.keys(data)) {
      if (key !== "profile") {
        formData.append(key, data[key]);
      }
    }

    // Log form data for debugging
    for (const [key, value] of formData.entries()) {
      if (key == "profile") console.log(`${key}:`, value);
    }
    

    const response = await updateProfile(formData);
    console.log("response:", response.user);
    if (response) {
      toast.success(response.message);
      setStudentData(response.user);
      router.replace("/instructor/profile");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white shadow rounded-lg p-6 mt-6 max-w-7xl mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>

      <Formik
        initialValues={{
          ...studentData,
          profilePicUrl: studentData?.profilePicUrl || "",
        }}
        // enableReinitialize // Reinitialize Formik when studentData is updated
        validationSchema={PersonalDetailsSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          touched
        }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <InputField
                label="Username"
                type="text"
                name="username"
                value={values.username || ""} // Ensure controlled input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Username"
              />
            </div>

            <div>
              <InputField
                label="Phone"
                type="tel"
                name="mobile"
                value={values.mobile || ""} // Ensure controlled input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Phone No"
              />
            </div>
            {/* <div>
              <InputField
                label="Expertise"
                type="text"
                name="expertise"
                value={values.expertise || ""} // Ensure controlled input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Expertised Field"
              />
            </div> */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expertise
              </label>
              <select
                name="expertise"
                value={values.expertise || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full py-2 px-3 border text-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Select your expertise</option>
                {expertiseOptions?.map((option,index) => (
                  <option key={option._id} value={option.categoryName}>
                    {option.categoryName}
                  </option>
                ))}
              </select>
              <ErrorMessage
                name="expertise"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* <div>
              <InputField
                label="skills"
                type="text"
                name="skills"
                value={values.skills || ""} // Ensure controlled input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your skills ..."
              />
            </div> */}

            <div className="flex flex-col items-center col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>

              <div className="relative w-32 h-32 mb-4">
                {imagePreview ? (
                  <div
                    className="w-full h-full rounded-full bg-cover bg-center border-4 border-gray-300 shadow-md"
                    style={{
                      backgroundImage: `url(${imagePreview})`,
                    }}
                  />
                ) : values.profilePicUrl ? (
                  <div
                    className="w-full h-full rounded-full bg-cover bg-center border-4 border-gray-300 shadow-md"
                    style={{
                      backgroundImage: `url(${values.profilePicUrl})`,
                    }}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-300 shadow-md">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <div className="flex w-full space-x-3 justify-center items-center">
                <input
                  type="file"
                  name="profile"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    setFieldValue("profile", file);
                    handleImagePreview(file);
                  }}
                  className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                                  name="profile"
                                  component="div"
                                  className="text-red-500 text-xs mt-1"
                                />
                <button
                  className="bg-red-600 p-3 rounded-full w-1 h-1 text-center flex items-center justify-center"
                  type="button"
                  onClick={() => {
                    setFieldValue("profile", null);
                    handleImagePreview(null);
                  }}
                >
                  x
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <PrimaryButton
                type="submit"
                name={isSubmitting ? "Saving..." : "Save Changes"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
