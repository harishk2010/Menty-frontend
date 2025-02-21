"use client"

import React, { useState, useEffect } from 'react';
import { getSlots, removeSlot } from '@/api/bookingApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { getInstructorData } from '@/api/instructorApi';

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'available' | 'booked' | 'completed';
}
interface InstructorData{
    _id:string
}
type TabType = 'today' |'thisWeek' | 'upcoming' | 'all' | 'ended';

const InstructorSlotsPage: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('thisWeek');
  const instructorEmail = useSelector((state: RootState) => state.instructor.email);
   const [instructorData,setInstructorData]=useState<InstructorData>()
 useEffect(()=>{
    const fetchData=async()=>{
        try {
            const userData=await getInstructorData(instructorEmail)
            setInstructorData(userData || {})
            
        } catch (error) {
            console.log(error)
            toast.error("something Wrong!")
            
        }
    }
    fetchData()

  },[])
  useEffect(() => {
    fetchSlots();
  }, [instructorData]);

  const fetchSlots = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getSlots(instructorData?._id as string);
      setSlots(response.data || []);
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSlot = async (slotId: string): Promise<void> => {
   
    try {
      const response = await removeSlot(slotId)
      if (response.success) {
        setSlots(slots.filter(slot => slot._id !== slotId));
        toast.success(response.message)
      }
    } catch (error) {
      console.error('Failed to delete slot:', error);
    }
  };

  const filterSlots = (): Slot[] => {
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(now.getDate() + (6 - now.getDay()));
    weekEnd.setHours(23, 59, 59, 999);

    switch (activeTab) {
      case 'thisWeek':
        return slots.filter(slot => {
          const slotDate = new Date(slot.startTime);
          return slotDate <= weekEnd && slotDate >= now;
        });
      case 'today':
        return slots.filter(slot => {
          const slotDate = new Date(slot.startTime);
          const today=new Date()
          return (
            slotDate.getFullYear() === today.getFullYear() &&
            slotDate.getMonth() === today.getMonth() &&
            slotDate.getDate() === today.getDate()
          );
        });
      case 'upcoming':
        return slots.filter(slot => {
          const slotDate = new Date(slot.startTime);
          return slotDate > weekEnd;
        });
      case 'ended':
        return slots.filter(slot => {
          const slotDate = new Date(slot.startTime);
          return slotDate < weekEnd;
        });
      default:
        return slots;
    }
  };

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusStyle = (status: Slot['status']): string => {
    return status === 'booked' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  const tabs: TabType[] = ['today','thisWeek', 'upcoming', 'all' ,'ended'];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Teaching Slots</h1>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab === 'thisWeek' ? 'This Week' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterSlots().map((slot) => (
          <div
            key={slot._id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="text-lg font-medium text-gray-900">
                {formatDateTime(slot.startTime)}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(slot.status)}`}
              >
                {/* {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)} */}
              </span>
            </div>
            
            <div className="text-gray-600 mb-4">
              End: {formatDateTime(slot.endTime)}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-purple-600">
                ₹{slot.price}
              </span>
              {slot.status !== 'available' && (
                <button
                  onClick={() => deleteSlot(slot._id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorSlotsPage;