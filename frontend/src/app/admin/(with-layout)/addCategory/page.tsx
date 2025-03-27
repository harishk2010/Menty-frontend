"use client"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AlertDialog2 from "@/app/components/common/alertBoxes/AlertDialogBox2"; // Import your AlertDialog2 component
import InputField from "@/app/components/common/forms/InputField";
import { addCategory } from "@/api/adminApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignupSchema = Yup.object().shape({
  categoryName: Yup.string().required("Name is required")
  .min(4,"Minimum 4 letters Needed"),
});

const MyForm = () => {

    const router=useRouter()
  const handleSubmit = async(values: { categoryName: string }) => {
    const {categoryName}=values

    try {
      const response=await addCategory(categoryName)
    if(response.success){
      toast.success(response.message)
        router.replace('/admin/category')
    }else{
      toast.error(response.message)
    }
      
    } catch (error:any) {
      toast.error(error.message)
      
    }
    
    
  };

  return (
    <Formik
      initialValues={{ categoryName: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
      validateOnMount 
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="mb-4">
            <InputField 
            label="category name"
            type="text"
            name="categoryName"
            placeholder="Enter Catgeory Name"

            />
            
            </div>


          {/* AlertDialog2 wrapped around the submit button */}
          <AlertDialog2
            alert="Are you sure you want to submit this form?"
            title="Confirm Submission"
            onConfirm={handleSubmit} // Calls Formik's handleSubmit on confirmation
          >
            <button
              type="button"
              
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Submit
            </button>
          </AlertDialog2>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
