"use client";
import { User } from "@/@types/User";
import { getInstructorData } from "@/api/instructorApi";
import { profileSidebar } from "@/app/utils/validationSchemas/constants";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IsVerified from "@/app/components/common/badges/IsVerified";
import GetVerified from "@/app/components/common/badges/GetVerified";

const ProfileHeader = () => {
  const pathname = usePathname();
  const [instructorData, setInstructorData] = useState<any>({
    userId: null,
    username: null,
    email: null,
    role: null,
    profilePicUrl:null
  }); // Initially set to null


  const loggedIn = useSelector((state: RootState) => state.instructor.email);
  const Student = useSelector((state: RootState) => state.instructor);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && Student?.email) {
        try {
          const fetchedData = await getInstructorData(Student.email);
          setInstructorData(fetchedData || {}); // Set fetched data or empty object
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      } else {
        // setIsLoggedIn(false);
      }
    };

    fetchData();
  },[]);

  return (
    <>
    <div className="min-h-screen">

    
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-purple-200 shadow rounded-lg p-6 max-w-8xl mx-auto">
        <div className="flex  items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <img
              src={instructorData.profilePicUrl||'https://via.placeholder.com/150/ccc/aaa?text=User'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{instructorData.username}</h1>
            
            {
              instructorData.isVerified?<IsVerified/>: <GetVerified/>
            }
            
           
            <p className="text-gray-600">{instructorData.mobile} | {instructorData.role}</p>
            <p className="text-gray-500 mt-2">{instructorData.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap  gap-4 mt-6">
          <div>
            <Link href={"/instructor/editProfile"}>
            
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-500">
              Edit Profile
            </button>
            </Link>
          </div>
          <div>
            {
              instructorData.isVerified?(
                <Link href={"/instructor/editProfile"}>
            
            <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900">
              Change Password
            </button>
            </Link>
              ):(
                <Link href={"/instructor/verification"}>
            
            
            <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900">
              Get Verified
            </button>
            </Link>
              )
            }
            
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-8xl mx-auto">
        <div className="bg-purple-200 shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">12</h2>
          <p className="text-gray-600 mt-2">Enrolled Courses</p>
        </div>
        <div className="bg-purple-200 shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">7</h2>
          <p className="text-gray-600 mt-2">Certificates Earned</p>
        </div>
        <div className="bg-purple-200 shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">98%</h2>
          <p className="text-gray-600 mt-2">Completion Rate</p>
        </div>
      </div>
     <div className="min-h-screen bg-gray-100 p-6">
   

       {/* Stats Section  */}
     {/* Enrolled Courses */}
        <div className="bg-white shadow rounded-lg p-6 mt-6 max-w-7xl mx-auto">
         <h2 className="text-xl font-bold text-gray-800">Enrolled Courses</h2>
        <div className="flex flex-col gap-4 mt-4">
 
           <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/100"
               alt="Course"
                 className="w-full h-full object-cover"
               />
             </div>
             <div>
               <h3 className="text-lg font-semibold text-gray-800">
                 React for Beginners
               </h3>
               <p className="text-gray-600">Instructor: Jane Smith</p>
               <p className="text-gray-500 text-sm">Progress: 85%</p>
             </div>
             <button className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
               View
             </button>
           </div>
          
         </div>
       </div> 

     </div>
      </div>


      
      
    </>
  );
};

export default ProfileHeader;
