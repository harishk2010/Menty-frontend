"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearAdminDetials } from "@/redux/slices/adminSlice";
import { toast } from "react-toastify";
import { adminLogout } from "@/api/adminAuthentication";
import { 
  LayoutDashboard, 
  Users, 
  BookmarkPlus, 
  UserCircle, 
  BadgeInfo,
  LogOut, 
  ChevronLeft, 
  ChevronRight,
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
      const response = await adminLogout();
      if (response.success) {
        dispatch(clearAdminDetials());
        toast.success(response.message);
        router.replace('/admin/login');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const navItems = [
    { href: "/admin/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { href: "/admin/users", icon: <Users size={20} />, label: "Users" },
    { href: "/admin/instructors", icon: <UserCircle size={20} />, label: "Instructors" },
    { href: "/admin/verifyInstructors", icon: <BadgeInfo size={20} />, label: "Verify Instructors" },
    { href: "/admin/category", icon: <BookmarkPlus size={20} />, label: "Category" },
    { href: "/admin/analytics", icon: <BarChart size={20} />, label: "Analytics" },
    { href: "/admin/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className={`h-full bg-gray-800 text-white flex flex-col justify-between transition-all duration-300 shadow-xl ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      {/* Logo for expanded state */}
      {!isCollapsed && (
        <div className="px-4 py-6 flex items-center justify-center">
          <div className="bg-gray-700 bg-opacity-70 rounded-lg p-2 w-full text-center">
            <span className="font-bold text-xl">Menty</span>
            <div className="text-xs text-gray-300">Admin Portal</div>
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
                        ? "bg-indigo-600 text-white" 
                        : "text-gray-300 hover:bg-gray-700"
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
      <div className="p-4 border-t border-gray-700">
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
        className="py-4 flex justify-center items-center hover:bg-gray-700 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;