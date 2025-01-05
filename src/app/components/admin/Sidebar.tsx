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

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`h-full bg-gray-800 text-white flex flex-col justify-between  transition-all duration-500 ${
        isCollapsed ? "w-14" : "w-64"
      }`}
    >
      
      <nav className="mt-4">
  <ul className="space-y-2">
    <li className="px-4 flex py-2 hover:bg-gray-700 rounded-l-full">
      <Link href="/admin/dashboard" className="flex w-full">
        <div className="block float-left">
          <DashboardIcon className="mr-3 bg-gray-300 hover:bg-blue-400 text-gray-800 border-2 border-gray-300 rounded-full" />
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
    <li className="px-4 flex py-2 hover:bg-gray-700 rounded-l-full">
      <Link href="/admin/users" className="flex w-full">
        <div className="block float-left">
          <PeopleIcon className="mr-3 bg-gray-300 hover:bg-blue-400 text-gray-800 border-2 border-gray-300 rounded-full" />
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
    <li className="px-4 flex py-2 hover:bg-gray-700 rounded-l-full">
      <Link href="/admin/instructors" className="flex w-full">
        <div className="block float-left">
          <SupervisedUserCircleIcon className="mr-3 bg-gray-300 hover:bg-blue-400 text-gray-800 border-2 border-gray-300 rounded-full" />
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
    <li className="px-4 flex py-2 hover:bg-gray-700 rounded-l-full">
      <Link href="/admin/about" className="flex w-full">
        <div className="block float-left">
          <InfoIcon className="mr-3 bg-gray-300 hover:bg-blue-400 text-gray-800 border-2 border-gray-300 rounded-full" />
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
    <li className="px-4 flex py-2 hover:bg-gray-700 rounded-l-full">
      <Link href="/admin/login" className="flex w-full">
        <div className="block float-left">
          <ExitToAppIcon className="mr-3 bg-gray-300 hover:bg-blue-400 text-gray-800 border-2 border-gray-300 rounded-full" />
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
        {isCollapsed ? <KeyboardArrowLeftIcon/> : <KeyboardArrowRightIcon/>}
      </button>

    </div>
  );
};

export default Sidebar;
