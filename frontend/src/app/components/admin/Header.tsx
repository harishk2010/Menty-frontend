"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";

const Header = () => {
  const admin = useSelector((state: RootState) => state.admin);

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-2 shadow-md z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <Link href="/admin/dashboard" className="flex items-center">
            <img 
              src="../MentyLogo.png" 
              className="w-12 h-12 mr-3" 
              alt="Menty Logo" 
            />
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 leading-tight">
                Menty<span className="text-white font-normal text-base"> | Admin</span>
              </h1>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            
              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center border-2 border-gray-300">
                <span className="font-medium text-xs">
                  {admin?.name ? admin.name.charAt(0).toUpperCase() : "A"}
                </span>
              </div>
            
            <span className="ml-2 font-medium hidden md:block text-sm">
              {admin.name || "Admin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;