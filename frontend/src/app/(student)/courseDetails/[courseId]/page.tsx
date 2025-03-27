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
import {
  addReview,
  getAllChapter,
  getAllChaptersDetails,
  getCourse,
  GetCourseReviews,
  isBoughtCourse,
} from "@/api/courseApi";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "react-toastify";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import Loader from "@/app/components/fallbacks/Loader";
import Loading from "@/app/components/fallbacks/Loading";
import ExpandableChapters from "@/app/components/students/ExpandableChapters";
import { getInstructorDataById } from "@/api/instructorApi";
import InstructorCard from "@/app/components/instructor/InstructorCard";
import { ins } from "framer-motion/dist/client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CoursePricing from "@/app/components/students/CoursePricing";

interface UserId {
  _id: string;
  username: string;
  email: string;
  profilePicUrl: string;
}
interface Review {
  _id: string;
  userId: UserId;

  rating: number;
  comment: string;
  date: string;
}

interface Course {
  _id: string;
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
interface Chapter {
  _id: string;
  chapterTitle: string;
  description: string;
  courseId: string;
}
interface Instructor {
  _id: string;
  username: string;
  profilePicUrl: string;
  isVerified: boolean;
  expertise: string;
  planPrice: number;
}
const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course>();
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<
    "overview" | "curriculum" | "reviews"
  >("overview");
  const [instructor, setInstructor] = useState<Instructor>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const MainVideo = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(false);

  const [Purchaed, setPurchaed] = useState(false);
  const [toggeleReview, setToggeleReview] = useState(false);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [newReview, setNewReview] = useState<{
    rating: number;
    comment: string;
  }>({
    rating: 0,
    comment: "",
  });
  const userData=useSelector((state:RootState)=>state.user)

  const [reviews, setReviews] = useState<Review[]>();

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
        setLoading(true);
        const response = await getCourse(courseId);
        const instructorData = await getInstructorDataById(response.mentorId);
        if (!instructorData) {
          toast.error("Instructor Data Not Found");
          return;
        }
        if (!userData.userId) {
          toast.error("user Data Not Found ! Login Again");
          return;
        }
            const PurchasedData=await isBoughtCourse(userData?.userId,courseId)
          setPurchaed(PurchasedData.data.isBought)
        const Coursechapters = await getAllChaptersDetails(courseId);
        const reviews = await GetCourseReviews(courseId);
        await setCourse(response || {});
        await setChapters(Coursechapters.data || []);
        await setInstructor(instructorData);
        setReviews(reviews.data.reviews || []);
        setRatingAverage(reviews.data.averageRating || []);
      };
      fetchCourse();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const renderStars = (
    rating: number,
    interactive = false,
    onStarClick?: (rating: number) => void
  ) => {
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
        toast.success(response.message || "Review submitted successfully");

        // Refetch reviews after successful submission
        const updatedReviews = await GetCourseReviews(course._id);
        setReviews(updatedReviews.data.reviews || []);
        setRatingAverage(updatedReviews.data.averageRating || 0);

        // Reset the form
        setNewReview({ rating: 0, comment: "" });
      } else {
        toast.error(response?.message || "Review Already Submitted!");
      }
    } catch (error: any) {
      console.error("Review submission error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const handleReviewFormToggle = () => {
    setToggeleReview((prev) => !prev);
  };
  if (loading) return <Loading />;

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
            className="lg:col-span-2 rounded-xl shadow-lg p-6"
          >
            {/* Video Container with fixed aspect ratio */}
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              {" "}
              {/* 16:9 Aspect Ratio */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <video
                  ref={MainVideo}
                  poster={course?.thumbnailUrl}
                  onContextMenu={(e) => e.preventDefault()}
                  onTimeUpdate={() =>
                    setCurrentTime(MainVideo.current?.currentTime || 0)
                  }
                  src={course?.demoVideo?.url}
                  controlsList="nodownload noremoteplayback"
                  className="w-full h-full object-contain bg-black rounded-lg"
                />

                {showControls && (
                  <>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 100 }}
                      transition={{ ease: "easeInOut", duration: 0.3 }}
                      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-1 justify-center items-center"
                    >
                      <button
                        onClick={restartVideo}
                        className="transparent hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-1"
                      >
                        <RotateCcw className="text-white" />
                      </button>
                      <button
                        onClick={backwardTenSec}
                        className="bg-purple-400 hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-2"
                      >
                        <SkipBack className="text-white" />
                      </button>
                      <button
                        onClick={handlePlayPause}
                        className="bg-purple-400 hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-3"
                      >
                        {isPlaying ? (
                          <Pause className="text-white" />
                        ) : (
                          <Play className="text-white" />
                        )}
                      </button>
                      <button
                        onClick={forwardTenSec}
                        className="bg-purple-400 hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-2"
                      >
                        <SkipForward className="text-white" />
                      </button>
                      <button
                        onClick={toggleMute}
                        className="transparent hover:bg-purple-500 rounded-full p-1"
                      >
                        <VolumeOff className="text-white" />
                      </button>
                      <span className="text-white">
                        {Math.floor(currentTime)}
                      </span>
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
                    {(Number(ratingAverage) || 0).toFixed(2)} (
                    {reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                {["overview", "curriculum", "reviews"].map((section) => (
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
                <ExpandableChapters chapters={chapters} />
              )}
              {activeSection === "reviews" && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl text-black font-bold mb-4">
                      Course Reviews
                    </h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(ratingAverage)}
                        <span className="text-gray-600 ml-2">
                          {(Number(ratingAverage) || 0).toFixed(2)} (
                          {reviews?.length || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleReviewFormToggle}
                      className="py-2 px-4 bg-purple-500 rounded-lg text-white mb-3 hover:bg-purple-600 flex "
                    >
                      <StarIcon /> Add Review & Rating
                    </button>
                  </div>

                  {/* Review Submission Form */}
                  {toggeleReview && (
                    <form
                      onSubmit={handleSubmitReview}
                      className="mb-8 p-6 bg-white rounded-lg shadow-md"
                    >
                      <h4 className="text-xl text-black font-semibold mb-4">
                        Write a Review
                      </h4>
                      <div className="mb-4">
                        <label className="block  text-black mb-2">
                          Your Rating
                        </label>
                        <div className="flex space-x-1">
                          {renderStars(newReview.rating, true, (rating) =>
                            setNewReview((prev) => ({ ...prev, rating }))
                          )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block  text-black mb-2">
                          Your Review
                        </label>
                        <textarea
                          className="w-full  text-black p-2 border rounded-lg"
                          rows={4}
                          placeholder="Share your experience with this course"
                          value={newReview.comment}
                          onChange={(e) =>
                            setNewReview((prev) => ({
                              ...prev,
                              comment: e.target.value,
                            }))
                          }
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
                  )}
                  {/* Existing Reviews */}
                  <div>
                    <h4 className="text-xl  text-black font-semibold mb-4">
                      Student Reviews
                    </h4>
                    {reviews?.length == 0 ? (
                      <div className="bg-white text-black ">
                        No Reviews for this Course!
                      </div>
                    ) : (
                      reviews?.map((review) => (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 1,
                            ease: "easeInOut",
                          }}
                          key={review._id}
                          className="bg-white flex space-x-3 p-4 rounded-lg shadow-md mb-4"
                        >
                          <div>
                            <img
                              src={review.userId.profilePicUrl}
                              className="w-12 rounded-full"
                              alt=""
                            />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                <h5 className=" text-black font-semibold">
                                  {review.userId.username}
                                </h5>
                                <span className="text-gray-500 text-sm">
                                  {review.date}
                                </span>
                              </div>
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Course Purchase & Instructor */}
          <div className="space-y-6">
        
            <CoursePricing
              price={Number(course?.price)}
              courseId={courseId}
              isPurchased={Purchaed}
            />

            <InstructorCard instructor={instructor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
