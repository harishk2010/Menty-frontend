
"use client"
import React, { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  IndianRupeeIcon,
  ClockIcon,
  TrendingUpIcon,
  BookOpenIcon,
  AwardIcon
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from "framer-motion";
import { getInstructorDashboard } from '@/api/courseApi';
import { getInstructorBookings } from '@/api/bookingApi';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import ReadyToStart from '@/app/components/instructor/ReadyToStart';

// Define TypeScript interfaces based on the backend model
interface InstructorDashboardData {
  statistics: {
    totalStudents: number;
    totalCourses: number;
    totalRevenue: number;
    totalAppointments: number;
    appointmentRevenue: number;
    totalCertificatesIssued: number;
  };
  revenueData: {
    name: string;
    value: number;
  }[];
  studentGrowthData: {
    name: string;
    value: number;
  }[];
  revenueBreakdownData: {
    name: string;
    value: number;
  }[];
  coursePerformance: {
    id: string;
    title: string;
    price: number;
    students: number;
    rating: number;
    totalRevenue: number;
    publishedDate: string;
  }[];
  upcomingAppointments: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    isBooked: boolean;
    studentName: string;
    studentId: string;
  }[];
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
}


// Define tooltip formatter function with proper type
const currencyFormatter = (value: number | string | Array<number | string>, name: string) => {
  if (typeof value === 'number') {
    return [`₹${value.toFixed(2)}`, name || 'Value'];
  }
  return [`₹${value}`, name || 'Value'];
};

const InstructorDashboard: React.FC = () => {
      const [bookings, setBookings] = useState<Booking[]>([]);
  
  const [dashboardData, setDashboardData] = useState<InstructorDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const instructorData = useSelector((state: RootState) => state.instructor);

 
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await getInstructorDashboard()
        if (!instructorData.userId) {
          throw new Error('No instructor ID found');
      }
      
      const instructor = await getInstructorBookings(instructorData.userId);
      
      if (!response.data) {
          throw new Error('No bookings data received');
      }

      const bookingsData = instructor.data;
      setBookings(bookingsData)

        if (!response.success) {
          throw new Error('Failed to fetch dashboard data');
        }

        const result = await response;
        if (result.success && result.data) {
          setDashboardData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Define colors for pie chart
  const COLORS: string[] = ['#a855f7', '#eab308', '#8b5cf6', '#ef4444'];

  // Create course revenue data for bar chart
  const courseRevenueData = dashboardData?.coursePerformance.map(course => ({
    name: course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title,
    value: course.totalRevenue
  })) || [];

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-800"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">Error</h3>
          <p className="text-red-600">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If data hasn't loaded yet, don't render
  if (!dashboardData) {
    return null;
  }

  const { statistics, revenueData, studentGrowthData, revenueBreakdownData, coursePerformance, upcomingAppointments } = dashboardData;

  return (
    <div className="bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Instructor Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Students</p>
              <h3 className="text-2xl text-violet-800 font-bold">{statistics.totalStudents}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <UsersIcon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4">+12% from last month</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl text-violet-800 font-bold">₹{statistics.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <IndianRupeeIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4">+8% from last month</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Appointments</p>
              <h3 className="text-2xl text-violet-800 font-bold">{statistics.totalAppointments}</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <ClockIcon className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4">+15% from last month</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Courses</p>
              <h3 className="text-2xl text-violet-800 font-bold">{statistics.totalCourses}</h3>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4">+1 from last month</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg. Rating</p>
              <h3 className="text-2xl text-violet-800 font-bold">
                {coursePerformance.length > 0 
                  ? (coursePerformance.reduce((sum, course) => sum + course.rating, 0) / coursePerformance.length).toFixed(1) 
                  : 'N/A'}
              </h3>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <TrendingUpIcon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4">+0.2 from last month</p>
        </motion.div>
        
        
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Certificates</p>
              <h3 className="text-2xl text-violet-800 font-bold">{statistics.totalCertificatesIssued}</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <AwardIcon className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4">+24 from last month</p>
        </motion.div> */}
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-8">
          <h3 className="text-lg text-violet-800 font-semibold mb-4">Revenue Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={currencyFormatter} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Revenue Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-4">
          <h3 className="text-lg text-violet-800 font-semibold mb-4">Revenue Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) =>  `${name} ${((percent || 0) *100).toFixed(2)}%`}
                >
                  {revenueBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={currencyFormatter} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Student Growth */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-6">
          <h3 className="text-lg text-violet-800 font-semibold mb-4">Student Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studentGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} name="Students" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Course Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-6">
          <h3 className="text-lg text-violet-800 font-semibold mb-4">Course Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseRevenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={currencyFormatter} />
                <Bar dataKey="value" fill="#8b5cf6" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-8">
          <h3 className="text-lg text-violet-800 font-semibold mb-4">Course Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Course</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Students</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Rating</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Revenue</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Published</th>
                </tr>
              </thead>
              <tbody>
                {coursePerformance.map(course => (
                  <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-black text-sm font-medium">{course.title}</td>
                    <td className="py-3 px-4 text-black text-sm">{course.students}</td>
                    <td className="py-3 px-4 text-black text-sm">
                      <div className="flex items-center">
                        <span className="mr-2">{course.rating}</span>
                        <div className="relative w-24 h-2 bg-gray-200 rounded">
                          <div 
                            className="absolute top-0 left-0 h-2 bg-yellow-400 rounded"
                            style={{ width: `${(course.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-black px-4 text-sm">₹{course.totalRevenue}</td>
                    <td className="py-3 text-black px-4 text-sm">{formatDate(course.publishedDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        
        {/* Upcoming Appointments */}
        {/* <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-4">
          <h3 className="text-lg text-violet-800 font-semibold mb-4">Upcoming Appointments</h3>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                  <div className="p-2 bg-blue-50 rounded-lg mr-3">
                    <ClockIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-black font-medium">{appointment.studentName}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(appointment.date)} • {appointment.startTime} - {appointment.endTime}
                    </p>
                    <p className="text-sm text-green-600">${appointment.price}</p>
                  </div>
                </div>
              ))}
              
              <button className="w-full mt-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                View All Appointments
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <ClockIcon className="w-12 h-12 text-gray-300 mb-2" />
              <p className="text-gray-500">No upcoming appointments</p>
            </div>
          )}
        </div> */}
      </div>
      <ReadyToStart/>
    </div>
  );
};

export default InstructorDashboard;