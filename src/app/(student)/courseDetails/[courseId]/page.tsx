"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Clock,
  BarChart,
  BookOpen,
  Star,
  Users,
  ChevronRight,
  PlayCircle,
  Pause,
  RotateCcw,
  VolumeOff,
  FastForward,
  SkipBack,
  SkipForward,
  StarIcon,
} from "lucide-react";
import { addReview, getCourse, GetCourseReviews } from "@/api/courseApi";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "react-toastify";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";

interface UserId{
  _id:string
  username: string;
  email:string;
  profilePicUrl:string
}
interface Review {
  _id: string;
  userId:UserId; 
  
  rating: number;
  comment: string;
  date: string;
}
// Mock course data
const mockCourse = {
  id: "course123",
  title: "Complete React Developer Bootcamp",
  instructor: "John Smith",
  rating: 4.7,
  totalReviews: 1245,
  students: 15420,
  level: "Intermediate",
  description:
    "Master React from scratch with this comprehensive course covering modern web development techniques, state management, and advanced component design.",
  price: 49.99,
  totalHours: 32,
  chapters: [
    {
      id: "ch1",
      title: "React Fundamentals",
      duration: "2h 45m",
      isPreview: true,
      description:
        "Learn the core concepts of React and build your first application",
    },
    {
      id: "ch2",
      title: "State Management with Redux",
      duration: "3h 15m",
      isPreview: false,
      description: "Deep dive into advanced state management techniques",
    },
    {
      id: "ch3",
      title: "Hooks and Performance Optimization",
      duration: "2h 30m",
      isPreview: false,
      description: "Optimize your React applications using modern hooks",
    },
  ],
  requirements: [
    "Basic JavaScript knowledge",
    "HTML and CSS understanding",
    "Computer with Node.js installed",
  ],
  learningOutcomes: [
    "Build complex React applications",
    "Understand state management",
    "Create responsive web designs",
    "Implement advanced React patterns",
  ],
};

// const mockReviews: Review[] = [
//   {
//     id: "review1",
//     userId:"idd",
//     userName: "Jane Doe",
//     rating: 5,
//     comment: "Absolutely fantastic course! The content is comprehensive and the instructor explains complex concepts clearly.",
//     date: "2 weeks ago"
//   },
//   {
//     id: "review2",
//     userId:"idd",
//     userName: "John Smith",
//     rating: 4,
//     comment: "Great course overall. Learned a lot about React and state management. Would recommend to intermediate developers.",
//     date: "1 month ago"
//   },
//   {
//     id: "review3",
//     userId:"idd",
//     userName: "Alice Johnson",
//     rating: 5,
//     comment: "Exceptional depth and practical examples. This course took my React skills to the next level.",
//     date: "3 weeks ago"
//   }
// ];


interface Course {
  _id:string;
  courseName: string;
  description: string;
  category: string;
  price: string;
  duration: string;
  demoVideo: {
    type: String;
    url: string;
  };
  thumbnailUrl: string;
  level: string;
}

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course>();
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<
    "overview" | "curriculum" | "reviews"
  >("overview");

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const MainVideo = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toggeleReview, setToggeleReview] = useState(false);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [newReview, setNewReview] = useState<{rating: number, comment: string}>({
    rating: 0,
    comment: ""
  });

  const [reviews,setReviews]=useState<Review[]>()

  const handlePlayPause = () => {
    try {
      if (MainVideo.current) {
        isPlaying ? MainVideo.current?.pause() : MainVideo.current?.play();
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMute = () => {
    if (!MainVideo.current) return;
    MainVideo.current.muted = !muted;
    setMuted(!muted);
  };

  const restartVideo = () => {
    if (!MainVideo.current) return;
    MainVideo.current.currentTime = 0;
  };

  const forwardTenSec = () => {
    if (!MainVideo.current) return;
    MainVideo.current.currentTime += 10;
  };

  const backwardTenSec = () => {
    if (!MainVideo.current) return;
    MainVideo.current.currentTime -= 10;
  };

  useEffect(() => {
    try {
      const fetchCourse = async () => {
        const response = await getCourse(courseId);
        const reviews=await GetCourseReviews(courseId)
        setCourse(response || {});
        setReviews(reviews.data.reviews || []);
        setRatingAverage(reviews.data.averageRating || []);
      };
      fetchCourse();
    } catch (error) {
      console.log(error);
    }
  }, [courseId]);

  // const renderStars = (rating: number) => {
  //   return Array.from({ length: 5 }, (_, index) => (
  //     <Star
  //       key={index}
  //       className={`h-5 w-5 ${
  //         index < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
  //       }`}
  //       fill={index < Math.floor(rating) ? "#FFD700" : "none"}
  //     />
  //   ));
  // };

  // Render stars function (existing)
  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 cursor-pointer ${
          index < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
        }`}
        fill={index < Math.floor(rating) ? "#FFD700" : "none"}
        onClick={() => interactive && onStarClick && onStarClick(index + 1)}
      />
    ));
  };

 
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newReview.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
  
    if (!course?._id) {
      toast.error("Course information is missing");
      return;
    }
  
    try {
      const response = await addReview(
        course._id, 
        newReview.rating, 
        newReview.comment
      );
  
      if (response?.success) {
        toast.success(response.message || 'Review submitted successfully');
        
        // Refetch reviews after successful submission
        const updatedReviews = await GetCourseReviews(course._id);
        setReviews(updatedReviews.data.reviews || []);
        setRatingAverage(updatedReviews.data.averageRating || 0);
  
        // Reset the form
        setNewReview({ rating: 0, comment: "" });
      } else {
        toast.error(response?.message || 'Failed to submit review');
      }
    } catch (error: any) {
      console.error('Review submission error:', error);
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  const handleReviewFormToggle=()=>{
    setToggeleReview(prev=>!prev)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Course Overview */}
          <motion.div
       
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut", 
          }}
          className="lg:col-span-2 rounded-xl shadow-lg p-6">
            {/* Video Container with fixed aspect ratio */}
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
              <div 
                className="absolute top-0 left-0 w-full h-full"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <video
                  ref={MainVideo}
                  poster={course?.thumbnailUrl}
                  onContextMenu={(e) => e.preventDefault()}
                  onTimeUpdate={() => setCurrentTime(MainVideo.current?.currentTime || 0)}
                  src={course?.demoVideo?.url}
                  controlsList="nodownload noremoteplayback"
                  className="w-full h-full object-contain bg-black rounded-lg"
                />
                
                {showControls && (
                  <>
                    <motion.div 
                      initial={{y:20, opacity:0}}
                      animate={{y:0, opacity:100}}
                      transition={{ease:"easeInOut", duration:.3}}
                      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-1 justify-center items-center"
                    >
                      <button
                        onClick={restartVideo}
                        className="transparent hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-1"
                      >
                        <RotateCcw className="text-white"/>
                      </button>
                      <button
                        onClick={backwardTenSec}
                        className="bg-purple-400 hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-2"
                      >
                        <SkipBack className="text-white"/>
                      </button>
                      <button
                        onClick={handlePlayPause}
                        className="bg-purple-400 hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-3"
                      >
                        {isPlaying ? <Pause className="text-white"/> : <Play className="text-white"/>}
                      </button>
                      <button
                        onClick={forwardTenSec}
                        className="bg-purple-400 hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-2"
                      >
                        <SkipForward className="text-white"/>
                      </button>
                      <button
                        onClick={toggleMute}
                        className="transparent hover:bg-purple-500 rounded-full p-1"
                      >
                        <VolumeOff className="text-white"/>
                      </button>
                      <span className="text-white">{Math.floor(currentTime)}</span>
                    </motion.div>
                    
                    <div className="absolute bottom-4 left-0 w-full px-4">
                      <progress
                        max={MainVideo.current?.duration || 0}
                        value={currentTime}
                        className="w-full h-2 rounded-lg overflow-hidden bg-gray-700 [&::-webkit-progress-bar]:bg-gray-700 [&::-webkit-progress-value]:bg-purple-500 [&::-moz-progress-bar]:bg-blue-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {course?.courseName}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(ratingAverage)}
                  <span className="text-gray-600 ml-2">
                  {(Number(ratingAverage) || 0).toFixed(2)} ({reviews?.length || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span>{mockCourse.students} Students</span>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                {["overview", "reviews"].map((section) => (
                  <button
                    key={section}
                    className={`capitalize px-4 py-2 rounded-lg ${
                      activeSection === section
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveSection(section as any)}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {activeSection === "overview" && (
                <div>
                  <p className="text-gray-700 mb-6">{course?.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-600 hover:bg-purple-400 p-4 rounded-lg flex items-center space-x-4">
                      <Clock className="h-8 w-8 text-white" />
                      <div className="text-white">
                        <h4 className="font-semibold">Total Duration</h4>
                        <p>{course?.duration} Hours</p>
                      </div>
                    </div>
                    <div className="bg-purple-600 p-4 rounded-lg flex items-center space-x-4">
                      <BarChart className="h-8 w-8 text-white" />
                      <div className="text-white">
                        <h4 className="font-semibold">Skill Level</h4>
                        <p>{course?.level}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "curriculum" && (
                <div>
                  {mockCourse.chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      className="border-b py-4 hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => setSelectedChapter(chapter.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              Chapter {index + 1}: {chapter.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {chapter.duration} • {chapter.description}
                            </p>
                          </div>
                        </div>
                        {chapter.isPreview && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Preview
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeSection === "reviews" && (
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl text-black font-bold mb-4">Course Reviews</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(ratingAverage)}
                      <span className="text-gray-600 ml-2">
                      {(Number(ratingAverage) || 0).toFixed(2)} ({reviews?.length || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div>
              <button onClick={handleReviewFormToggle} className="py-2 px-4 bg-purple-500 rounded-lg text-white mb-3 hover:bg-purple-600 flex "><StarIcon/> Add Review & Rating</button>

                </div>

                {/* Review Submission Form */}
                {toggeleReview&&<form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                  <h4 className="text-xl text-black font-semibold mb-4">Write a Review</h4>
                  <div className="mb-4">
                    <label className="block  text-black mb-2">Your Rating</label>
                    <div className="flex space-x-1">
                      {renderStars(newReview.rating, true, (rating) => setNewReview(prev => ({...prev, rating})))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block  text-black mb-2">Your Review</label>
                    <textarea 
                      className="w-full  text-black p-2 border rounded-lg"
                      rows={4}
                      placeholder="Share your experience with this course"
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({...prev, comment: e.target.value}))}
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Submit Review
                  </button>
                </form>
}
                {/* Existing Reviews */}
                <div>
                  <h4 className="text-xl  text-black font-semibold mb-4">Student Reviews</h4>
                  {reviews?.length==0?<div className="bg-white text-black ">
                      No Reviews for this Course!
                  </div>:reviews?.map((review) => (
                    <motion.div
                   
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut", 
            }}
                    key={review._id} className="bg-white flex space-x-3 p-4 rounded-lg shadow-md mb-4">
                      
                      <div>
                        <img src={review.userId.profilePicUrl} className="w-12 rounded-full" alt="" />
                      </div>
                      <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <h5 className=" text-black font-semibold">{review.userId.username}</h5>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      </div>
                      
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            </div>
          </motion.div>

          {/* Right Column: Course Purchase & Instructor */}
          <div className="space-y-6">
            <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{
              duration: 1, 
              ease: "easeOut", 
            }}
            className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  ₹{course?.price}
                </h2>
                <Link href={`/checkout/${courseId}`}>
                  {/* <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-orange-400">
                    Enroll Now
                  </button> */}
                  <PrimaryButton name={"Enroll Now"}/>
                </Link>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Course Requirements
                </h3>
                {mockCourse.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                    <p className="text-gray-600">{req}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut", 
            }}
            className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl text-black font-bold mb-4">
                What You'll Learn
              </h3>
              {mockCourse.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <ChevronRight className="h-4 w-4 text-green-600" />
                  <p className="text-gray-700">{outcome}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;