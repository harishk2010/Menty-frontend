"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AlertDialog2 from "@/app/components/common/alertBoxes/AlertDialogBox2"; // Import your AlertDialog2 component
import InputField from "@/app/components/common/forms/InputField";
import { addCategory, editCategory, getCategory } from "@/api/adminApi";
import { toast } from "react-toastify";
import { Pen } from "lucide-react";
import { useParams } from "next/navigation";
import CustomField from "@/app/components/common/forms/CustomField";
import { useRouter } from "next/navigation";
const SignupSchema = Yup.object().shape({
  categoryName: Yup.string()
    .required("Name is required")
    .min(4, "Minimum 4 letters Needed"),
});

const MyForm = () => {
  const [data, setData] = useState({ categoryName: "" });
  const { id } = useParams<{ id: string }>();

  const router=useRouter()

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (id) {
          const response = await getCategory(id);
          setData({categoryName:response.categoryName||""});
        }
      };
      fetchData()
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);
  const handleSubmit = async (values: { categoryName: string }) => {
    const { categoryName } = values;

   

    try {
      const response = await editCategory(id,categoryName);
      if (response.success) {
        toast.success(response.message);
        router.replace('/admin/category')
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
      validateOnMount
      enableReinitialize
      
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // ✅ Prevents form submission on Enter
          }}}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="mb-4">
            <CustomField
              label="category name"
              type="text"
              name="categoryName"
              placeholder="Enter Catgeory Name"
              defaultValue={data.categoryName}
              
          
              
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
