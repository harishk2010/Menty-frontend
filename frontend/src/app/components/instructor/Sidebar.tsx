

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUserDetials } from "@/redux/slices/instructorSlice";
import { toast } from "react-toastify";
import { logout } from "@/api/userAuthentication";
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  Info, 
  BookOpen, 
  Calendar, 
  MessageCircleCode, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Settings,
  BarChart
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  // Handle window resize to auto-expand on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(true);
      }
    };

    // Initialize based on current screen size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        toast.success(response.message);
        dispatch(clearUserDetials());
        router.replace('/instructor/login');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const navItems = [
    { href: "/instructor/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { href: "/instructor/courses", icon: <BookOpen size={20} />, label: "Courses" },
    { href: "/instructor/slots", icon: <Calendar size={20} />, label: "Slots" },
    { href: "/instructor/bookings", icon: <MessageCircleCode size={20} />, label: "Bookings" },
    { href: "/instructor/profile", icon: <UserCircle size={20} />, label: "Profile" },
    // { href: "/instructor/analytics", icon: <BarChart size={20} />, label: "Analytics" },
    // { href: "/instructor/about", icon: <Info size={20} />, label: "About" },
    // { href: "/instructor/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className={`h-full bg-gradient-to-b from-purple-900 to-indigo-900 text-white flex flex-col justify-between transition-all duration-300 shadow-xl ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      {/* Logo for expanded state */}
      {!isCollapsed && (
        <div className="px-4 py-6 flex items-center justify-center">
          <div className="bg-white bg-opacity-10 rounded-lg p-2 w-full text-center">
            <span className="font-bold text-xl">Menty</span>
            <div className="text-xs text-purple-200">Instructor Portal</div>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} className="block">
                    <div className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "bg-purple-600 text-white" 
                        : "text-purple-100 hover:bg-purple-700/50"
                    }`}>
                      <div className="flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className={`ml-3 ${
                        isCollapsed 
                          ? "opacity-0 w-0 absolute" 
                          : "opacity-100 w-auto relative"
                      } transition-all duration-200`}>
                        {item.label}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-purple-700/50">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-3 py-3 rounded-lg text-white hover:bg-red-500 transition-all duration-200`}
        >
          <LogOut size={20} />
          <span className={`ml-3 ${
            isCollapsed 
              ? "opacity-0 w-0 absolute" 
              : "opacity-100 w-auto relative"
          } transition-all duration-200`}>
            Logout
          </span>
        </button>
      </div>
      
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="py-4 flex justify-center items-center hover:bg-purple-800 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;