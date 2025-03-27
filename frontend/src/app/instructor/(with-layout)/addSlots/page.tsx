"use client";
import { createSlots } from "@/api/bookingApi";
import { getInstructorData } from "@/api/instructorApi";
import Loading from "@/app/components/fallbacks/Loading";
import GetVerified from "@/app/components/instructor/GetVerified";
import { RootState } from "@/redux/store";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface SlotFormData {
  startDate: string;
  endDate: string;
  days: number[];
  startTime: string;
  endTime: string;
  price: number;
}
interface InstructorData {
  _id: string;
  planPrice: number;
  isVerified: boolean;
}

const SlotCreationForm = () => {
  const [instructorData, setInstructorData] = useState<InstructorData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const instructorEmail = useSelector(
    (state: RootState) => state.instructor.email
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SlotFormData>({
    defaultValues: {
      startDate: "",
      endDate: "",
      days: [],
      startTime: "",
      endTime: "",
    },
  });
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getInstructorData(instructorEmail);
        setInstructorData(userData || {});
        
      } catch (error) {
        toast.error("something Wrong!");
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const watchDays = watch("days", []);

  const weekDays = [
    { id: 0, name: "Sunday" },
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
  ];

  const handleDayToggle = (dayId: number) => {
    const currentDays = watchDays;
    const newDays = currentDays.includes(dayId)
      ? currentDays.filter((d) => d !== dayId)
      : [...currentDays, dayId];
    setValue("days", newDays, { shouldValidate: true });
  };

  
  const getUTCTime = (localTime: string, timezoneOffset: string) => {
    const date = new Date(`${localTime}${timezoneOffset}`);
    return date.toISOString(); // Convert to UTC
  };
  
  const onSubmit = async (data: SlotFormData) => {
    try {
      const instructorId = instructorData?._id;
      const price = instructorData?.planPrice;
  
      // Get the user's timezone offset (e.g., "+05:30" for IST)
      const timezoneOffset = new Date().getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
      const offsetMinutes = Math.abs(timezoneOffset % 60);
      const timezoneSign = timezoneOffset > 0 ? '-' : '+';
      const timezoneString = `${timezoneSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
  
      // Convert local times to UTC
      const startTimeUTC = getUTCTime(`${data.startDate}T${data.startTime}:00`, timezoneString);
      const endTimeUTC = getUTCTime(`${data.endDate}T${data.endTime}:00`, timezoneString);
  
      // Send UTC times to the backend
      const formattedData = {
        ...data,
        startTime: startTimeUTC, // UTC time
        endTime: endTimeUTC,     // UTC time
        instructorId,
        price,
        timezone: timezoneString, // Send the timezone offset
      };
  
  
      const response = await createSlots(formattedData);
  
      if (response.success) {
        router.replace('/instructor/slots');
        toast.success('Slots created successfully!');
      }
    } catch (error) {
      console.error('Failed to create slots:', error);
      toast.error('Failed to create slots. Please try again.');
    }
  };
    if (isLoading) return <Loading />;
  
  if (!instructorData?.isVerified) return <GetVerified />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl text-black font-semibold mb-6">
        Create Appointment Slots
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              min={today}  // Add this line to prevent selecting past dates
              {...register("startDate", { 
                required: "Start date is required",
                validate: (value) => 
                  value >= today || "Start date cannot be in the past"
              })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              min={today}  // Add this line to prevent selecting past dates
              {...register("endDate", {
                required: "End date is required",
                validate: (value) => {
                  const startDate = watch("startDate");
                  return (
                    (!startDate || value >= startDate) &&
                    (value >= today || "End date cannot be in the past") ||
                    "End date must be after start date"
                  );
                },
              })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.endDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              {...register("startTime", { required: "Start time is required" })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-600">
                {errors.startTime.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <input
              type="time"
              {...register("endTime", {
                required: "End time is required",
                validate: (value) => {
                  const startTime = watch("startTime");
                  return (
                    !startTime ||
                    value > startTime ||
                    "End time must be after start time"
                  );
                },
              })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600">
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Days
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => handleDayToggle(day.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    watchDays.includes(day.id)
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {day.name}
              </button>
            ))}
          </div>
          {errors.days && (
            <p className="mt-1 text-sm text-red-600">{errors.days.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price per Session{" "}
            <Link href={"/instructor/profile"}>
              <span className="bg-purple-300 rounded-lg flex-grow px-2 py-1 ml-2">
                Change Plan Price
              </span>
            </Link>
          </label>

          <div className="">
            <h2 className="text-purple-500 text-2xl font-semibold">
              ₹ {instructorData?.planPrice}
            </h2>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Slots
          </button>
        </div>
      </form>
    </div>
  );
};

export default SlotCreationForm;