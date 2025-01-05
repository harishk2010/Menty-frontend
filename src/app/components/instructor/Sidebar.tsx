"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`h-screen bg-gray-800 text-white  transition-all duration-500 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-blue-500 hover:bg-blue-700 w-full p-2 text-sm"
      >
        {isCollapsed ? "Expand" : "Collapse"}
      </button>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li className="">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-700 rounded">
            <DashboardIcon className="mr-3 bg-gray-300 hover:bg-blue-500 text-gray-800 border-2 border-gray-300 rounded-md"/>
            <span className={`${isCollapsed&& "hidden transition-all duration-1000"}`}>
              Home
            </span>
            </Link>
          </li>
          <li className="">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-700 rounded">
            <InfoIcon className="mr-3 bg-gray-300 hover:bg-blue-400 text-gray-800 border-2 border-gray-300 rounded-md"/>
            <span className={`${isCollapsed&& "hidden transition-all duration-1000"}`}>
              About
            </span>
            </Link>
          </li>
          
          <li>
            <Link href="/contact" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
