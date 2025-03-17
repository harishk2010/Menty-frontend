'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { format, isToday, isFuture, isPast, isWithinInterval, subMinutes } from 'date-fns';
import { Clock, Calendar, User, Star } from 'lucide-react';
import { getStudentData } from '@/api/studentApi';
import { getStudentBookings } from '@/api/bookingApi';
import { getInstructorDataById } from '@/api/instructorApi';
import { getSlot } from '@/api/bookingApi';
import { addMentorReview } from '@/api/instructorApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Instructor {
    _id: string;
    username: string;
    email: string;
    profilePicUrl: string;
}

interface Slot {
    _id: string;
    startTime: Date;
    endTime: Date;
    price: number;
}

interface Booking {
    _id: string;
    studentId: string;
    instructorId: string;
    slotId: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    txnid: string;
    amountPaid: number;
    createdAt: Date;
    hasReview?: boolean;
}

interface EnrichedBooking extends Omit<Booking, 'instructorId' | 'slotId'> {
    instructorData?: Instructor;
    slotData?: Slot;
    instructorId: string;
    slotId: string;
}

const StudentBookings = () => {
    const [bookings, setBookings] = useState<EnrichedBooking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed' | 'cancelled'>('today');
    const [showFeedbackForm, setShowFeedbackForm] = useState<string | null>(null);
    const [review, setReview] = useState<{rating: number, comment: string}>({
        rating: 0,
        comment: ""
    });
    const userData = useSelector((state: RootState) => state.user);
    const router = useRouter();

    const fetchBookingDetails = async (booking: Booking): Promise<EnrichedBooking> => {
        try {
            const [instructorResponse, slotResponse] = await Promise.all([
                getInstructorDataById(booking.instructorId),
                getSlot(booking.slotId)
            ]);

            return {
                ...booking,
                instructorData: instructorResponse,
                slotData: slotResponse.data
            };
        } catch (error) {
            // console.error(`Error fetching details for booking ${booking._id}:`, error);
            return {
                ...booking,
                instructorData: undefined,
                slotData: undefined
            };
        }
    };

    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
                setIsLoading(true);
                const user = await getStudentData(userData.email);
                const response = await getStudentBookings(user._id);
                
                if (!response.data) {
                    throw new Error('No bookings data received');
                }

                const bookingsData = response.data;
                const enrichedBookings = await Promise.all(
                    bookingsData.map(fetchBookingDetails)
                );

                setBookings(enrichedBookings);
            } catch (error) {
                // console.error('Failed to fetch bookings:', error);
                toast.error('Failed to load bookings. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        if (userData?.email) {
            fetchAllBookings();
        }
    }, [userData?.email]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleJoinChat = (booking: EnrichedBooking) => {
        router.push(`/chat/${booking._id}`);
    };

    const getFilteredBookings = () => {
        return bookings.filter(booking => {
            if (!booking.slotData) return false;
            
            const startTime = new Date(booking.slotData.startTime);
            const now = new Date();
            
            switch (activeTab) {
                case 'today':
                    return isToday(startTime) && booking.status !== 'cancelled';
                case 'upcoming':
                    return isFuture(startTime) && !isToday(startTime) && booking.status !== 'cancelled';
                case 'completed':
                    return isPast(startTime) || booking.status === 'completed';
                case 'cancelled':
                    return booking.status === 'cancelled';
                default:
                    return false;
            }
        });
    };

    const handleCancelBooking = async (bookingId: string) => {
        try {
            // Implement your cancel booking API call here
            toast.success('Booking cancelled successfully');
            const updatedBookings = bookings.map(booking => 
                booking._id === bookingId 
                    ? { ...booking, status: 'cancelled' as const }
                    : booking
            );
            setBookings(updatedBookings);
        } catch (error) {
            toast.error('Failed to cancel booking');
        }
    };

    const handleReschedule = (bookingId: string) => {
        // Implement your reschedule navigation logic here
    };

    const handleLeaveFeedback = (bookingId: string) => {
        setShowFeedbackForm(bookingId);
        setReview({rating: 0, comment: ""});
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

    const handleSubmitFeedback = async (e: React.FormEvent, booking: EnrichedBooking) => {
        e.preventDefault();
        
        if (review.rating === 0) {
            toast.error("Please select a rating");
            return;
        }
      
        if (!booking.instructorId) {
            toast.error("Mentor information is missing");
            return;
        }
      
        try {
            const response = await addMentorReview(
                booking.instructorId, 
                review.rating, 
                review.comment
            );
          
            if (response?.success) {
                toast.success('Review submitted successfully');
                
                // Update the booking to mark it as reviewed
                const updatedBookings = bookings.map(b => 
                    b._id === booking._id 
                        ? { ...b, hasReview: true }
                        : b
                );
                setBookings(updatedBookings);
                
                // Reset the form
                setReview({ rating: 0, comment: "" });
                setShowFeedbackForm(null);
            } else {
                toast.error(response?.message || 'Failed to submit review');
            }
        } catch (error: any) {
            console.error('Review submission error:', error);
            toast.error( 'Already  submited review !');
        }
    };

    const filteredBookings = getFilteredBookings();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

                <div className="flex space-x-2 mb-6">
                    {['today', 'upcoming', 'completed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as 'today' | 'upcoming' | 'completed' | 'cancelled')}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${
                                activeTab === tab
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredBookings.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                            <p className="text-gray-600 text-lg">No {activeTab} bookings found</p>
                        </div>
                    ) : (
                        filteredBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between flex-wrap gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <img
                                                src={booking.instructorData?.profilePicUrl || '/placeholder-avatar.png'}
                                                alt={booking.instructorData?.username || 'Instructor'}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            {(activeTab === 'upcoming' || activeTab === 'today') && (
                                                <div className="absolute -top-1 -right-1">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {booking.instructorData?.username || 'Loading...'}
                                            </h3>
                                            <p className="text-gray-600">{booking.instructorData?.email || 'Loading...'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-6">
                                        <div className="text-right">
                                            <span className="text-sm text-gray-500">Amount Paid</span>
                                            <p className="text-lg font-semibold text-gray-900">
                                                ₹{booking.slotData?.price}
                                            </p>
                                        </div>
                                        <div
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                                                booking.status
                                            )}`}
                                        >
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {booking.slotData && (
                                        <>
                                            <div className="flex items-center space-x-2 text-gray-600">
                                                <Calendar className="w-5 h-5" />
                                                <span>
                                                    {format(new Date(booking.slotData.startTime), 'MMM dd, yyyy')}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-600">
                                                <Clock className="w-5 h-5" />
                                                <span>
                                                    {format(new Date(booking.slotData.startTime), 'hh:mm a')} -{' '}
                                                    {format(new Date(booking.slotData.endTime), 'hh:mm a')}
                                                </span>
                                            </div>
                                            {booking.status !== 'upcoming' && (
                                                <div className="flex items-center justify-end">
                                                    {isWithinInterval(new Date(), {
                                                        start: subMinutes(new Date(booking.slotData.startTime), 5),
                                                        end: new Date(booking.slotData.endTime)
                                                    }) && (
                                                        <button
                                                            onClick={() => handleJoinChat(booking)}
                                                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                                        >
                                                            Join Chat
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <User className="w-5 h-5" />
                                        <span>1-on-1 Session</span>
                                    </div>
                                </div>

                                {activeTab === 'completed' && (
                                    <div className="mt-6 flex items-center justify-end">
                                        {!booking.hasReview && showFeedbackForm !== booking._id && (
                                            <button 
                                                onClick={() => handleLeaveFeedback(booking._id)}
                                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                            >
                                                Leave Review
                                            </button>
                                        )}
                                        {booking.hasReview && (
                                            <div className="px-6 py-2 bg-green-100 text-green-800 rounded-lg">
                                                Feedback Submitted
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Feedback Form */}
                                {showFeedbackForm === booking._id && (
                                    <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Rate Your Experience with {booking.instructorData?.username}
                                        </h3>
                                        <form onSubmit={(e) => handleSubmitFeedback(e, booking)}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 mb-2">Your Rating</label>
                                                <div className="flex space-x-1">
                                                    {renderStars(review.rating, true, (rating) => setReview(prev => ({...prev, rating})))}
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 mb-2">Your Review</label>
                                                <textarea 
                                                    className="w-full p-2 border rounded-lg text-gray-800"
                                                    rows={4}
                                                    placeholder="Share your experience with this mentor"
                                                    value={review.comment}
                                                    onChange={(e) => setReview(prev => ({...prev, comment: e.target.value}))}
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end space-x-3">
                                                <button 
                                                    type="button" 
                                                    onClick={() => setShowFeedbackForm(null)}
                                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    type="submit" 
                                                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                                >
                                                    Submit Review
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Transaction ID: {booking.txnid}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentBookings;