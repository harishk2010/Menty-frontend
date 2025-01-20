"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/forms/InputField";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import { motion } from "framer-motion";

const PersonalDetailsSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, "Invalid phone number")
    .required("Phone is required"),
  profession: Yup.string().required("Profession is required"),
});

export default function PersonalDetailsForm() {
  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    profession: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form Data Submitted:", values);
    // Add form submission logic here
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
        initialValues={initialValues}
        validationSchema={PersonalDetailsSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <InputField
                type="text"
                name="fullName"
                placeholder="User Name"
               
              />
            </div>
            <div>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                
              />
            </div>
            <div>
              <InputField
                type="tel"
                name="phone"
                placeholder="Phone"
                
              />
            </div>
            <div>
              <InputField
                type="text"
                name="profession"
                placeholder="Profession"
               
              />
            </div>
            <div className="col-span-full ">
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
