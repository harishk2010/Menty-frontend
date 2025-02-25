"use client";

import { useState, useEffect } from "react";
import { getAllCourses } from "@/api/courseApi";
import {
  Search,
  SlidersHorizontal,
  Clock,
  Users,
  BookOpen,
  Star,
} from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";


type Course = {
  _id: string;
  courseName: string;
  description?: string;
  isListed:boolean;
  isPublished:boolean;
  thumbnailUrl: string;
  instructor?: string;
  price: string; 
  duration: string;
  level?: "beginner" | "intermediate" | "advanced";
  category?: string;
  rating?: number;
  studentsEnrolled?: number;
  tags?: string[];
  demoVideo: {
    url: string;
  };
};

type SortOption = "popular" | "price-low" | "price-high" | "rating" | "newest";

export default function CourseListing() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        console.log("Fetched courses:", response); // Debug log
        if (Array.isArray(response)) {
          setCourses(response);
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

  // Apply filters and search
  useEffect(() => {
    let filtered = [...courses];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        course =>
          course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course =>
        course.category && selectedCategories.includes(course.category)
      );
    }

    // Level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(course =>
        course.level && selectedLevels.includes(course.level)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "popular":
        filtered.sort((a, b) => (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0));
        break;
      case "newest":
        filtered.sort((a, b) => b._id.localeCompare(a._id));
        break;
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedCategories, selectedLevels, sortBy]);

  // Get unique categories from actual course data
  const uniqueCategories = Array.from(
    new Set(courses.map(course =>{if(course.isListed)return course.category}).filter(Boolean))
  );
  const levels = ["beginner", "intermediate", "advanced"];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
            <p className="mt-2 text-gray-600">
              Discover courses to enhance your skills
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-96">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <SlidersHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block space-y-6`}>
            <div>
              <h3 className="font-semibold text-gray-900">Categories</h3>
              <div className="mt-2 space-y-2">
                {uniqueCategories.map(category => (
                  category && (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => {
                          setSelectedCategories(prev =>
                            prev.includes(category)
                              ? prev.filter(c => c !== category)
                              : [...prev, category]
                          );
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-600">{category}</span>
                    </label>
                  )
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Level</h3>
              <div className="mt-2 space-y-2">
                {levels.map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level)}
                      onChange={() => {
                        setSelectedLevels(prev =>
                          prev.includes(level)
                            ? prev.filter(l => l !== level)
                            : [...prev, level]
                        );
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-600">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredCourses.length} courses
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border text-gray-800 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-white rounded-lg shadow-sm p-4 h-96"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  course.isListed && course.isPublished &&(

                  
                  <Link
                    href={`/courseDetails/${course._id}`}
                    key={course._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="group relative  h-48">
                      <img
                        src={course.thumbnailUrl}
                        alt={course.courseName}
                        onContextMenu={(e) => e.preventDefault()}
                 
                        className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300 ease-in-out "
                      />
                      <video
                    muted
                    autoPlay
                    loop
                    playsInline
                     onContextMenu={(e) => e.preventDefault()}
                         controlsList="nodownload noremoteplayback"
                    src={course.demoVideo.url}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                    />
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-purple-600">
                        ${course.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                        {course.courseName}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {course.description || "No description available"}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        {course.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{course.rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        {course.studentsEnrolled && (
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{course.studentsEnrolled} students</span>
                          </div>
                        )}
                        {course.level && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                            {course.level}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-end w-full ">
                        <PrimaryButton type={"button"} name="Enroll Now"/>
                      </div>
                    </div>
                  </Link>
                  )
                ))}
              </div>
            )}

            {filteredCourses.length === 0 && !loading && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}