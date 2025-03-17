"use client";

import { useSelector } from "react-redux";
import { Bell, HelpCircle } from "lucide-react";
import Link from "next/link";
import { RootState } from "@/redux/store";

const Header = () => {
  const admin = useSelector((state:RootState) => state.admin);

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/admin/dashboard">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
              Menty<span className="text-white font-normal"> | Admin</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                <span className="font-medium text-sm">
                  {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
                </span>
              </div>
            <span className="ml-2 font-medium hidden md:block">
              {admin?.name || "Admin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;