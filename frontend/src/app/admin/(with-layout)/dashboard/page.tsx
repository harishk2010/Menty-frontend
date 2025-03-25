"use client";
import React, { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  BookOpenIcon,
  DollarSignIcon,
  ClockIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ShieldIcon,
  Wallet,
  ArrowUpIcon,
  ArrowDownIcon,
  CreditCardIcon
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from "framer-motion";
import { adminDashboard, getAdminData } from '@/api/adminApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import Link from 'next/link';
import RevenueAnalytics from '@/app/components/admin/RevenueAnalytics';
import Loading from '@/app/components/fallbacks/Loading';
// Define types directly within the file
interface InstructorDetail {
  _id: string;
  username: string;
  expertise?: string;
  totalStudents: number;
  walletBalance: number;
  rating?: number;
  email: string;
}

interface StudentDetail {
  _id: string;
  username: string;
  coursesEnrolled?: number;
  totalCertificates?: number;
  createdAt: string;
  studiedHours: number;
  email: string;
}

interface Transaction {
  _id?: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  txnId: string;
  date: Date;
}

interface RevenueDataPoint {
  name: string;
  value: number;
}

interface AdminWallet {
  balance: number;
  transactions: Transaction[];
}

interface AdminDashboardData {
  success: boolean;
  message: string;
  data: {
    statistics: {
      totalStudents: {
        count: number;
        newThisMonth: number;
        blockedCount?: number;
      };
      totalInstructors: {
        count: number;
        newThisMonth: number;
        topEarners: number;
        verifiedCount?: number;
        pendingVerification?: number;
        rejectedCount?: number;
        blockedCount?: number;
      };
      totalRevenue: number;
      pendingInstructorApplications: number;
      studyHours?: number;
    };
    monthlyRevenueData: RevenueDataPoint[];
    topInstructors: InstructorDetail[];
    recentStudents: StudentDetail[];
    adminWallet: AdminWallet;
  }
}
interface Transaction{
  date:Date,
  amount:number,
  description:string,
  type:"credit"|"debit",
  txnid:string

}
interface AdminDataInterface{
  name:string,
  adminId:string,
  role:'admin',
  email:string,
  wallet: {
    balance: 0,
    transactions: Transaction[]
  }
}

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminData,setAdminData]=useState<AdminDataInterface| null>()
  const [revenuseStatsOn,setRevenuseStatsOn]=useState<Boolean>(false)
  const adminDetails=useSelector((state:RootState)=>state.admin)
  console.log(adminData,"adminData")

  // Fetch dashboard data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await adminDashboard();
        if(!adminDetails){
          toast.error("Somthing went Wrong!")
          return
        }
        const fetchedData = await getAdminData(String(adminDetails.email));
                  setAdminData(fetchedData.data || {});
        if (!response.success) {
          throw new Error('Failed to fetch dashboard data');
        }
        setDashboardData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="bg-gray-900 text-gray-100 p-6">Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div className="bg-gray-900 text-gray-100 p-6">No data available</div>;
  }

  const { statistics, monthlyRevenueData, topInstructors, recentStudents } = dashboardData;

  // Set default values for missing properties
  const studyHours = statistics.studyHours || 0;
  const blockedStudents = statistics.totalStudents.blockedCount || 0;
  const verifiedInstructors = statistics.totalInstructors.verifiedCount || 0;
  const pendingVerification = statistics.totalInstructors.pendingVerification || statistics.pendingInstructorApplications || 0;
  const rejectedInstructors = statistics.totalInstructors.rejectedCount || 0;
  const blockedInstructors = statistics.totalInstructors.blockedCount || 0;

  // Instructor Status Distribution
  const instructorStatusData = [
    { name: 'Verified', value: verifiedInstructors || Math.round(statistics.totalInstructors.count * 0.7) },
    { name: 'Pending', value: pendingVerification },
    { name: 'Rejected', value: rejectedInstructors || Math.round(statistics.totalInstructors.count * 0.1) }
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#f43f5e', '#7e22ce'];

  // Helper function to format date
  const formatDate = (dateString: string | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate earnings (sum of all credit transactions)
  const adminWallet=adminData?.wallet
  if(!adminWallet)return
  const totalEarnings = adminWallet.transactions
    .filter(txn => txn.type === 'credit')
    .reduce((sum, txn) => sum + txn.amount, 0);

  // Sort transactions by date (newest first)
  const recentTransactions = [...adminWallet?.transactions]
    .reverse()
    .slice(0, 5); // Get only the 5 most recent transactions

  return (
    <div className="bg-gray-900 text-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-300">Admin Dashboard</h2>

      
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gray-800 hover:shadow-lg hover:shadow-purple-900 transition-all duration-200 ease-in-out p-6 rounded-md shadow-purple-900 shadow-sm border border-gray-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Students</p>
              <h3 className="text-2xl text-indigo-400 font-bold">{statistics.totalStudents.count}</h3>
            </div>
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <UsersIcon className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <p className="text-sm text-green-500 mt-4">+{statistics.totalStudents.newThisMonth} this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Instructors</p>
              <h3 className="text-2xl text-purple-400 font-bold">{statistics.totalInstructors.count}</h3>
            </div>
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <p className="text-sm text-green-500 mt-4">+{statistics.totalInstructors.newThisMonth} this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Revenue <span className='text-green-300'>(Instructors)</span></p>
              <h3 className="text-2xl text-green-400 font-bold">₹{statistics.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-green-900/30 rounded-lg">
              <DollarSignIcon className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <p className="text-sm text-green-500 mt-4">+₹{(statistics.totalRevenue * 0.12).toFixed(0)} this month</p>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400 mb-1">Study Hours</p>
              <h3 className="text-2xl text-blue-400 font-bold">{studyHours.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-blue-900/30 rounded-lg">
              <ClockIcon className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-green-500 mt-4">+{(studyHours * 0.08).toFixed(0)} this month</p>
        </motion.div> */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="bg-gray-800 p-6 rounded-lg flex justify-center items-center shadow-lg border border-gray-700"
        >
          <div className="flex flex-col justify-between  items-center  ">
           <button onClick={()=>setRevenuseStatsOn(prev=>!prev)} className='bg-purple-700 hover:bg-purple-800 px-4 py-3 rounded-md'>Show Revenue Stats</button>
           <p className='text-sm p-2 text-green-300'>Get complete analytics for admin!</p>
          </div>
        </motion.div>
      </div>
        {revenuseStatsOn&&<RevenueAnalytics transactions={adminData?.wallet?.transactions || []} />}
      
      {/* Wallet Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
        <h3 className="text-lg text-indigo-300 font-semibold mb-4">Admin Wallet</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wallet Balance */}
          <div className="bg-gray-700/50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-gray-300 font-medium">Wallet Balance</h4>
              <div className="p-2 bg-indigo-900/30 rounded-full">
                <Wallet className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-indigo-400">₹{adminData?.wallet.balance.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-2">{adminData?.wallet.transactions?.length} transactions total</p>
          </div>
          
          {/* Total Earnings */}
          <div className="bg-gray-700/50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-gray-300 font-medium">Total Earnings</h4>
              <div className="p-2 bg-green-900/30 rounded-full">
                <ArrowUpIcon className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-400">₹{totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-2">
              {adminWallet.transactions.filter(t => t.type === 'credit').length} credit transactions
            </p>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-gray-700/50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-gray-300 font-medium">Recent Activity</h4>
              <div className="p-2 bg-purple-900/30 rounded-full">
                <CreditCardIcon className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            {recentTransactions.length > 0 ? (
              <div className="text-sm">
                <p className="text-gray-400 mb-2">Last transaction: <span className="text-indigo-300">{formatDate(recentTransactions[0].date)}</span></p>
                <p className="text-gray-400">
                  {recentTransactions.filter(t => t.type === 'credit').length} credits / {recentTransactions.filter(t => t.type === 'debit').length} debits
                </p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No transactions yet</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Verification Status Card */}
      {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
        <h3 className="text-lg text-indigo-300 font-semibold mb-4">Verification Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center bg-gray-700/50 p-4 rounded-lg">
            <div className="p-2 bg-yellow-900/30 rounded-full mr-4">
              <AlertCircleIcon className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Verification</p>
              <p className="text-xl font-bold text-yellow-400">{pendingVerification}</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-700/50 p-4 rounded-lg">
            <div className="p-2 bg-green-900/30 rounded-full mr-4">
              <CheckCircleIcon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Verified Instructors</p>
              <p className="text-xl font-bold text-green-400">{verifiedInstructors}</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-700/50 p-4 rounded-lg">
            <div className="p-2 bg-red-900/30 rounded-full mr-4">
              <ShieldIcon className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Blocked Users</p>
              <p className="text-xl font-bold text-red-400">{blockedStudents + blockedInstructors}</p>
            </div>
          </div>
        </div>
      </div>
       */}
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
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
        
        {/* Instructor Status */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 lg:col-span-4">
          <h3 className="text-lg text-indigo-300 font-semibold mb-4">Instructor Status</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={instructorStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {instructorStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    color: '#f3f4f6',
                    border: '1px solid #374151'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg text-indigo-300 font-semibold">Recent Transactions</h3>
            <Link href='/admin/transactions'>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            View All
          </button>
            </Link>
        </div>
        
        {recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-700 border-b border-gray-600">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Transaction ID</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Description</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Type</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction, index) => (
                  <tr key={transaction.txnId || index} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="py-3 px-4 text-gray-300 text-sm font-medium">{transaction.txnid}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{transaction.description}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full ${
                        transaction.type === "credit" 
                          ? "bg-green-900/30 text-green-400" 
                          : "bg-red-900/30 text-red-400"
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-sm font-medium ${
                      transaction.type === "credit" 
                        ? "text-green-400" 
                        : "text-red-400"
                    }`}>
                      {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{formatDate(transaction.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No transactions found
          </div>
        )}
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
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Expertise</th>
                  {/* <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Students</th> */}
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Wallet Balance</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topInstructors.map(instructor => (
                  <tr key={instructor._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="py-3 px-4 text-gray-100 text-sm font-medium">{instructor.username}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{instructor.expertise || 'N/A'}</td>
                    {/* <td className="py-3 px-4 text-gray-300 text-sm">{instructor.totalStudents}</td> */}
                    <td className="py-3 px-4 text-green-400 text-sm">₹{instructor.walletBalance.toLocaleString()}</td>
                    <td className="py-3 px-4 text-yellow-400 text-sm">
                      {instructor.rating ? `${instructor.rating.toFixed(1)}★` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Students List */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 lg:col-span-5">
          <h3 className="text-lg text-indigo-300 font-semibold mb-4">Recent Students</h3>
          <div className="space-y-4">
            {recentStudents.map(student => (
              <div 
                key={student._id} 
                className="flex items-center justify-between p-3 rounded-lg border border-gray-700 hover:bg-gray-700/50"
              >
                <div>
                  <p className="text-gray-100 font-medium">{student.username}</p>
                  {/* <p className="text-sm text-gray-400">
                    {student.coursesEnrolled || 0} Courses • {student.totalCertificates || 0} Certificates
                  </p> */}
                </div>
                <div className="text-sm text-gray-400">
                  <div>{formatDate(student.createdAt)}</div>
                  {/* <div className="text-blue-400">{student.studiedHours} hrs</div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;