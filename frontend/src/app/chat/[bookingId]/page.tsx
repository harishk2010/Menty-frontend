
"use client"
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import ChatInterface from '@/app/components/common/chat/ChatInterface';
import { getBookindDataById, getSlot } from '@/api/bookingApi';

interface BookingData {
  _id: string;
  studentId: string;
  instructorId: string;
  slotId: string;
}

interface SlotData {
  startTime: string;
  endTime: string;
}

const ChatPage = () => {
  const router = useRouter();
  const { bookingId } = useParams<{bookingId: string}>();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [slot, setSlot] = useState<SlotData>();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (bookingId) {
      const fetchData = async () => {
        try {
          const response = await getBookindDataById(bookingId);
          if (!response) {
            return;
          }
          setBooking(response.data);
          const slotData = await getSlot(response.data.slotId);
          if (!slotData) {
            return;
          }
          setSlot(slotData?.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-[500px] bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600">Booking not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-white">Chat Session</h1>
        <div className="mb-4">
          <button 
            onClick={() => router.back()} 
            className="text-white bg-violet-700 hover:bg-violet-800 px-4 py-2 rounded-lg transition-colors"
          >
            ← Back to Bookings
          </button>
        </div>
        
        {slot && (
          <ChatInterface
            bookingId={bookingId}
            studentId={booking.studentId}
            instructorId={booking.instructorId}
            slotStartTime={new Date(slot.startTime)}
            slotEndTime={new Date(slot.endTime)}
          />
        )}
        
        <div className="mt-6 bg-violet-800 p-4 rounded-lg text-white text-sm">
          <p className="font-semibold mb-2">Session Information:</p>
          <p>Booking ID: {bookingId}</p>
          {slot && (
            <>
              <p>Start Time: {new Date(slot.startTime).toLocaleString()}</p>
              <p>End Time: {new Date(slot.endTime).toLocaleString()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;