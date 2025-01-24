"use client";
import { User } from "@/@types/User";
import { getStudentData } from "@/api/studentApi";
import { profileSidebar } from "@/app/utils/validationSchemas/constants";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileHeader = () => {
  const pathname = usePathname();
  const [studentData, setStudentData] = useState<any>({
    userId: null,
    username: null,
    email: null,
    role: null,
    profilePicUrl:null
  }); // Initially set to null


  const loggedIn = useSelector((state: RootState) => state.user.email);
  const Student = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && Student?.email) {
        try {
          const fetchedData = await getStudentData(Student.email);
          setStudentData(fetchedData || {}); // Set fetched data or empty object
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      } else {
        // setIsLoggedIn(false);
      }
    };

    fetchData();
  });

  return (
    <>
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow rounded-t-lg p-6 max-w-7xl mx-auto">
        <div className="flex  items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <img
              src={studentData.profilePicUrl||'https://via.placeholder.com/150/ccc/aaa?text=User'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{studentData.username}</h1>
            <p className="text-gray-600">{studentData.mobile} | {studentData.role}</p>
            <p className="text-gray-500 mt-2">{studentData.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap  gap-4 mt-6">
          <div>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-500">
              Edit Profile
            </button>
          </div>
          <div>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Navbar Section */}
      <nav className="bg-gray-900 rounded-b-lg shadow-lg p-4  max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* <div className="text-lg font-bold text-gray-800">Dashboard</div> */}
          <ul className="flex justify-evenly space-x-6 w-full">
            {profileSidebar.map((link) => {
              const activeTab = pathname.startsWith(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-gray-800 hover:text-purple-600 ${
                      activeTab ? "text-purple-600 font-bold" : "text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default ProfileHeader;
