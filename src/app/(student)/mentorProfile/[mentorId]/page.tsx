"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import {
  Calendar,
  Clock,
  Mail,
  Phone,
  Award,
  UserCheck,
  Briefcase,
  Star,
  ChevronLeft,
  ChevronRight,
  AlarmClockCheck,
  StarIcon
} from 'lucide-react';
import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import { getInstructorData, getInstructorDataById, addMentorReview, getMentorReviews } from '@/api/instructorApi';
import { getSlots } from '@/api/bookingApi';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

interface Mentor {
  _id: string;
  username: string;
  email: string;
  mobile: string;
  expertise: string[];
  skills: string;
  profilePicUrl: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  isVerified: boolean;
}

interface Slot {
  _id: string;
  instructorId: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  price: number;
}

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

export default function MentorProfile() {
  const { mentorId } = useParams<{mentorId:string}>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"profile" | "booking" | "reviews">("profile");
  const [toggleReview, setToggleReview] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [newReview, setNewReview] = useState<{rating: number, comment: string}>({
    rating: 0,
    comment: ""
  });

  useEffect(() => {
    const fetchMentorAndSlots = async () => {
      try {
        setLoading(true);
        const [mentorData, slotsData, reviewsData] = await Promise.all([
          getInstructorDataById(mentorId),
          getSlots(mentorId),
          getMentorReviews(mentorId)
        ]);
        setMentor(mentorData);
        setSlots(slotsData.data || []);
        setReviews(reviewsData.data.reviews || []);
        setRatingAverage(reviewsData.data.averageRating || 0);
      } catch (error) {
        console.error('Failed to fetch mentor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorAndSlots();
  }, [mentorId]);

  const generateDateRange = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getAvailableSlotsForDate = (date: Date) => {
    return slots.filter(slot => {
      const slotDate = new Date(slot.startTime);
      return (
        slotDate.getDate() === date.getDate() &&
        slotDate.getMonth() === date.getMonth() &&
        slotDate.getFullYear() === date.getFullYear() &&
        !slot.isBooked
      );
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };

  // Render stars function
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

  const handleReviewFormToggle = () => {
    setToggleReview(prev => !prev);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newReview.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
  
    if (!mentor?._id) {
      toast.error("Mentor information is missing");
      return;
    }
  
    try {
      const response = await addMentorReview(
        mentor._id, 
        newReview.rating, 
        newReview.comment
      );
  
      if (response?.success) {
        toast.success(response.message || 'Review submitted successfully');
        
        // Refetch reviews after successful submission
        const updatedReviews = await getMentorReviews(mentor._id);
        setReviews(updatedReviews.data.reviews || []);
        setRatingAverage(updatedReviews.data.averageRating || 0);
  
        // Reset the form
        setNewReview({ rating: 0, comment: "" });
        setToggleReview(false);
      } else {
        toast.error(response?.message || 'Failed to submit review');
      }
    } catch (error: any) {
      console.error('Review submission error:', error);
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  if (loading || !mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-48 bg-purple-600">
            <div className="absolute -bottom-16 left-8">
              <img
                src={mentor.profilePicUrl}
                alt={mentor.username}
                className="h-32 w-32 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
          
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{mentor.username}</h1>
                <div className="mt-2 flex items-center space-x-4">
                  {mentor.isVerified && (
                    <span className="flex items-center text-green-600">
                      <UserCheck className="h-5 w-5 mr-1" />
                      Verified Mentor
                    </span>
                  )}
                  <div className="flex items-center space-x-1">
                    {renderStars(ratingAverage)}
                    <span className="text-gray-600 ml-2">
                      {(Number(ratingAverage) || 0).toFixed(1)} ({reviews?.length || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6 border-b pb-4">
              <div className="flex space-x-4">
                {["profile", "booking", "reviews"].map((section) => (
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
            </div>

            {activeSection === "profile" && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">About</h2>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-600">
                      <Award className="h-5 w-5 inline mr-2" />
                      {mentor.expertise || "Expertise not specified"}
                    </p>
                    <p className="text-gray-600">
                      <Star className="h-5 w-5 inline mr-2" />
                      Skills: {mentor.skills || "Skills not specified"}
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-600">
                        <Mail className="h-5 w-5 mr-2" />
                        {mentor.email}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <Phone className="h-5 w-5 mr-2" />
                        {mentor.mobile}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Section */}
        {activeSection === "booking" && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Session</h2>
            
            {/* Date Selection */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateWeek('prev')}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="grid grid-cols-7 gap-4">
                {generateDateRange().map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 rounded-lg text-center transition-colors ${
                      date.toDateString() === selectedDate.toDateString()
                        ? 'bg-green-400 text-white'
                        : getAvailableSlotsForDate(date).length === 0
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'hover:bg-gray-100 bg-purple-200'
                    }`}
                  >
                    <div className="text-sm font-medium">{formatDate(date)}</div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => navigateWeek('next')}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Time Slots */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Time Slots
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {getAvailableSlotsForDate(selectedDate).map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => setSelectedTimeSlot(slot._id)}
                    className={`p-4 rounded-lg border transition-colors ${
                      selectedTimeSlot === slot._id
                        ? 'border-orange-500 bg-orange-500 shadow-lg shadow-orange-300'
                        : 'border-gray-200 hover:border-purple-700  hover:bg-purple-700 bg-purple-500'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      {selectedTimeSlot !== slot._id
                        ? <Clock className="h-5 w-5 text-white" />
                        : <AlarmClockCheck className="h-7 w-7 text-white" />
                      }
                    </div>
                    <div className={`${selectedTimeSlot == slot._id ? "text-md font-semibold" : "text-sm font-medium"} text-center text-white transition-all ease-in-out duration-300`}>
                      {formatTime(new Date(slot.startTime))}
                    </div>
                    <div className={`${selectedTimeSlot == slot._id ? "text-md font-semibold text-white" : "text-sm text-white"} text-center mt-1`}>
                      ₹{slot.price}
                    </div>
                  </button>
                ))}
              </div>

              {getAvailableSlotsForDate(selectedDate).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No available slots for this date
                </div>
              )}
            </div>

            {/* Booking Button */}
            {selectedTimeSlot && (
              <div className="mt-8 flex justify-end">
                <Link href={`/bookSlot/${selectedTimeSlot}`}>
                  <PrimaryButton
                    type="button"
                    name="Book Session"
                  />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Reviews Section */}
        {activeSection === "reviews" && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="mb-6">
              <h3 className="text-2xl text-black font-bold mb-4">Mentor Reviews</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(ratingAverage)}
                  <span className="text-gray-600 ml-2">
                    {(Number(ratingAverage) || 0).toFixed(1)} ({reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button 
                onClick={handleReviewFormToggle} 
                className="py-2 px-4 bg-purple-500 rounded-lg text-white mb-3 hover:bg-purple-600 flex items-center"
              >
                <StarIcon className="mr-2" />
                Add Review & Rating
              </button>
            </div>

            {/* Review Submission Form */}
            {toggleReview && (
              <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl text-black font-semibold mb-4">Write a Review</h4>
                <div className="mb-4">
                  <label className="block text-black mb-2">Your Rating</label>
                  <div className="flex space-x-1">
                    {renderStars(newReview.rating, true, (rating) => setNewReview(prev => ({...prev, rating})))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-black mb-2">Your Review</label>
                  <textarea 
                    className="w-full text-black p-2 border rounded-lg"
                    rows={4}
                    placeholder="Share your experience with this mentor"
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
            )}

            {/* Existing Reviews */}
            <div>
              <h4 className="text-xl text-black font-semibold mb-4">Student Reviews</h4>
              {reviews?.length === 0 ? (
                <div className="bg-white text-black p-4 rounded-lg shadow-sm">
                  No reviews for this mentor yet!
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
                      <img src={review.userId.profilePicUrl} className="w-12 h-12 rounded-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <h5 className="text-black font-semibold">{review.userId.username}</h5>
                          <span className="text-gray-500 text-sm">{review.date}</span>
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
    </div>
  );
}