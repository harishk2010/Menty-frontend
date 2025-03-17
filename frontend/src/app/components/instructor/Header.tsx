// "use client"
// import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux"

// const Header = () => {
//   const Instructor=useSelector((state:RootState)=>state.instructor)
//   console.log(Instructor)
//   return (
  
//     <header className="bg-purple-800 flex justify-between w-full text-white p-3 mr-5 text-center z-50">
//       <div className=" p-1">
//       <h1 className="text-xl font-bold">Menty- Instructor</h1>
//       </div>
//       <div className=" p-1 flex flex-1 gap-5 justify-end">
//         {/* <NotificationsNoneIcon/> */}

//         <div className="w-7 h-7 rounded-full bg-white"></div>
  
//       </div>
      
//     </header>
//   );
// };

// export default Header;
"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Bell, Search, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const instructor = useSelector((state: RootState) => state.instructor);

  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white p-4 shadow-md z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/instructor/dashboard">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Menty<span className="text-white font-normal"> | Instructor</span>
            </h1>
          </Link>
        </div>

        {/* <div className="hidden md:flex items-center bg-purple-700 bg-opacity-50 rounded-full px-4 py-2 flex-1 max-w-xl mx-6">
          <Search className="h-5 w-5 text-purple-200 mr-2" />
          <input
            type="text"
            placeholder="Search courses, students, bookings..."
            className="bg-transparent border-none outline-none text-white placeholder-purple-200 w-full"
          />
        </div> */}

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            {instructor.profilePicUrl ? (
              <div className="relative h-9 w-9">
                <img
                  src={instructor.profilePicUrl}
                  alt="Profile"
                  className="rounded-full w-24  object-fill border-2 border-purple-300"
                 
                />
              </div>
            ) : (
              <div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center border-2 border-purple-300">
                <span className="font-medium text-sm">
                  {instructor?.name ? instructor?.name.charAt(0).toUpperCase() : "M"}
                </span>
              </div>
            )}
            <span className="ml-2 font-medium hidden md:block">
              {instructor.name || "Instructor"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;