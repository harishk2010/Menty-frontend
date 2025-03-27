"use client";
import React, { useEffect, useState } from "react";
import {
  Award,
  ArrowUpDown,
  Filter,
  Sparkles,
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
  };
  userId: string;
  isCourseCompleted: boolean;
  completedChapters: CompletedChapter[];
  createdAt: string;
}

const CertificatesPage = () => {
  const [loading, setLoading] = useState(true);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [sortOption, setSortOption] = useState("recent");
  const [levelFilter, setLevelFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const userDetails = useSelector((state: RootState) => state.user);
  const { userId } = userDetails;

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        if (!userId) {
          console.error("User ID is invalid");
          return;
        }
        const response = await getAllBoughtCourses(userId);
        if (Array.isArray(response?.data?.courses)) {
          // Filter only completed courses
          const completed = response.data.courses.filter(
            (course: Course) => course.isCourseCompleted
          );
          setCompletedCourses(completed || []);
          setDisplayedCourses(completed || []);
        }
      } catch (error) {
        console.error("Failed to fetch completed courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedCourses();
  }, [userId]);

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...completedCourses];

    // Apply level filter
    if (levelFilter !== "all") {
      filtered = filtered.filter(
        (course) => course.courseDetails.level === levelFilter
      );
    }

    // Apply sorting
    if (sortOption === "alphabetical") {
      filtered.sort((a, b) =>
        a.courseDetails.courseName.localeCompare(b.courseDetails.courseName)
      );
    } else if (sortOption === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setDisplayedCourses(filtered);
  }, [levelFilter, sortOption, completedCourses]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading your certificates...
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
            My Certificates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-3xl text-lg"
          >
            Celebrate your learning achievements and showcase your skills
          </motion.p>
        </div>
      </div>

      {/* Certificates List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Your Certificates
            </h2>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {completedCourses.length} Certificates
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
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
                <option value="recent">Recently Earned</option>
                <option value="alphabetical">Course Name A-Z</option>
              </select>
            </div>
          </div>
        </motion.div>

        {displayedCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Certificates Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Complete your courses to earn and display your certificates here.
            </p>
            <Link href="/courses">
              <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Explore Courses
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {displayedCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-72 h-48 md:h-64 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={
                          course.courseDetails.thumbnailUrl ||
                          "/api/placeholder/400/300"
                        }
                        alt={course.courseDetails.courseName}
                        className="absolute w-full h-full object-cover object-center rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/api/placeholder/400/300";
                          target.onerror = null;
                        }}
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
                        <div className="text-sm text-gray-600">
                          Completed on:{" "}
                          {new Date(course.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          router.push(`/certificate/${course._id}`)
                        }
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Award size={18} />
                        View Certificate
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        Total Lessons Completed:{" "}
                        {course.completedChapters.filter(
                          (chapter) => chapter.isCompleted
                        ).length || 0}{" "}
                        / {course.completedChapters.length}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesPage;