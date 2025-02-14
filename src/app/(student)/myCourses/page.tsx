
"use client"
import React, { useEffect, useState } from "react";
import { Clock, BookOpen, Award, Play } from "lucide-react";
import { getAllBoughtCourses } from "@/api/courseApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";
interface completedChapters{
    isCompleted:boolean;
    chapterId:string

}

interface Course {
    _id: string;
    courseDetails: {
      _id: string;
      courseName: string;
      level: string;
      thumbnailUrl: string;
      quizId:string;
    };
    userId: string;
    instructorId: string;
    transactionId: string;
    completedChapters: completedChapters[]; // You can replace `object[]` with a proper type if you know the structure
    isCourseCompleted: boolean;
    purchasedAt: string;
    createdAt: string;
    updatedAt: string;
    
  }
  
const PurchasedCoursesPage = () => {
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const userDetails = useSelector((state: RootState) => state.user);
  const { userId } = userDetails;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!userId) {
          console.error("User ID is invalid");
          return;
        }
        const response = await getAllBoughtCourses(userId);
        console.log("Fetched courses:", response.data.courses); // Debug log
        if (Array.isArray(response.data.courses)) {
          setPurchasedCourses(response?.data?.courses || []);
          setFilteredCourses(response);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

console.log(purchasedCourses[0],"purcourse")

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
          <div className="flex gap-4 text-black">
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option>All Courses</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option>Recently Accessed</option>
              <option>courseName A-Z</option>
              <option>Progress</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6">
          {purchasedCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-72 h-48 md:h-auto">
                  <img
                    src={course.courseDetails.thumbnailUrl || ""}
                    alt={course.courseDetails.courseName}
                    className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                  />
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {course.courseDetails.courseName}
                      </h2>
                      <p className="text-gray-600">
                        Instructor: {course.instructorId}
                      </p>
                    </div>
                    <Link href={`/coursePlay/${course._id}`}>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Play size={20} />
                      Continue Learning
                    </button>
                    </Link>
                    {

                    }
                    <Link href={`/attendQuiz/${course.courseDetails?.quizId}`}>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Play size={20} />
                     Attend Quiz
                    </button>
                    </Link>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">
                        {/* {course.progress}% */}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                        // style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>
                        {/* {course.completedHours} / {course.totalHours} hours */}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      <span>
                        {course.completedChapters.filter((course)=>course?.isCompleted).length || 0} / {course.completedChapters.length} lessons
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} />
                      <span>Certificate Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchasedCoursesPage;
