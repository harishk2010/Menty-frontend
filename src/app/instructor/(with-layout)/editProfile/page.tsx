"use client";
import { User } from "@/@types/User";

import { profileSidebar } from "@/app/utils/validationSchemas/constants";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChangePassword from "@/app/components/instructor/pages/ChangePassword"
import EditProfile from "@/app/components/instructor/pages/EditProfile"
import { getInstructorData } from "@/api/instructorApi";

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
  const Instructor = useSelector((state: RootState) => state.instructor);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && Instructor?.email) {
        try {
          const fetchedData = await getInstructorData(Instructor.email);
          setInstructorData(fetchedData || {}); // Set fetched data or empty object
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      } else {
        // setIsLoggedIn(false);
      }
    };

    fetchData();
  },[loggedIn,Instructor]);

  return (
    <>
    <div className="min-h-screen">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-8xl mx-auto">
    {/* Edit Profile Section - 70% */}
    <div className="bg-purple-200 shadow max-w-7xl rounded-lg p-6 text-center flex-1" >
      <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
      {/* <p className="text-gray-600 mt-2">Enrolled Courses</p> */}
      <EditProfile />
    </div>

    {/* Change Password Section - 30% */}
    <div className="bg-purple-200 shadow  rounded-lg p-6 text-center flex-1" >
      <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
      {/* <p className="text-gray-600 mt-2">Certificates Earned</p> */}
      <ChangePassword />
    </div>
  </div>
</div>



      
      
    </>
  );
};

export default ProfileHeader;
