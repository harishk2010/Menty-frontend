"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  deleteCourse,
  getAllCourses,
  getAllFilteredInstructorCourses,
  getAllInstructorCourses,
  handleListingCourse,
  handlePublish,
} from "@/api/courseApi";
import { toast } from "react-toastify";
import AlertDialog2 from "@/app/components/common/alertBoxes/AlertDialogBox2";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getInstructorDataById } from "@/api/instructorApi";
import { useRouter } from "next/navigation";
import GetVerified from "@/app/components/instructor/GetVerified";
import Loading from "@/app/components/fallbacks/Loading";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

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
  quizId: string;
}

interface Instructor {
  isVerified: boolean;
}

interface CourseResponse {
  data: ICourse[];
  total: number;
}

const InstructorCourseTable = () => {
  const { userId } = useSelector((state: RootState) => state.instructor);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [instructorData, setInstructorData] = useState<Instructor>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Pagination, sorting, and search state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCourses, setTotalCourses] = useState(0);
  const [sortField, setSortField] = useState<string>("lastUpdated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getInstructorDataById(userId);
        setInstructorData(userData || {});
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (instructorData) {
      fetchCourses();
    }
  }, [userId, instructorData, currentPage, itemsPerPage, searchTerm, sortField, sortDirection]);

  const fetchCourses = async () => {
    if (!userId) {
      toast.error("No instructor Id");
      return;
    }
    try {
      setIsLoading(true);
      const response = await getAllFilteredInstructorCourses(
        userId,
        currentPage,
        itemsPerPage,
        searchTerm,
        sortField,
        sortDirection
      );

      if (response.success) {
        setCourses(response.data.data || []);
        setTotalCourses(response.data.total);
      } else {
        toast.error(response.message || "Failed to load courses");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (field: string) => {
    // If clicking the same field, toggle direction, otherwise set new field with "asc"
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const togglePublish = async (id: string) => {
    try {
      const response = await handlePublish(id);
      if (response.success) {
        toast.success(response.message);
        fetchCourses(); // Refresh data after change
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update publish status");
    }
  };

  const toggleDelete = async (id: string) => {
    try {
      const response = await deleteCourse(id);
      if (response.success) {
        toast.success(response.message);
        fetchCourses(); // Refresh data after deletion
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course");
    }
  };

  const toggleListing = async (id: string) => {
    try {
      const response = await handleListingCourse(id);
      if (response.success) {
        toast.success(response.message);
        fetchCourses(); // Refresh data after change
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update listing status");
    }
  };

  const totalPages = Math.ceil(totalCourses / itemsPerPage);

  // Sort indicator component
  const SortIndicator = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    
    return sortDirection === "asc" ? 
      <ChevronUp className="w-4 h-4 inline-block ml-1" /> : 
      <ChevronDown className="w-4 h-4 inline-block ml-1" />;
  };

  if (isLoading) return <Loading />;
  if (!instructorData?.isVerified) return <GetVerified />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>

        <Link href={"/instructor/addCourse"}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create New Course
          </button>
        </Link>
      </div>

      {/* Search and Items Per Page */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-64 px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("courseName")}
              >
                Course <SortIndicator field="courseName" />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category <SortIndicator field="category" />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price <SortIndicator field="price" />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("isPublished")}
              >
                Status <SortIndicator field="isPublished" />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("isListed")}
              >
                Listed status <SortIndicator field="isListed" />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("rating")}
              >
                Rating <SortIndicator field="rating" />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("lastUpdated")}
              >
                Last Updated <SortIndicator field="lastUpdated" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`bg-white divide-y divide-gray-200${
              courses.length == 0 ? " flex justify-center " : ""
            }`}
          >
            {courses.length == 0 ? (
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 w-full flex items-center justify-center whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    <h1 className="text-black">No courses found!</h1>
                  </div>
                </td>
              </tr>
            ) : (
              courses.map((course) => (
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
                    <div className="text-sm text-gray-500">
                      {course.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      ₹ {course.price}
                    </div>
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
                      {course.isPublished ? "Published" : "UnPublish"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      course.isListed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                    >
                      {course.isListed ? "Listed" : "UnListed"}
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
                    {!course.quizId ? (
                      <div className="text-sm text-gray-500">
                        <Link href={`/instructor/addQuizz/${course._id}`}>
                          <button className="text-white-600  bg-purple-300 p-1 rounded-md  hover:text-purple-900">
                            Add Quizz
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        <Link href={`/instructor/editQuizz/${course.quizId}`}>
                          <button className="text-white-600  bg-purple-300 p-1 rounded-md  hover:text-purple-900">
                            Edit Quizz
                          </button>
                        </Link>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/instructor/editCourse/${course._id}`}>
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        Edit
                      </button>
                    </Link>
                    <AlertDialog2
                      title="Confirm Changes"
                      alert={`Are you sure you want to delete ${course.courseName}?`}
                      onConfirm={() => toggleDelete(course._id)}
                    >
                      <button className="ml-2 text-white-600  bg-red-300 p-1 rounded-md  hover:text-red-900">
                        Delete
                      </button>
                    </AlertDialog2>
                    {course.isPublished ? (
                      <AlertDialog2
                        title="Confirm Changes"
                        alert="Are you sure you want to update your details?"
                        onConfirm={() => togglePublish(course._id)}
                      >
                        <button className="ml-2 text-white-600  bg-red-300 p-1 rounded-md  hover:text-red-900">
                          UnPublish
                        </button>
                      </AlertDialog2>
                    ) : (
                      <AlertDialog2
                        title="Confirm Changes"
                        alert="Are you sure you want to update your details?"
                        onConfirm={() => togglePublish(course._id)}
                      >
                        <button className="ml-2 text-white-600 bg-green-300 p-1 rounded-md  hover:text-green-900">
                          Publish
                        </button>
                      </AlertDialog2>
                    )}
                    {course.isListed ? (
                      <AlertDialog2
                        title="Confirm Changes"
                        alert="Are you sure you want to UnList Course?"
                        onConfirm={() => toggleListing(course._id)}
                      >
                        <button className="ml-2 text-white-600  bg-red-300 p-1 rounded-md  hover:text-red-900">
                          UnList
                        </button>
                      </AlertDialog2>
                    ) : (
                      <AlertDialog2
                        title="Confirm Changes"
                        alert="Are you sure you want to List Course?"
                        onConfirm={() => toggleListing(course._id)}
                      >
                        <button className="ml-2 text-white-600 bg-green-300 p-1 rounded-md  hover:text-green-900">
                          List
                        </button>
                      </AlertDialog2>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {totalCourses === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, totalCourses)} of {totalCourses}{' '}
          courses
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-3 py-1 rounded-lg bg-blue-600 text-white">
            {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))}
            disabled={currentPage === totalPages || totalPages === 0 || isLoading}
            className="p-2 rounded-lg hover:bg-blue-700 bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseTable;