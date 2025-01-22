"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField2";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getStudentData, updateProfile } from "@/api/studentApi";
import { toast } from "react-toastify";

const PersonalDetailsSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .required("Full Name is required"),
  
  mobile: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, "Invalid phone number")
    .required("Phone is required"),
});

export default function PersonalDetailsForm() {
  const [studentData, setStudentData] = useState<any>(null); // Initially set to null
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const loggedIn = useSelector((state: RootState) => state.user.email);
  const Student = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && Student?.email) {
        try {
          const fetchedData = await getStudentData(Student.email);
          setStudentData(fetchedData || {}); // Set fetched data or empty object
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
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values: typeof studentData) => {
    const id=values._id
    const formData = {
      username: values.username,
      mobile: values.phone,
      
    };
    console.log("Form Data Submitted:", values);
    const response=await updateProfile(id,formData)
    console.log("response:", response.user);
    if(response){
      toast.success(response.message)
      setStudentData(response.user)
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
        initialValues={studentData}
        enableReinitialize // Reinitialize Formik when studentData is updated
        validationSchema={PersonalDetailsSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange, handleBlur }) => (
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
