"use client";
import { profileSidebar } from "@/app/utils/validationSchemas/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ProfilePage = () => {

  const pathname=usePathname()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">12</h2>
          <p className="text-gray-600 mt-2">Enrolled Courses</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">7</h2>
          <p className="text-gray-600 mt-2">Certificates Earned</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">98%</h2>
          <p className="text-gray-600 mt-2">Completion Rate</p>
        </div>
      </div>
    // <div className="min-h-screen bg-gray-100 p-6">
   

    //   {/* Stats Section  */}
    //   {/* 

    //   {/* Enrolled Courses */}
    //   {/* <div className="bg-white shadow rounded-lg p-6 mt-6 max-w-7xl mx-auto">
    //     <h2 className="text-xl font-bold text-gray-800">Enrolled Courses</h2>
    //     <div className="flex flex-col gap-4 mt-4">
 
    //       <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-4">
    //         <div className="w-20 h-20 rounded-lg overflow-hidden">
    //           <img
    //             src="https://via.placeholder.com/100"
    //             alt="Course"
    //             className="w-full h-full object-cover"
    //           />
    //         </div>
    //         <div>
    //           <h3 className="text-lg font-semibold text-gray-800">
    //             React for Beginners
    //           </h3>
    //           <p className="text-gray-600">Instructor: Jane Smith</p>
    //           <p className="text-gray-500 text-sm">Progress: 85%</p>
    //         </div>
    //         <button className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
    //           View
    //         </button>
    //       </div>
          
    //     </div>
    //   </div> */}

    // </div>
  );
};

export default ProfilePage;
