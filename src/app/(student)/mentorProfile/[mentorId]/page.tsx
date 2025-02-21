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
  ChevronRight
} from 'lucide-react';
import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import { getInstructorData, getInstructorDataById } from '@/api/instructorApi';
import { getSlots } from '@/api/bookingApi';
import Link from 'next/link';

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

export default function MentorProfile() {
  const { mentorId } = useParams<{mentorId:string}>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentorAndSlots = async () => {
      try {
        setLoading(true);
        const [mentorData, slotsData] = await Promise.all([
          getInstructorDataById(mentorId),
          getSlots(mentorId)
        ]);
        setMentor(mentorData);
        setSlots(slotsData.data || []);
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                  <span className="flex items-center text-gray-600">
                    <Briefcase className="h-5 w-5 mr-1" />
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">About</h2>
                <div className="mt-4 space-y-4">
                  <p className="text-gray-600">
                    <Award className="h-5 w-5 inline mr-2" />
                  </p>
                  <p className="text-gray-600">
                    <Star className="h-5 w-5 inline mr-2" />
                    Skills: {mentor.skills}
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
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
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
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="text-sm font-medium text-center">
                    {formatTime(new Date(slot.startTime))}
                  </div>
                  <div className="text-sm text-gray-600 text-center mt-1">
                    ${slot.price}
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
      </div>
    </div>
  );
}