"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCourses, getAllInstructorCourses, handlePublish } from "@/api/courseApi";
import { toast } from "react-toastify";
import AlertDialog2 from "@/app/components/common/alertBoxes/AlertDialogBox2";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ICourse {
  _id: string;
  courseName: string;
  category: string;
  price: number;
  level: string;
  isPublished: boolean;
  isListed: boolean;
  lastUpdated: string;
  rating: number;
  quizId:string;
}

const InstructorCourseTable = () => {
  const Instructor = useSelector((state: RootState) => state.instructor);
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    try {
      const fetchCourses = async () => {
        if(!Instructor.userId){
          toast.error("No instructor Id")
          return
        }
        const response = await getAllInstructorCourses(Instructor.userId);
        console.log(response,"response")
        setCourses(response.data || []);
      };
      fetchCourses();
    } catch (error) {}
  }, []);

  const togglePublish = async (id: string) => {
    try {
      const response = await handlePublish(id); // Assuming this API updates the backend
      if (response.success) {
        toast.success(response.message);
  
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === id
              ? { ...course, isPublished: !course.isPublished } // Toggle the status correctly
              : course
          )
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
        {}
        <Link href={"/instructor/addCourse"}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create New Course
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr
                key={course._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {course.courseName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{course.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{course.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      course.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    { course.isPublished?"Published" :"UnPublish"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">
                      {course.rating}
                    </span>
                    <svg
                      className="w-4 h-4 text-yellow-400 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    <Link href={`/instructor/chapters/${course._id}`}>
                  <button className="text-white-600  bg-purple-300 p-1 rounded-md  hover:text-purple-900">
                        Manage Chapters
                      </button>
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {
                    !course.quizId?<div className="text-sm text-gray-500">
                    <Link href={`/instructor/addQuizz/${course._id}`}>
                  <button className="text-white-600  bg-purple-300 p-1 rounded-md  hover:text-purple-900">
                        Add Quizz
                      </button>
                    </Link>
                  </div>:<div className="text-sm text-gray-500">
                    <Link href={`/instructor/editQuizz/${course.quizId}`}>
                  <button className="text-white-600  bg-purple-300 p-1 rounded-md  hover:text-purple-900">
                        Edit Quizz
                      </button>
                    </Link>
                  </div>
                  }
                  
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/instructor/editCourse/${course._id}`}>
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </button>
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                  {course.isPublished ? (
                    <AlertDialog2
                      title="Confirm Changes"
                      alert="Are you sure you want to update your details?"
                      onConfirm={() => togglePublish(course._id)}
                    >
                      <button className="text-white-600  bg-red-300 p-1 rounded-md  hover:text-red-900">
                        UnPublish
                      </button>
                    </AlertDialog2>
                  ) : (
                    <AlertDialog2
                      title="Confirm Changes"
                      alert="Are you sure you want to update your details?"
                      onConfirm={() => togglePublish(course._id)}
                    >
                      <button className="text-white-600 bg-green-300 p-1 rounded-md  hover:text-green-900">
                        Publish
                      </button>
                    </AlertDialog2>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorCourseTable;
