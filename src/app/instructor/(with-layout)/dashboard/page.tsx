"use client"
import React from 'react';
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

// Define TypeScript interfaces for the data structures
interface StatisticsData {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  totalAppointments: number;
  appointmentRevenue: number;
  totalCertificatesIssued: number;
}

interface Course {
  id: string;
  title: string;
  price: number;
  students: number;
  rating: number;
  totalRevenue: number;
  publishedDate: string;
}

interface Appointment {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
  studentName: string;
  studentId: string;
}

interface ChartDataPoint {
  name: string;
  value: number;
}

// Define tooltip formatter function with proper type
const currencyFormatter = (value: number | string | Array<number | string>, name: string) => {
  if (typeof value === 'number') {
    return [`$${value}`, name || 'Value'];
  }
  return [`${value}`, name || 'Value'];
};

const InstructorDashboard: React.FC = () => {
  // Statistics data
  const statistics: StatisticsData = {
    totalStudents: 256,
    totalCourses: 5,
    totalRevenue: 4250,
    totalAppointments: 12,
    appointmentRevenue: 840,
    totalCertificatesIssued: 178
  };
  
  // Course performance data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to TypeScript',
      price: 49.99,
      students: 87,
      rating: 4.7,
      totalRevenue: 1750,
      publishedDate: '2024-12-10'
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      price: 79.99,
      students: 64,
      rating: 4.9,
      totalRevenue: 1250,
      publishedDate: '2025-01-15'
    },
    {
      id: '3',
      title: 'Microservices Architecture',
      price: 99.99,
      students: 42,
      rating: 4.6,
      totalRevenue: 1050,
      publishedDate: '2025-02-20'
    }
  ];
  
  // Upcoming appointments
  const appointments: Appointment[] = [
    {
      id: '1',
      date: '2025-03-05',
      startTime: '10:00',
      endTime: '11:00',
      price: 60,
      isBooked: true,
      studentName: 'John Doe',
      studentId: 'std123'
    },
    {
      id: '3',
      date: '2025-03-06',
      startTime: '11:00',
      endTime: '12:00',
      price: 70,
      isBooked: true,
      studentName: 'Jane Smith',
      studentId: 'std456'
    }
  ];
  
  // Monthly revenue data for chart
  const revenueData: ChartDataPoint[] = [
    { name: 'Sep', value: 2100 },
    { name: 'Oct', value: 2800 },
    { name: 'Nov', value: 3200 },
    { name: 'Dec', value: 3900 },
    { name: 'Jan', value: 4100 },
    { name: 'Feb', value: 4250 }
  ];
  
  // Student growth data for chart
  const studentGrowthData: ChartDataPoint[] = [
    { name: 'Sep', value: 145 },
    { name: 'Oct', value: 178 },
    { name: 'Nov', value: 201 },
    { name: 'Dec', value: 214 },
    { name: 'Jan', value: 235 },
    { name: 'Feb', value: 256 }
  ];
  
  // Revenue breakdown data for pie chart
  const revenueBreakdownData: ChartDataPoint[] = [
    { name: 'Course Sales', value: 3410 },
    { name: 'Appointments', value: 840 }
  ];
  
  const COLORS: string[] = ['#a855f7', '#eab308', '#8b5cf6', '#ef4444'];
  
  // Course revenue data for bar chart
  const courseRevenueData: ChartDataPoint[] = courses.map(course => ({
    name: course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title,
    value: course.totalRevenue
  }));
  
  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Instructor Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1">
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
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl text-violet-800 font-bold">${statistics.totalRevenue.toLocaleString()}</h3>
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
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1">
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
      transition={{ duration: 1.5, ease: "easeOut" }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1">
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
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg. Rating</p>
              <h3 className="text-2xl text-violet-800 font-bold">4.7</h3>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <TrendingUpIcon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4">+0.2 from last month</p>
        </motion.div>
        
        <motion.div
        initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.7, ease: "easeOut" }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 xl:col-span-1">
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
        </motion.div>
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
                  label={({name, percent}) =>  `${name} ${(percent || 0) * 100}%`}
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
        {/* Recent Course Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-8">
          <h3 className="text-lg text-violet-800 font-semibold mb-4">Recent Course Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Course</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Students</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Rating</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
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
                    <td className="py-3 text-black px-4 text-sm">${course.totalRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-4">
          <h3 className="text-lg text-black font-semibold mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  <ClockIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-black font-medium">{appointment.studentName}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(appointment.date)} • {appointment.startTime} - {appointment.endTime}
                  </p>
                </div>
              </div>
            ))}
            
            <button className="w-full mt-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
              View All Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;