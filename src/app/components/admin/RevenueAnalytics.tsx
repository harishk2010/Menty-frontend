import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpenIcon, CalendarIcon, DollarSignIcon, TrendingUpIcon } from 'lucide-react';
import { motion } from "framer-motion";

interface Transaction {
  date: Date;
  amount: number;
  description: string;
  type: "credit" | "debit";
  txnid: string;
}

interface RevenueData {
  name: string;
  courseRevenue: number;
  bookingRevenue: number;
}

interface RevenueDistribution {
  name: string;
  value: number;
}

interface RevenueAnalyticsProps {
  transactions: Transaction[];
}

const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ transactions }) => {
  const [courseRevenue, setCourseRevenue] = useState<number>(0);
  const [bookingRevenue, setBookingRevenue] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<RevenueData[]>([]);
  const [revenueDistribution, setRevenueDistribution] = useState<RevenueDistribution[]>([]);

  useEffect(() => {
    if (!transactions || !transactions.length) return;

    // Calculate total revenue by type
    let totalCourseRevenue = 0;
    let totalBookingRevenue = 0;

    transactions.forEach((txn: Transaction) => {
      if (txn.type === 'credit') {
        const description = txn.description || '';
        if (description.includes('Course')) {
          totalCourseRevenue += txn.amount;
        } else if (description.includes('Booking')) {
          totalBookingRevenue += txn.amount;
        }
      }
    });

    setCourseRevenue(totalCourseRevenue);
    setBookingRevenue(totalBookingRevenue);

    // Prepare data for the pie chart
    setRevenueDistribution([
      { name: 'Course Revenue', value: totalCourseRevenue },
      { name: 'Booking Revenue', value: totalBookingRevenue }
    ]);

    // Prepare monthly data for the bar chart
    const monthlyRevenueMap = new Map<string, RevenueData>();

    transactions.forEach((txn: Transaction) => {
      if (txn.type === 'credit') {
        const date = new Date(txn.date);
        const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

        if (!monthlyRevenueMap.has(monthYear)) {
          monthlyRevenueMap.set(monthYear, {
            name: monthYear,
            courseRevenue: 0,
            bookingRevenue: 0
          });
        }

        const entry = monthlyRevenueMap.get(monthYear)!;
        const description = txn.description || '';

        if (description.includes('Course')) {
          entry.courseRevenue += txn.amount;
        } else if (description.includes('Booking')) {
          entry.bookingRevenue += txn.amount;
        }
      }
    });

    // Convert map to array and sort by date
    const monthlyDataArray = Array.from(monthlyRevenueMap.values());
    setMonthlyData(monthlyDataArray);
  }, [transactions]);

  const COLORS = ['#6366f1', '#8b5cf6'];
  const totalRevenue = courseRevenue + bookingRevenue;

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
    className="bg-gray-800 text-gray-100 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
      <h2 className="text-xl font-bold mb-6 text-indigo-300">Revenue Analytics</h2>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-gray-300 font-medium">Total Revenue</h4>
            <div className="p-2 bg-indigo-900/30 rounded-full">
              <DollarSignIcon className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-indigo-400">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-2">{transactions?.length || 0} transactions total</p>
        </div>

        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-gray-300 font-medium">Course Revenue</h4>
            <div className="p-2 bg-purple-900/30 rounded-full">
              <BookOpenIcon className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-400">₹{courseRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-2">
            {totalRevenue > 0 ? `${((courseRevenue / totalRevenue) * 100).toFixed(1)}%` : '0%'} of total
          </p>
        </div>

        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-gray-300 font-medium">Booking Revenue</h4>
            <div className="p-2 bg-blue-900/30 rounded-full">
              <CalendarIcon className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-400">₹{bookingRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-2">
            {totalRevenue > 0 ? `${((bookingRevenue / totalRevenue) * 100).toFixed(1)}%` : '0%'} of total
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart */}
        <div className="bg-gray-700/50 p-6 rounded-lg lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-gray-300 font-medium">Monthly Revenue Breakdown</h4>
            <div className="p-2 bg-green-900/30 rounded-full">
              <TrendingUpIcon className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    color: '#f3f4f6',
                    border: '1px solid #374151'
                  }}
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, '']}
                />
                <Legend />
                <Bar dataKey="courseRevenue" name="Course Revenue" fill="#8b5cf6" />
                <Bar dataKey="bookingRevenue" name="Booking Revenue" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-700/50 p-6 rounded-lg lg:col-span-4">
          <h4 className="text-gray-300 font-medium mb-4">Revenue Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }: { name: string, percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {revenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    color: '#f3f4f6',
                    border: '1px solid #374151'
                  }}
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-400"></div>
              <span className="text-sm text-gray-300">Course Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-400"></div>
              <span className="text-sm text-gray-300">Booking Revenue</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueAnalytics;