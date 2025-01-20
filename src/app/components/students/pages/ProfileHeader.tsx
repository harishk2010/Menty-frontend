"use client"
import { profileSidebar } from "@/app/utils/validationSchemas/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileHeader = () => {
  const pathname = usePathname();
  return (
   <>
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
            <p className="text-gray-600">Frontend Developer | Learner</p>
            <p className="text-gray-500 mt-2">johndoe@gmail.com</p>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-500">
            Edit Profile
          </button>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900">
            Change Password
          </button>
        </div>
      </div>

      {/* Navbar Section */}
      <nav className="bg-white shadow-lg p-4 mt-2 max-w-7xl mx-auto">
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
                      activeTab ? "text-purple-600 font-bold" : ""
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
