// "use client";
// import { User } from "@/@types/User";
// import { getInstructorData } from "@/api/instructorApi";
// import { profileSidebar } from "@/app/utils/validationSchemas/constants";
// import { RootState } from "@/redux/store";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import IsVerified from "@/app/components/common/badges/IsVerified";
// import GetVerified from "@/app/components/common/badges/GetVerified";
// import { getRequestData } from "@/api/verificationApi";
// import IsPending from "@/app/components/common/badges/IsPending";

// const ProfileHeader = () => {
//   const pathname = usePathname();
//   const [requestData, setRequestData] = useState<any>(null);
//   const [instructorData, setInstructorData] = useState<any>({
//     userId: null,
//     username: null,
//     email: null,
//     role: null,
//     profilePicUrl: null,
//   }); // Initially set to null

//   const loggedIn = useSelector((state: RootState) => state.instructor.email);
//   const Student = useSelector((state: RootState) => state.instructor);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (loggedIn && Student?.email) {
//         try {
//           const fetchedData = await getInstructorData(Student.email);
//           setInstructorData(fetchedData || {}); // Set fetched data or empty object
//           const fetchedRequestData=await getRequestData(Student.email) 
          
//           setRequestData(fetchedRequestData );
//         } catch (error) {
//           console.error("Error fetching student data:", error);
//         }
//       } else {
//         // setIsLoggedIn(false);
//       }
//     };

//     fetchData();
//   }, []);
//   console.log(requestData,"reqqq")

//   return (
//     <>
//       <div className="min-h-screen">
//         {/* Profile Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center bg-purple-200 shadow rounded-lg p-6 max-w-8xl mx-auto">
//           <div className="flex  items-center gap-6">
//             <div className="w-28 h-28 rounded-full overflow-hidden">
//               <img
//                 src={
//                   instructorData.profilePicUrl ||
//                   "https://via.placeholder.com/150/ccc/aaa?text=User"
//                 }
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {instructorData.username}
//               </h1>

//               {instructorData.isVerified ? <IsVerified /> :instructorData.verificationStatus==="pending"?<IsPending/>: <GetVerified />}

//               <p className="text-gray-600">
//                 {instructorData.mobile} | {instructorData.role}
//               </p>
//               <p className="text-gray-500 mt-2">{instructorData.email}</p>
//             </div>
//           </div>
//           <div className="flex flex-wrap  gap-4 mt-6">
//             <div>
//               <Link href={"/instructor/editProfile"}>
//                 <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-500">
//                   Edit Profile
//                 </button>
//               </Link>
//             </div>
//             <div>
//               {instructorData.isVerified ? (
//                 <Link href={"/instructor/editProfile"}>
//                   <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900">
//                     Change Password
//                   </button>
//                 </Link>
//               ) : instructorData.verificationStatus === "rejected" ? (
//                 <Link href={"/instructor/verification"}>
//                   <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900">
//                     ReVerify
//                   </button>
//                 </Link>
//               ): !requestData && instructorData.verificationStatus === "pending" &&(
//                 <Link href={"/instructor/verification"}>
//                   <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900">
//                     Get Verified
//                   </button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-8xl mx-auto">
//           <div className="bg-purple-200 shadow rounded-lg p-6 text-center">
//             <h2 className="text-2xl font-bold text-gray-800">12</h2>
//             <p className="text-gray-600 mt-2">Enrolled Courses</p>
//           </div>
//           <div className="bg-purple-200 shadow rounded-lg p-6 text-center">
//             <h2 className="text-2xl font-bold text-gray-800">7</h2>
//             <p className="text-gray-600 mt-2">Certificates Earned</p>
//           </div>
//           <div className="bg-purple-200 shadow rounded-lg p-6 text-center">
//             <h2 className="text-2xl font-bold text-gray-800">98%</h2>
//             <p className="text-gray-600 mt-2">Completion Rate</p>
//           </div>
//         </div> */}
//         {/* <div className="min-h-screen bg-gray-100 p-6">
    
//           <div className="bg-white shadow rounded-lg p-6 mt-6 max-w-7xl mx-auto">
//             <h2 className="text-xl font-bold text-gray-800">
//               Enrolled Courses
//             </h2>
//             <div className="flex flex-col gap-4 mt-4">
//               <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-4">
//                 <div className="w-20 h-20 rounded-lg overflow-hidden">
//                   <img
//                     src="https://via.placeholder.com/100"
//                     alt="Course"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     React for Beginners
//                   </h3>
//                   <p className="text-gray-600">Instructor: Jane Smith</p>
//                   <p className="text-gray-500 text-sm">Progress: 85%</p>
//                 </div>
//                 <button className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//                   View
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </>
//   );
// };

// export default ProfileHeader;
"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RootState } from '@/redux/store';
import { getInstructorData } from '@/api/instructorApi';
import { getRequestData } from '@/api/verificationApi';
import { Wallet } from 'lucide-react';

interface Transaction {
  amount: number;
  type: 'credit' | 'debit';
  txnId: string;
  description: string;
  date: Date;
}

interface InstructorData {
  userId: string | null;
  username: string | null;
  email: string | null;
  mobile: string | null;
  expertise: string | null;
  skills: string | null;
  role: string | null;
  profilePicUrl: string | null;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  isVerified: boolean;
  isBlocked: boolean;
  wallet: {
    balance: number;
    transactions: Transaction[];
  };
}

const ProfileHeader = () => {
  const pathname = usePathname();
  const [requestData, setRequestData] = useState<any>(null);
  const [instructorData, setInstructorData] = useState<InstructorData>({
    userId: null,
    username: null,
    email: null,
    mobile: null,
    expertise: null,
    skills: null,
    role: null,
    profilePicUrl: null,
    verificationStatus: 'pending',
    isVerified: false,
    isBlocked: false,
    wallet: {
      balance: 0,
      transactions: []
    }
  });

  const loggedIn = useSelector((state: RootState) => state.instructor.email);
  const instructor = useSelector((state: RootState) => state.instructor);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && instructor?.email) {
        try {
          const fetchedData = await getInstructorData(instructor.email);
          setInstructorData(fetchedData || {});
          const fetchedRequestData = await getRequestData(instructor.email);
          setRequestData(fetchedRequestData);
        } catch (error) {
          console.error('Error fetching instructor data:', error);
        }
      }
    };

    fetchData();
  }, [loggedIn, instructor?.email]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Section */}
            <div className="flex-1">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-100">
                  <img
                    src={instructorData.profilePicUrl || '/placeholder-avatar.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {instructorData.username}
                    </h1>
                    <span className={`px-2 py-1 text-sm rounded ${
                      instructorData.isVerified 
                        ? 'bg-green-100 text-green-800'
                        : instructorData.verificationStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {instructorData.isVerified 
                        ? 'Verified'
                        : instructorData.verificationStatus === 'pending'
                        ? 'Pending'
                        : 'Not Verified'}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">Role:</span> {instructorData.role}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {instructorData.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Mobile:</span> {instructorData.mobile}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Expertise:</span> {instructorData.expertise}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Skills:</span> {instructorData.skills}
                    </p>
                  </div>
                </div>
              </div>

              {/* Wallet Section */}
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Wallet Balance</h2>
                </div>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  ${instructorData.wallet.balance.toFixed(2)}
                </p>
                <Link href={"/instructor/transactions"}>
                <p className="text-sm text-gray-600">
                  Recent Transactions: {instructorData.wallet.transactions.length}
                </p>
                </Link>
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col gap-4 min-w-[200px]">
              <Link href="/instructor/editProfile">
                <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Edit Profile
                </button>
              </Link>

              <Link href="/instructor/changePassword">
                <button className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
                  Change Password
                </button>
              </Link>

              {!instructorData.isVerified && (
                <Link href="/instructor/verification">
                  <button 
                    className={`w-full px-6 py-3 rounded-lg text-white transition-colors ${
                      instructorData.verificationStatus === 'pending' && requestData
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    disabled={instructorData.verificationStatus === 'pending' && requestData}
                  >
                    {instructorData.verificationStatus === 'rejected' 
                      ? 'Reverify Account'
                      : 'Get Verified'}
                  </button>
                </Link>
              )}

              {instructorData.isBlocked && (
                <div className="mt-2 p-3 bg-red-50 rounded-lg">
                  <p className="text-red-600 text-sm text-center">
                    Your account is currently blocked. Please contact support.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;