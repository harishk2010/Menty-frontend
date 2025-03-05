"use client"
import React from 'react';
import { 
  UsersIcon, 
  BookOpenIcon,
  DollarSignIcon,
  ActivityIcon,
  ServerIcon,
  AwardIcon,
  ClockIcon
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from "framer-motion";

// TypeScript Interfaces
interface AdminStatistics {
  totalStudents: {
    count: number;
    newThisMonth: number;
  };
  totalInstructors: {
    count: number;
    newThisMonth: number;
    topEarners: number;
  };
  totalCourses: number;
  totalRevenue: number;
  pendingInstructorApplications: number;
}

interface InstructorDetail {
  id: string;
  name: string;
  email: string;
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  rating: number;
}

interface StudentDetail {
  id: string;
  name: string;
  email: string;
  coursesEnrolled: number;
  totalCertificates: number;
  lastActivityDate: string;
}

interface RevenueDataPoint {
  name: string;
  value: number;
}

const AdminDashboard: React.FC = () => {
  // Detailed Statistics
  const adminStats: AdminStatistics = {
    totalStudents: {
      count: 1212,
      newThisMonth: 87
    },
    totalInstructors: {
      count: 42,
      newThisMonth: 5,
      topEarners: 10
    },
    totalCourses: 87,
    totalRevenue: 124500,
    pendingInstructorApplications: 5
  };

  // Detailed Instructor Data
  const topInstructors: InstructorDetail[] = [
    {
      id: '1',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      totalCourses: 7,
      totalStudents: 450,
      totalRevenue: 35000,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      totalCourses: 5,
      totalStudents: 320,
      totalRevenue: 28000,
      rating: 4.6
    }
  ];

  // Detailed Student Data
  const recentStudents: StudentDetail[] = [
    {
      id: '1',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      coursesEnrolled: 4,
      totalCertificates: 3,
      lastActivityDate: '2025-02-28'
    },
    {
      id: '2',
      name: 'David Rodriguez',
      email: 'david@example.com',
      coursesEnrolled: 2,
      totalCertificates: 1,
      lastActivityDate: '2025-02-25'
    }
  ];

  // Revenue and Growth Data
  const monthlyRevenueData: RevenueDataPoint[] = [
    { name: 'Sep', value: 15000 },
    { name: 'Oct', value: 18000 },
    { name: 'Nov', value: 22000 },
    { name: 'Dec', value: 26000 },
    { name: 'Jan', value: 29000 },
    { name: 'Feb', value: 32000 }
  ];

  const COLORS: string[] = ['#6366f1', '#8b5cf6', '#6d28d9', '#7e22ce'];

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-300">Admin Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gray-800  hover:shadow-lg hover:shadow-purple-900 transition-all duration-200 ease-in-out p-6 rounded-md shadow-purple-900 shadow-sm border border-gray-700 xl:col-span-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Students</p>
              <h3 className="text-2xl text-indigo-400 font-bold">{adminStats.totalStudents.count}</h3>
            </div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <UsersIcon className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <p className="text-sm text-green-500 mt-4">+{adminStats.totalStudents.newThisMonth} this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 xl:col-span-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Instructors</p>
              <h3 className="text-2xl text-purple-400 font-bold">{adminStats.totalInstructors.count}</h3>
            </div>
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <p className="text-sm text-green-500 mt-4">+{adminStats.totalInstructors.newThisMonth} this month</p>
        </motion.div>

        {/* Additional stats cards with similar dark mode styling */}
      </div>
      
      {/* Detailed Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Instructors Table */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 lg:col-span-7">
          <h3 className="text-lg text-indigo-300 font-semibold mb-4">Top Instructors</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Courses</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Students</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Revenue</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topInstructors.map(instructor => (
                  <tr key={instructor.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="py-3 px-4 text-gray-100 text-sm font-medium">{instructor.name}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{instructor.totalCourses}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{instructor.totalStudents}</td>
                    <td className="py-3 px-4 text-green-400 text-sm">${instructor.totalRevenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-yellow-400 text-sm">
                      {instructor.rating.toFixed(1)}★
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Students Table */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 lg:col-span-5">
          <h3 className="text-lg text-indigo-300 font-semibold mb-4">Recent Students</h3>
          <div className="space-y-4">
            {recentStudents.map(student => (
              <div 
                key={student.id} 
                className="flex items-center justify-between p-3 rounded-lg border border-gray-700 hover:bg-gray-700/50"
              >
                <div>
                  <p className="text-gray-100 font-medium">{student.name}</p>
                  <p className="text-sm text-gray-400">
                    {student.coursesEnrolled} Courses • {student.totalCertificates} Certificates
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(student.lastActivityDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Revenue Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 lg:col-span-8">
          <h3 className="text-lg text-indigo-300 font-semibold mb-4">Monthly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    color: '#f3f4f6',
                    border: '1px solid #374151'
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Instructor Breakdown */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 lg:col-span-4">
          <h3 className="text-lg text-indigo-300 font-semibold mb-4">Instructor Insights</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Instructors</span>
              <span className="text-indigo-400 font-bold">{adminStats.totalInstructors.count}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Top Earning Instructors</span>
              <span className="text-green-400 font-bold">{adminStats.totalInstructors.topEarners}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">New Instructors</span>
              <span className="text-purple-400 font-bold">{adminStats.totalInstructors.newThisMonth}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;