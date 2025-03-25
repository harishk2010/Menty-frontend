"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";

const Header = () => {
  const instructor = useSelector((state: RootState) => state.instructor);

  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white py-2 shadow-md z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <Link href="/instructor/dashboard" className="flex items-center">
            <img 
              src="../MentyLogo.png" 
              className="w-12 h-12 mr-3" 
              alt="Menty Logo" 
            />
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 leading-tight">
                Menty<span className="text-white font-normal text-base"> | Instructor</span>
              </h1>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {instructor.profilePicUrl ? (
              <div className="relative h-8 w-8">
                <img
                  src={instructor.profilePicUrl}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover border-2 border-purple-300"
                />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center border-2 border-purple-300">
                <span className="font-medium text-xs">
                  {instructor?.name ? instructor?.name.charAt(0).toUpperCase() : "M"}
                </span>
              </div>
            )}
            <span className="ml-2 font-medium hidden md:block text-sm">
              {instructor.name || "Instructor"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;