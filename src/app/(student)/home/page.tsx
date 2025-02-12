"use client";

import dynamic from "next/dynamic";
import { ReactElement, useState, useEffect } from "react";
import { motion } from "framer-motion";
import homeBanner from "../../../../public/homeBanner.jpg";
// Dynamically import the Player component from Lottie with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => <div>Loading-----</div>,
  }
);
import {
  Book,
  Trophy,
  Users,
  PlayCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { getAllCourses } from "@/api/courseApi";
import Link from "next/link";

interface Courses {
  _id:string,
  duration: string;
  courseName: string;
  thumbnailUrl: string;
  demoVideo: {
    url: string;
  };
  isPublished:boolean;
  price: string;
}

export default function Home(): ReactElement {
  const [popularCourses, setPoularCourses] = useState<Courses[]>([]);

  useEffect(() => {
    try {
      const fetchCourses = async () => {
        const response = await getAllCourses();
        console.log(response, "res course");
        setPoularCourses(response || []);
      };
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  ];

  // const popularCourses = [
  //   {
  //     title: "Web Development Fundamentals",
  //     students: "2,500+",
  //     duration: "8 weeks",
  //     image: "/api/placeholder/300/200"
  //   },
  //   {
  //     title: "Data Science Essentials",
  //     students: "1,800+",
  //     duration: "10 weeks",
  //     image: "/api/placeholder/300/200"
  //   },
  //   {
  //     title: "Digital Marketing Mastery",
  //     students: "3,200+",
  //     duration: "6 weeks",
  //     image: "/api/placeholder/300/200"
  //   }
  // ];

  return (
    <div className="min-h-screen overflow-y-hidden">
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${homeBanner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative  overflow-hidden"
      >
        <div className="max-w-7xl z-10  mx-auto">
          <div className="relative z-10 pb-8  sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your Future</span>
                  <span className="block text-purple-600">
                    with Online Learning
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Access world-class education from anywhere. Learn at your own
                  pace with expert-led courses designed to take your skills to
                  the next level.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      Start Learning
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href={"/courses"}>
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      View Courses
                    </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="py-12 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to learn
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-50 text-white">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.title}
                  </p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Popular Courses Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Popular Courses
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Choose from our most sought-after courses and start your learning
              journey today
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {popularCourses.map((course, index) => (
                course.isPublished &&(<Link  key={course?._id} href={`/courseDetails/${course._id}`}>
                <div
                  
                   className="  flex flex-col rounded-lg shadow-lg overflow-hidden"
                 >
                   {/* <div className="group  flex-shrink-0" >
                     <img className="h-48  w-full group-hover: object-cover" alt="original" src={course.thumbnailUrl} alt={course.courseName} />
                     <img className="h-48  w-full object-cover group-hover:" alt="hover" src={course.thumbnailUrl} alt={course.courseName} />
                   </div> */}
                  
                   <div className="group relative  flex-shrink-0">
                     <img
                       src={course.thumbnailUrl}
                       alt="Original"
                       className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300 ease-in-out"
                     />
   
                     <video
                       muted
                       autoPlay
                       loop
                       playsInline
                       src={course.demoVideo.url}
                       className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                       />
                   </div>
                   <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                     <div className="flex-1">
                       <h3 className="text-xl font-semibold text-gray-900">
                         {course.courseName}
                       </h3>
                       <div className="mt-3 flex items-center text-sm text-gray-500">
                         <Users className="flex-shrink-0 mr-1.5 h-5 w-5" />
                         <span>{course.price} students</span>
                       </div>
                       <div className="mt-2 flex items-center text-sm text-gray-500">
                         <PlayCircle className="flex-shrink-0 mr-1.5 h-5 w-5" />
                         <span>{course.duration} Hrs</span>
                       </div>
                     </div>
                     <div className="mt-6">
                       <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                         Enroll Now
                       </button>
                     </div>
         
                   </div>
                 </div>
                 </Link>)

             
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start learning?</span>
            <span className="block text-indigo-200">
              Join thousands of successful students.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-indigo-50">
                Get started
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
