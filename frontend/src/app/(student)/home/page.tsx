
"use client";

import dynamic from "next/dynamic";
import { ReactElement, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Book, 
  Trophy, 
  Users, 
  PlayCircle, 
  ArrowRight, 
  ArrowLeft,
  ChevronLeft, 
  ChevronRight, 
  UserCheck, 
  Mail, 
  Phone, 
  Award, 
  IndianRupee,
  Calendar,
  Star
} from "lucide-react";
import Link from "next/link";
import { getAllCourses } from "@/api/courseApi";
import { getAllPaginatedMentors } from "@/api/instructorApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Dynamically import the Player component with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => <div className="h-40 w-full bg-gray-200 animate-pulse rounded-md"></div>,
  }
);

// Banner images array
const bannerImages = [
  "/homeBanner.jpg",
  "/homeBanner2.jpg", 
  "/homeBanner3.jpg",
];

interface Course {
  _id: string;
  duration: string;
  courseName: string;
  thumbnailUrl: string;
  rating:number;
  demoVideo: {
    url: string;
  };
  isPublished: boolean;
  isListed: boolean;
  price: string;
  studentsCount?: number;
}

interface Mentor {
  _id: string;
  username: string;
  email: string;
  mobile: string;
  expertise: string;
  skills: string;
  profilePicUrl: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  isVerified: boolean;
  isBlocked: boolean;
  planPrice: number;
}

export default function Home(): ReactElement {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [featuredMentors, setFeaturedMentors] = useState<Mentor[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const user=useSelector((state:RootState)=>state.user)
  // Refs for sliders
  const courseSliderRef = useRef<HTMLDivElement>(null);
  const mentorSliderRef = useRef<HTMLDivElement>(null);

  // Banner auto-slide effect
  useEffect(() => {
    
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);

    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Fetch courses and mentors
  useEffect(() => {
    try {
      const fetchCourses = async () => {
        const response = await getAllCourses();
        if (response) {
          const publishedCourses = response.filter(
            (course: Course) => course.isPublished && course.isListed
          );
          setPopularCourses(publishedCourses);
        }
      };
      
      const fetchMentors = async () => {
        const response = await getAllPaginatedMentors(1, 8);
        if (response && response.mentors) {
          setFeaturedMentors(response.mentors);
        }
      };

     
      
      fetchCourses();
      fetchMentors();
      
      // Check if user is logged in
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const features = [
    {
      icon: <Book className="w-6 h-6 text-purple-600" />,
      title: "Expert-Led Courses",
      description:
        "Learn from industry professionals with years of real-world experience",
    },
    {
      icon: <Trophy className="w-6 h-6 text-purple-600" />,
      title: "Earn Certificates",
      description:
        "Get recognized for your achievements with shareable certificates",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Community Learning",
      description: "Join a global community of learners and share your journey",
    },
    {
      icon: <Calendar className="w-6 h-6 text-purple-600" />,
      title: "1-on-1 Mentoring",
      description: "Book personal sessions with industry experts for guidance",
    },
  ];

  // Slider navigation functions
  const scrollCourses = (direction: 'left' | 'right') => {
    if (courseSliderRef.current) {
      const scrollAmount = direction === 'left' ? -courseSliderRef.current.clientWidth : courseSliderRef.current.clientWidth;
      courseSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollMentors = (direction: 'left' | 'right') => {
    if (mentorSliderRef.current) {
      const scrollAmount = direction === 'left' ? -mentorSliderRef.current.clientWidth : mentorSliderRef.current.clientWidth;
      mentorSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Sliding Banner */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Banner Images */}
        <div className="relative h-full w-full">
          {bannerImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                currentBanner === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Banner Navigation */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentBanner === index
                    ? "bg-purple-600"
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Transform Your Future</span>
                <span className="block text-purple-400">
                  with Expert-Led Learning
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Access world-class education and personal mentorship from anywhere. 
                Learn at your own pace with courses and 1-on-1 sessions designed to 
                accelerate your career growth.
              </p>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/courses">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-colors">
                      Explore Courses
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/mentors">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition-colors">
                      Find a Mentor
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Join Us Section (shown only if not logged in) */}
      {!user.userId && (
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">Join Our Learning Community</h2>
                <p className="text-lg mb-6">
                  Start your journey today. Sign up as a student to access courses or as an instructor to share your knowledge.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/signup" className="flex-1">
                  <button className="w-full py-4 px-6 bg-white text-purple-700 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                    Sign Up as Student
                  </button>
                </Link>
                <Link href="/instructor/signup" className="flex-1">
                  <button className="w-full py-4 px-6 bg-purple-600 text-white font-medium rounded-lg border border-purple-400 hover:bg-purple-700 transition-colors">
                    Sign Up as Instructor
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to learn and grow
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to accelerate your career and achieve your goals
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Popular Courses Section with Slider */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Popular Courses
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Start your learning journey with our most sought-after courses
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
            {popularCourses.length > 0 ? (
  popularCourses.map((course) => (
    <div
      key={course._id}
      className="flex-shrink-0 w-72"
    >
      <Link href={`/courseDetails/${course._id}`}>
        <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="group relative h-40 w-full">
            <div className="absolute inset-0 bg-black bg-opacity-20 hover-purple-500 group-hover:bg-opacity-30 transition-opacity z-10"></div>
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
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Star className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" />
              <span>{course.rating || 0}/5</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-purple-600">₹{course.price}</span>
              <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                Bestseller
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ))
) : (
  // Loading state for courses
  Array.from({ length: 4 }).map((_, index) => (
    <div key={index} className="flex-shrink-0 w-72">
      <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-40 w-full bg-gray-200 animate-pulse"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="mt-4 flex items-center justify-between">
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  ))
)}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/courses">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
                View All Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Mentors Section with Slider */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Connect with Expert Mentors
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Book 1-on-1 sessions with industry professionals
              </p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => scrollMentors('left')} 
                className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button 
                onClick={() => scrollMentors('right')} 
                className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          <div 
            ref={mentorSliderRef}
            className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {featuredMentors.length > 0 ? (
              featuredMentors.map((mentor) => (
                <div
                  key={mentor._id}
                  className="flex-shrink-0 w-72"
                >
                  <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col items-center">
                        <img
                          src={mentor.profilePicUrl}
                          alt={mentor.username}
                          className="h-24 w-24 rounded-full object-cover border-2 border-purple-200"
                        />
                        <div className="mt-4 text-center">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {mentor.username}
                          </h3>
                          {mentor.isVerified && (
                            <span className="flex items-center justify-center mt-1 text-green-600 text-sm">
                              <UserCheck className="h-4 w-4 mr-1" />
                              Verified
                            </span>
                          )}
                          <p className="mt-2 text-purple-600 font-medium">
                            {mentor.expertise}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="flex items-center text-sm text-gray-600 justify-center mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          Available for 1:1 Sessions
                        </p>
                        <p className="text-center font-medium text-gray-800">
                          <IndianRupee className="h-4 w-4 inline mr-1" />
                          {mentor.planPrice} per session
                        </p>
                      </div>

                      <div className="mt-6">
                        <Link href={`/mentorProfile/${mentor._id}`}>
                          <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
                            View Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Loading state for mentors
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-72">
                  <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col items-center">
                        <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="mt-4 w-full">
                          <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 mx-auto w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
                      </div>
                      <div className="mt-6">
                        <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/mentors">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
                Explore All Mentors
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Your journey to success, simplified
            </p>
          </div>

          <div className="mt-10">
            <div className="relative">
              {/* Steps connection line */}
              <div className="hidden md:block absolute top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: "Choose a Course",
                    description: "Browse our wide selection of expert-led courses tailored to your needs"
                  },
                  {
                    step: "02",
                    title: "Learn at Your Pace",
                    description: "Access content anytime, anywhere and progress at your own speed"
                  },
                  {
                    step: "03",
                    title: "Book Mentor Sessions",
                    description: "Schedule 1-on-1 sessions with industry experts for personalized guidance"
                  },
                  {
                    step: "04",
                    title: "Earn Certificates",
                    description: "Complete courses and showcase your achievements with verified certificates"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 text-white text-xl font-bold z-10">
                      {item.step}
                    </div>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-base text-gray-500 text-center">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              What Our Students Say
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Harish ",
                role: "Software Developer",
                image: "/api/placeholder/150/150",
                quote: "The courses were incredibly comprehensive and the mentor sessions helped me solve complex problems in my projects. I landed my dream job within months!"
              },
              {
                name: "Rahul Patel",
                role: "UX Designer",
                image: "/api/placeholder/150/150",
                quote: "The personalized feedback from my mentor transformed my design process. The community support and networking opportunities were invaluable."
              },
              {
                name: "Anjali Gupta",
                role: "Data Scientist",
                image: "/api/placeholder/150/150",
                quote: "From beginner to professional in just six months! The structured curriculum and expert guidance made all the difference in my career transition."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="mt-4 text-gray-700">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-4 flex text-yellow-400">
  {[...Array(5)].map((_, i) => (
    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ))}
</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your career?</span>
            <span className="block text-indigo-200">
              Join thousands of successful learners today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/courses">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-bold rounded-md text-purple-700 bg-white hover:bg-purple-50 transition-colors">
                  Get started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/mentors">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-bold rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
                  Find a Mentor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "10,000+", label: "Students" },
              { value: "500+", label: "Courses" },
              { value: "100+", label: "Expert Mentors" },
              { value: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-extrabold text-purple-600">{stat.value}</div>
                <div className="mt-2 text-base font-medium text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Newsletter Section */}
      {/* <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Stay Updated
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Subscribe to our newsletter for the latest courses, mentorship opportunities, and learning resources
            </p>
          </div>
          <div className="mt-8 max-w-lg mx-auto">
            <form className="sm:flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:max-w-xs rounded-md"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button 
                  type="submit" 
                  className="w-full bg-purple-600 px-5 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              We care about your data. Read our{" "}
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div> */}

      
    </div>
  );
}