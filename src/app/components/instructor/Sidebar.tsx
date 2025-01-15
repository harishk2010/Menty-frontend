"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { logout } from "@/api/userAuthentication";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout=async ()=>{
    const response=await logout()
    if(response.success){
      toast.success(response.message)
    }else{
      toast.error(response.message)
    }
  

  }

  return (
    <div
      className={`h-full bg-purple-800 text-white flex flex-col justify-between  transition-all duration-500 ${
        isCollapsed ? "w-14" : "w-44"
      }`}
    >
      
      <nav className="mt-4">
  <ul className="space-y-2">
    <li className="px-4 flex py-2 hover:bg-white rounded-l-full">
      <Link href="/instructor/dashboard" className="flex w-full">
        <div className="block float-left">
          <DashboardIcon className="mr-3 hover:bg-purple-500 text-gray-100  border-gray-300 rounded-full" />
        </div>
        <div
          className={`flex-1 text-base ${
            isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
          } ease-out transition-all duration-700`}
        >
          Home
        </div>
      </Link>
    </li>
    <li className="px-4 flex py-2 hover:bg-white rounded-l-full">
      <Link href="/instructor/users" className="flex w-full">
        <div className="block float-left">
          <PeopleIcon className="mr-3 hover:bg-white hover:text-purple-500 text-gray-100  border-gray-300 rounded-full" />
        </div>
        <div
          className={`flex-1 text-base ${
            isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
          } ease-out transition-all duration-700`}
        >
          Users
        </div>
      </Link>
    </li>
    <li className="px-4 flex py-2 hover:bg-white rounded-l-full">
      <Link href="/instructor/instructors" className="flex w-full">
        <div className="block float-left">
          <SupervisedUserCircleIcon className="mr-3 hover:bg-purple-500 text-gray-100  border-gray-300 rounded-full" />
        </div>
        <div
          className={`flex-1 text-base ${
            isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
          } ease-out transition-all duration-700`}
        >
          Instructors
        </div>
      </Link>
    </li>
    <li className="px-4 flex py-2 hover:bg-white rounded-l-full">
      <Link href="/instructor/about" className="flex w-full">
        <div className="block float-left">
          <InfoIcon className="mr-3 hover:bg-purple-500 text-gray-100  border-gray-300 rounded-full" />
        </div>
        <div
          className={`flex-1 text-base ${
            isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
          } ease-out transition-all duration-700`}
        >
          About
        </div>
      </Link>
    </li>
    <li onClick={handleLogout} className="px-4 flex py-2 hover:bg-white rounded-l-full">
      <Link href="/instructor/login" className="flex w-full">
        <div className="block float-left">
          <ExitToAppIcon className="mr-3 hover:bg-purple-500 text-gray-100 size-9  border-gray-300 rounded-full" />
        </div>
        <div
          className={`flex-1 text-base ${
            isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
          } ease-out transition-all duration-700`}
        >
          Logout
        </div>
      </Link>
    </li>
  </ul>
</nav>
<button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="  w-full p-2 text-sm ease-in-out"
      >
        {isCollapsed ?<KeyboardArrowRightIcon/> :  <KeyboardArrowLeftIcon/> }
      </button>

    </div>
  );
};

export default Sidebar;
