import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  PlayCircle, 
  Users, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getAllInstructorCourses } from '@/api/courseApi';

// Define the Course interface
interface Course {
  _id: string;
  courseName: string;
  thumbnailUrl: string;
  duration: number;
  studentsCount: number;
  price: number;
}

// Props interface for the component
interface InstructorCoursesProps {
  instructorId: string;
}

const InstructorCourses: React.FC<InstructorCoursesProps> = ({ instructorId }) => {
  // State to manage courses and loading
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ref for the course slider
  const courseSliderRef = useRef<HTMLDivElement>(null);

  // Scroll function for courses
  const scrollCourses = (direction: 'left' | 'right') => {
    if (courseSliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      courseSliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Fetch courses for the specific instructor
  useEffect(() => {
    const fetchInstructorCourses = async () => {
      if (!instructorId) return;

      try {
        setIsLoading(true);
        const response = await getAllInstructorCourses(instructorId);
        
        if (!response.success) {
          throw new Error('Failed to fetch instructor courses');
        }
        
        setCourses(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructorCourses();
  }, [instructorId]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-72 animate-pulse">
                <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-40 w-full bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                      <div className="h-6 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="py-16 bg-white text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // Render when no courses found
  if (courses.length === 0) {
    return (
      <div className="py-10 bg-white text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No Courses Available
        </h2>
        <p className="text-gray-600">
          This instructor hasn't published any courses yet.
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Instructor Courses
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Explore all courses by this instructor
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => scrollCourses('left')} 
              className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={() => scrollCourses('right')} 
              className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        <div 
          ref={courseSliderRef}
          className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex-shrink-0 w-72"
            >
              <Link href={`/courseDetails/${course._id}`}>
                <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="group relative h-40 w-full">
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity z-10"></div>
                    <img
                      src={course.thumbnailUrl}
                      alt={course.courseName}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <button className="w-full text-sm text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 transition-colors">
                        Preview Course
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {course.courseName}
                    </h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <PlayCircle className="flex-shrink-0 mr-1.5 h-5 w-5" />
                      <span>{course.duration} hrs</span>
                    </div>
                    {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Users className="flex-shrink-0 mr-1.5 h-5 w-5" />
                      <span>{course.studentsCount || "200+"} students</span>
                    </div> */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-purple-600">₹{course.price}</span>
                      <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {courses.length > 4 && (
          <div className="mt-8 text-center">
            <Link href="/courses">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
                View All Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCourses;