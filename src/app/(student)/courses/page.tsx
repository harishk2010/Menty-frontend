"use client";

import { useState, useEffect } from "react";
import { getAllCourses, getAllPaginatedCourses, getCourseCategories } from "@/api/courseApi";
import {
  Search,
  SlidersHorizontal,
  Clock,
  Users,
  BookOpen,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";

type Course = {
  _id: string;
  courseName: string;
  description?: string;
  isListed: boolean;
  isPublished: boolean;
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
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [itemsCount, setItemsCount] = useState<number>(6);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [filterChanged, setFilterChanged] = useState(false);

  // Define categories and levels
  const levels = ["beginner", "intermediate", "advanced"];
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  // Fetch courses with pagination, filtering, and sorting from the backend
  const fetchCourses = async (resetPage = false) => {
    try {
      setLoading(true);
      setIsSearching(true);
      
      // If filters changed, reset to page 1
      const pageToFetch = resetPage ? 1 : currentPage;
      if (resetPage) {
        setCurrentPage(1);
      }
      
      console.log("Fetching courses with filters:", {
        page: pageToFetch,
        searchQuery,
        sortBy,
        itemsCount,
        categories: selectedCategories,
        levels: selectedLevels
      });
      
      const response = await getAllPaginatedCourses(
        pageToFetch,
        // 3, // 9 items per page (3x3 grid)
        itemsCount,
        searchQuery,
        sortBy,
        selectedCategories.length > 0 ? selectedCategories : undefined,
        selectedLevels.length > 0 ? selectedLevels : undefined
      );
      
      setCourses(response.courses);
      setTotalPages(response.totalPages);
      setTotalCourses(response.totalCourses);
      
      // Fetch all categories if we don't have them yet
      if (uniqueCategories.length === 0) {
        const allCoursesResponse = await getCourseCategories()
        if (allCoursesResponse.success) {
          setUniqueCategories(allCoursesResponse.data || []);
        }
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
      setIsSearching(false);
      setFilterChanged(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCourses();
  }, []);

  // Effect for handling filter changes
  useEffect(() => {
    if (filterChanged) {
      fetchCourses(true);
    }
  }, [filterChanged]);

  // Effect for handling pagination
  useEffect(() => {
    if (!filterChanged) {
      fetchCourses(false);
    }
  }, [currentPage]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      console.log("Updated categories:", newCategories);
      return newCategories;
    });
    setFilterChanged(true);
  };

  // Handle level selection
  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => {
      const newLevels = prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level];
      
      console.log("Updated levels:", newLevels);
      return newLevels;
    });
    setFilterChanged(true);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: SortOption) => {
    console.log("Changing sort to:", newSortBy);
    setSortBy(newSortBy);
    setFilterChanged(true);
  };
  const handleItemsChange = (itemCount: number) => {
    console.log("Changing itemCount to:", itemCount);
    setItemsCount(itemCount);
    setFilterChanged(true);
  };

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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setFilterChanged(true);
                  }
                }}
                className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
                onClick={() => setFilterChanged(true)}
              />
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
                        onChange={() => handleCategoryChange(category)}
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
                      onChange={() => handleLevelChange(level)}
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
                Showing {courses.length} of {totalCourses} courses
              </p>
              <div className="space-x-3">

              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="border text-gray-800 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <select
                value={itemsCount}
                onChange={(e) => handleItemsChange(e.target.value as unknown as number)}
                className="border text-gray-800 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                <option value={3}>3</option>
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
                
              </select>
                </div>
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
                {courses.map((course) => (
                  <Link
                    href={`/courseDetails/${course._id}`}
                    key={course._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="group relative h-48">
                      <img
                        src={course.thumbnailUrl}
                        alt={course.courseName}
                        onContextMenu={(e) => e.preventDefault()}
                        className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300 ease-in-out"
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
                      <div className="flex justify-end w-full">
                        <PrimaryButton type={"button"} name="Enroll Now"/>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center p-2 rounded-md ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md ${
                        currentPage === i + 1
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-600 hover:bg-purple-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center p-2 rounded-md ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {courses.length === 0 && !loading && (
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