// import ProfilePage from "@/app/components/students/pages/Profile";

// export default function profile(){
//     return (
//         <ProfilePage/>

//     )
// }
"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Book,
  Award,
  Bookmark,
  Clock,
  ChevronDown,
  ChevronUp,
  UserCircle,
  Settings,
  Lock,
} from "lucide-react";
import {
  getAllStudents,
  getStudentData,
  updateProfile,
  updatePassword,
} from "@/api/studentApi";
import { toast } from "react-toastify";
import Loader from "@/app/components/fallbacks/Loader";
import AlertDialog2 from "@/app/components/common/alertBoxes/AlertDialogBox2";
import InputField from "@/app/components/common/forms/InputField2";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";

// Form validation schemas
const PersonalDetailsSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .matches(/^\S.*\S$|^\S$/, "Username cannot start or end with a space")
    .required("Username is Required"),

  mobile: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, "Invalid phone number")
    .required("Phone is required"),

  profile: Yup.mixed().nullable(),
});

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^\S*$/, "Spaces are not allowed")
    .required("Current password is required"),

  newPassword: Yup.string()
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
    .required("Password is required"),
    
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .matches(/^\S*$/, "Spaces are not allowed")
    .required("Confirm password is required"),
});
type ExpandedSectionsType = {
  [key: string]: boolean;
};


export default function ProfilePage() {
  const [studentData, setStudentData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [expandedSections, setExpandedSections] = useState<ExpandedSectionsType>({
    personal: true,
    password: false
  });

  const loggedIn = useSelector((state: RootState) => state.user.email);
  const Student = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && Student?.email) {
        try {
          const fetchedData = await getStudentData(Student.email);
          setStudentData(fetchedData || {});
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, [loggedIn, Student]);

  // Check if studentData is null and show a loading state
  if (studentData === null) {
    return <Loader />;
  }
  
  const handleImagePreview = (file: File | null) => {
    if (file) {
      // Validate file is an image
      if (!file.type.startsWith('image/')) {
        toast.warn("Choose Only Image Files!");
        return null;
      }
       
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.warn('Image size should be less than 5MB');
        return null;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      return file; // Return the valid file
    } else {
      setImagePreview(null);
      return null;
    }
  };

  const handleProfileSubmit = async (data: typeof studentData) => {
    const formData = new FormData();

    // Check if profile image exists and append it to form data
    if (data.profile instanceof File) {
      formData.append("profile", data.profile);
    }

    // Append other fields
    for (const key of Object.keys(data)) {
      if (key !== "profile" && data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await updateProfile(formData);
      if (response) {
        toast.success(response.message);
        setStudentData(response.user);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (data: {
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

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-800 to-purple-700 h-64">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">My Profile</h1>
            <p className="mt-2 text-lg text-purple-100">Manage your personal information and preferences</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Overview Card */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 flex items-center justify-center p-6 bg-gray-50">
                <div className="relative w-32 h-32">
                  {studentData?.profilePicUrl ? (
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center border-4 border-gray-300 shadow-md"
                      style={{
                        backgroundImage: `url(${studentData.profilePicUrl})`,
                      }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-300 shadow-md">
                      <UserCircle className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="text-2xl font-bold text-gray-800">
                  {studentData?.username || "Student Name"}
                </div>
                <div className="mt-2 text-gray-600">
                  {studentData?.email || "email@example.com"}
                </div>
                <div className="mt-1 text-gray-600">
                  {studentData?.mobile || "Phone number not provided"}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    Student
                  </span>
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Active Account
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white shadow rounded-lg p-6 text-center flex flex-col items-center"
          >
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <Book className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">12</h2>
            <p className="text-gray-600 mt-2">Enrolled Courses</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow rounded-lg p-6 text-center flex flex-col items-center"
          >
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">7</h2>
            <p className="text-gray-600 mt-2">Certificates Earned</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white shadow rounded-lg p-6 text-center flex flex-col items-center"
          >
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">98%</h2>
            <p className="text-gray-600 mt-2">Completion Rate</p>
          </motion.div>
        </div>

        {/* Personal Details Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white shadow rounded-lg overflow-hidden mb-8"
        >
          <div 
            className="p-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('personal')}
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-4">
                <UserCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>
            </div>
            {expandedSections.personal ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.personal && (
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <Formik
                initialValues={{
                  ...studentData,
                  profilePicUrl: studentData?.profilePicUrl || "",
                }}
                enableReinitialize
                validationSchema={PersonalDetailsSchema}
                onSubmit={handleProfileSubmit}
              >
                {({
                  isSubmitting,
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col justify-evenly">

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

                    <div>
                      <InputField
                        label="Phone"
                        type="tel"
                        name="mobile"
                        value={values.mobile || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your Phone No"
                        />
                    </div>
                        </div>

                    <div className="flex flex-col items-center col-1">
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
                      <div className="flex w-full max-w-md space-x-3 justify-center items-center">
                        <input
                          type="file"
                          name="profile"
                          accept="image/*"
                          className="hidden"
                          id="profile-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            const validFile = handleImagePreview(file);
                            setFieldValue("profile", validFile);
                          }}
                        />
                        <label
                          htmlFor="profile-upload"
                          className="cursor-pointer bg-purple-100 text-purple-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-200 transition duration-150"
                        >
                          Choose File
                        </label>
                        {imagePreview && (
                          <button
                            type="button"
                            className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200 transition duration-150"
                            onClick={() => {
                              setImagePreview(null);
                              setFieldValue("profile", null);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>

                    <div className=" col-span-full ">
                      <button className="bg-purple-500 hover:bg-purple-700 py-2 w-full rounded-lg">Submit</button>
                      {/* <PrimaryButton
                      name={"Submit"}
                        // type="submit"
                        // disabled={isSubmitting}
                        // className="w-full md:w-auto"
                      >
                        
                      </PrimaryButton> */}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </motion.div>

        {/* Password Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white shadow rounded-lg overflow-hidden mb-8"
        >
          <div 
            className="p-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('password')}
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-4">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
            </div>
            {expandedSections.password ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.password && (
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={PasswordSchema}
                onSubmit={handlePasswordSubmit}
              >
                {({ isSubmitting ,handleChange, handleBlur, values  }) => (
                  <Form className="grid grid-cols-1 gap-6">
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
              <button className="bg-purple-500 py-2 w-full">{isSubmitting ? "Updating..." : "Update Password"}</button>
              {/* <PrimaryButton
                type="submit"
                name={isSubmitting ? "Updating..." : "Update Password"}
              /> */}
            </div>
                    
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </motion.div>

        {/* Account Settings Section */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          <div className="p-6 flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-4">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Account Settings</h2>
          </div>
          
          <div className="px-6 pb-6 border-t border-gray-100 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Course Reminders</h3>
                  <p className="text-sm text-gray-500">Get reminders about upcoming deadlines and events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}