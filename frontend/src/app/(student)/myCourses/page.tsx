// "use client"
// import React, { useEffect, useState } from "react";
// import { Clock, BookOpen, Award, Play, AwardIcon } from "lucide-react";
// import { getAllBoughtCourses } from "@/api/courseApi";
// import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// interface completedChapters{
//     isCompleted:boolean;
//     chapterId:string

// }

// interface Course {
//     _id: string;
//     courseDetails: {
//       _id: string;
//       courseName: string;
//       level: string;
//       thumbnailUrl: string;
//       quizId:string;
//     };
//     userId: string;
//     instructorId: string;
//     transactionId: string;
//     completedChapters: completedChapters[]; // You can replace `object[]` with a proper type if you know the structure
//     isCourseCompleted: boolean;
//     purchasedAt: string;
//     createdAt: string;
//     updatedAt: string;

//   }

// const PurchasedCoursesPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
// const router=useRouter()
//   const userDetails = useSelector((state: RootState) => state.user);
//   const { userId } = userDetails;

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         if (!userId) {
//           console.error("User ID is invalid");
//           return;
//         }
//         const response = await getAllBoughtCourses(userId);
//         console.log("Fetched courses:", response.data.courses); // Debug log
//         if (Array.isArray(response.data.courses)) {
//           setPurchasedCourses(response?.data?.courses || []);
//           setFilteredCourses(response);
//         }
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

// console.log(purchasedCourses[0],"purcourse")

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
//           <div className="flex gap-4 text-black">
//             <select className="px-4 py-2 border rounded-lg bg-white">
//               <option>All Courses</option>
//               <option>In Progress</option>
//               <option>Completed</option>
//             </select>
//             <select className="px-4 py-2 border rounded-lg bg-white">
//               <option>Recently Accessed</option>
//               <option>courseName A-Z</option>
//               <option>Progress</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid gap-6">
//           {purchasedCourses.map((course) => (
//             <div
//               key={course._id}
//               className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
//             >
//               <div className="flex flex-col md:flex-row">
//                 <div className="md:w-72 h-48 md:h-auto">
//                   <img
//                     src={course.courseDetails.thumbnailUrl || ""}
//                     alt={course.courseDetails.courseName}
//                     className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
//                   />
//                 </div>

//                 <div className="flex-1 p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-900 mb-2">
//                         {course.courseDetails.courseName}
//                       </h2>
//                       {
//                         course.isCourseCompleted&&<p className="text-white px-3 rounded-md py-1 w-44 bg-green-600 text-wrap">
//                         Course Completed
//                       </p>
//                       }
//                       <p className="text-gray-600">
//                         Instructor: {course.instructorId}
//                       </p>
//                     </div>
//                     <Link href={`/coursePlay/${course._id}`}>
//                     <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                       <Play size={20} />
//                       Continue Learning
//                     </button>
//                     </Link>
//                     {
//                       course.isCourseCompleted?<button
//                       onClick={() => router.push(`/certificate/${course._id}`)}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       <Award size={20} />
//                       Get Certificate
//                     </button>:<Link href={`/attendQuiz/${course.courseDetails?.quizId}`}>
//                     <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                       <Play size={20} />
//                      Attend Quiz
//                     </button>
//                     </Link>

//                     }

//                   </div>

//                   <div className="mb-4">
//                     <div className="flex justify-between mb-2">
//                       <span className="text-sm text-gray-600">Progress</span>
//                       <span className="text-sm font-medium">
//                         {/* {course.progress}% */}
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-blue-600 rounded-full h-2 transition-all duration-300"
//                         // style={{ width: `${course.progress}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                       <Clock size={16} />
//                       <span>
//                         {/* {course.completedHours} / {course.totalHours} hours */}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <BookOpen size={16} />
//                       <span>
//                         {course.completedChapters.filter((course)=>course?.isCompleted).length || 0} / {course.completedChapters.length} lessons
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Award size={16} />
//                       <span>Certificate Available</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchasedCoursesPage;
"use client";
import React, { useEffect, useState } from "react";
import {
  Clock,
  BookOpen,
  Award,
  Play,
  ArrowUpDown,
  Sparkles,
  Filter,
  ArrowRight,
  UsersIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { getAllBoughtCourses } from "@/api/courseApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CompletedChapter {
  isCompleted: boolean;
  chapterId: string;
}

interface Course {
  _id: string;
  courseDetails: {
    _id: string;
    courseName: string;
    level: string;
    thumbnailUrl: string;
    quizId: string;
  };
  userId: string;
  instructorId: string;
  transactionId: string;
  completedChapters: CompletedChapter[];
  isCourseCompleted: boolean;
  purchasedAt: string;
  createdAt: string;
  updatedAt: string;
}

const PurchasedCoursesPage = () => {
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("recent");
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
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
        if (Array.isArray(response?.data?.courses)) {
          setPurchasedCourses(response.data.courses || []);
          setDisplayedCourses(response.data.courses || []);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...purchasedCourses];

    // Apply status filter
    if (statusFilter === "inProgress") {
      filtered = filtered.filter((course) => !course.isCourseCompleted);
    } else if (statusFilter === "completed") {
      filtered = filtered.filter((course) => course.isCourseCompleted);
    }

    // Apply sorting
    if (sortOption === "alphabetical") {
      filtered.sort((a, b) =>
        a.courseDetails.courseName.localeCompare(b.courseDetails.courseName)
      );
    } else if (sortOption === "progress") {
      filtered.sort((a, b) => {
        const progressA = getProgressPercentage(a);
        const progressB = getProgressPercentage(b);
        return progressB - progressA;
      });
    } else if (sortOption === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    }

    setDisplayedCourses(filtered);
  }, [statusFilter, sortOption, purchasedCourses]);

  // Calculate progress percentage
  const getProgressPercentage = (course: Course): number => {
    if (!course.completedChapters || course.completedChapters.length === 0)
      return 0;
    const completedCount = course.completedChapters.filter(
      (chapter) => chapter.isCompleted
    ).length;
    return Math.round((completedCount / course.completedChapters.length) * 100);
  };

  // Calculate estimated hours
  const estimateHours = (
    course: Course
  ): { completed: number; total: number } => {
    const totalChapters = course.completedChapters.length;
    const completedChapters = course.completedChapters.filter(
      (chapter) => chapter.isCompleted
    ).length;
    // Assuming each chapter takes approximately 1 hour
    const hourPerChapter = 1;
    return {
      completed: completedChapters * hourPerChapter,
      total: totalChapters * hourPerChapter,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading your learning journey...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-purple-900 opacity-50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            My Learning Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-3xl text-lg"
          >
            Track your progress, continue learning, and achieve your goals
          </motion.p>
        </div>
      </div>

      {/* Course List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {purchasedCourses.length} Courses
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="recent">Recently Updated</option>
                <option value="alphabetical">Course Name A-Z</option>
                <option value="progress">Progress</option>
              </select>
            </div>
          </div>
        </motion.div>

        {displayedCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-6">
              Looks like you don't have any courses matching your current
              filters.
            </p>
            <Link href="/courses">
              <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Explore Courses
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {displayedCourses.map((course, index) => {
              const progress = getProgressPercentage(course);
              const hours = estimateHours(course);

              return (
                // <motion.div
                //   key={course._id}
                //   initial={{ opacity: 0, y: 20 }}
                //   animate={{ opacity: 1, y: 0 }}
                //   transition={{ duration: 0.5, delay: index * 0.1 }}
                //   className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                // >
                //   <div className="flex flex-col md:flex-row">
                //     <div className="md:w-72 h-48 md:h-auto relative">
                //       <img
                //         src={course.courseDetails.thumbnailUrl || "/api/placeholder/400/300"}
                //         alt={course.courseDetails.courseName}
                //         className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                //       />
                //       <div className="absolute top-0 right-0 m-2">
                //         <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                //           course.courseDetails.level === "Beginner" ? "bg-green-100 text-green-800" :
                //           course.courseDetails.level === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                //           "bg-red-100 text-red-800"
                //         }`}>
                //           {course.courseDetails.level || "All Levels"}
                //         </span>
                //       </div>
                //     </div>

                //     <div className="flex-1 p-6">
                //       <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                //         <div>
                //           <h2 className="text-xl font-semibold text-gray-900 mb-2">
                //             {course.courseDetails.courseName}
                //           </h2>

                //           {course.isCourseCompleted && (
                //             <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                //               <CheckCircle2Icon className="w-4 h-4 mr-1" />
                //               Course Completed
                //             </span>
                //           )}
                //         </div>

                //         <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                //           <Link href={`/coursePlay/${course._id}`}>
                //             <button className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full">
                //               <Play size={18} />
                //               Continue Learning
                //             </button>
                //           </Link>

                //           {course.isCourseCompleted ? (
                //             <button
                //               onClick={() => router.push(`/certificate/${course._id}`)}
                //               className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full"
                //             >
                //               <Award size={18} />
                //               Get Certificate
                //             </button>
                //           ) : (
                //             <Link href={`/attendQuiz/${course.courseDetails?.quizId}`}>
                //               <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full">
                //                 <BookOpen size={18} />
                //                 Attend Quiz
                //               </button>
                //             </Link>
                //           )}
                //         </div>
                //       </div>

                //       {/* <div className="mb-4">
                //         <div className="flex justify-between mb-2">
                //           <span className="text-sm text-gray-600">Progress</span>
                //           <span className="text-sm font-medium text-gray-900">{progress}%</span>
                //         </div>
                //         <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                //           <div
                //             className={`h-2.5 rounded-full transition-all duration-300 ${
                //               progress >= 100 ? 'bg-green-600' : 'bg-purple-600'
                //             }`}
                //             style={{ width: `${progress}%` }}
                //           ></div>
                //         </div>
                //       </div> */}
                //       <div className="mb-4">
                //         <div className="flex justify-between mb-2">
                //           <span className="text-sm text-gray-600">Progress</span>
                //           <span className="text-sm font-medium text-gray-900">{progress}%</span>
                //         </div>
                //         <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                //           <div
                //             className={`h-2.5 rounded-full transition-all duration-300 ${
                //               progress >= 100 ? 'bg-green-600' : 'bg-purple-600'
                //             }`}
                //             style={{ width: `${progress}%` }}
                //           ></div>
                //         </div>
                //       </div>

                //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                //         {/* <div className="flex items-center gap-2">
                //           <Clock size={16} className="text-purple-600" />
                //           <span>
                //             {hours.completed} / {hours.total} hours
                //           </span>
                //         </div> */}
                //         <div className="flex items-center gap-2">
                //           <BookOpen size={16} className="text-purple-600" />
                //           <span>
                //             {course.completedChapters.filter(chapter => chapter?.isCompleted).length || 0} / {course.completedChapters.length} lessons
                //           </span>
                //         </div>
                //         <div className="flex items-center gap-2">
                //           <Award size={16} className="text-purple-600" />
                //           <span>{course.isCourseCompleted ? "Certificate Ready" : "Complete to earn"}</span>
                //         </div>
                //       </div>

                //       <div className="mt-4 pt-4 border-t border-gray-100">
                //         <div className="text-xs text-gray-500">
                //           Purchased: {new Date(course.purchasedAt).toLocaleDateString('en-US', {
                //             year: 'numeric',
                //             month: 'short',
                //             day: 'numeric'
                //           })}
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                // </motion.div>
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-72 h-48 md:h-64 relative overflow-hidden">
                      <div className="absolute inset-0">
                        <img
                          src={
                            course.courseDetails.thumbnailUrl ||
                            "/api/placeholder/400/300"
                          }
                          alt={course.courseDetails.courseName}
                          className="w-full h-full object-cover object-center rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                        />
                      </div>
                      <div className="absolute top-0 right-0 m-2">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            course.courseDetails.level === "Beginner"
                              ? "bg-green-100 text-green-800"
                              : course.courseDetails.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.courseDetails.level || "All Levels"}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            {course.courseDetails.courseName}
                          </h2>

                          {course.isCourseCompleted && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                              <CheckCircle2Icon className="w-4 h-4 mr-1" />
                              Course Completed
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                          <Link href={`/coursePlay/${course._id}`}>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full">
                              <Play size={18} />
                              Continue Learning
                            </button>
                          </Link>

                          {course.isCourseCompleted ? (
                            <button
                              onClick={() =>
                                router.push(`/certificate/${course._id}`)
                              }
                              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full"
                            >
                              <Award size={18} />
                              Get Certificate
                            </button>
                          ) : (
                            <Link
                              href={`/attendQuiz/${course.courseDetails?.quizId}`}
                            >
                              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full">
                                <BookOpen size={18} />
                                Attend Quiz
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">
                            Progress
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              progress >= 100 ? "bg-green-600" : "bg-purple-600"
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <BookOpen size={16} className="text-purple-600" />
                          <span>
                            {course.completedChapters.filter(
                              (chapter) => chapter?.isCompleted
                            ).length || 0}{" "}
                            / {course.completedChapters.length} lessons
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award size={16} className="text-purple-600" />
                          <span>
                            {course.isCourseCompleted
                              ? "Certificate Ready"
                              : "Complete to earn"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Purchased:{" "}
                          {new Date(course.purchasedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Motivational Section */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Keep Learning, Keep Growing
              </h2>
              <p className="text-lg opacity-90 mb-6">
                Your journey of growth never stops. Build new skills, expand
                your knowledge, and achieve your goals with our expert-led
                courses.
              </p>
              <Link href="/courses">
                <button className="inline-flex items-center px-5 py-3 bg-white text-purple-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  Discover More Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500 bg-opacity-30 rounded-full">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Learn at Your Pace</h3>
                </div>
                <p className="text-sm opacity-80">
                  Access your courses anytime, anywhere, and learn at your own
                  schedule.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500 bg-opacity-30 rounded-full">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Earn Certificates</h3>
                </div>
                <p className="text-sm opacity-80">
                  Complete courses to earn verified certificates that showcase
                  your skills.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500 bg-opacity-30 rounded-full">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Quality Content</h3>
                </div>
                <p className="text-sm opacity-80">
                  Learn from industry experts with carefully crafted curriculum.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500 bg-opacity-30 rounded-full">
                    <UsersIcon className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Join Community</h3>
                </div>
                <p className="text-sm opacity-80">
                  Connect with fellow learners and exchange knowledge and
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// // Add this component to fix the CheckCircle icon being undefined
// const CheckCircle = ({ className }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//       <polyline points="22 4 12 14.01 9 11.01" />
//     </svg>
//   );
// };

// // Add this to import the Users icon
// const Users = ({ className, size }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={size || 24}
//       height={size || 24}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   );
// };

export default PurchasedCoursesPage;
