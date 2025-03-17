"use client";

import { profileSidebar } from "@/app/utils/validationSchemas/constants";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, Settings, Shield } from "lucide-react";

// Import your components
import EditProfile from "@/app/components/instructor/pages/EditProfile";
import ChangePassword from "@/app/components/instructor/pages/ChangePassword";
import { getInstructorData } from "@/api/instructorApi";

const ProfileHeader = () => {
  const pathname = usePathname();
  const [instructorData, setInstructorData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const instructor = useSelector((state: RootState) => state.instructor);
  
  useEffect(() => {
    const fetchInstructorData = async () => {
      if (instructor?.email) {
        try {
          const data = await getInstructorData(instructor.email);
          setInstructorData(data);
        } catch (error) {
          console.error("Error fetching instructor data:", error);
        }
      }
    };
    
    fetchInstructorData();
  }, [instructor]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div 
        className="max-w-7xl mx-auto mb-12 text-center"
        variants={itemVariants}
      >
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Instructor Profile
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500">
          Manage your personal information and account security
        </p>
      </motion.div>
      
      {/* Profile Picture and Basic Info */}
      {instructorData && (
        <motion.div 
          className="max-w-7xl mx-auto mb-8 flex flex-col items-center"
          variants={itemVariants}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-purple-100 shadow-lg">
            <img 
              src={instructorData.profilePicUrl || "/api/placeholder/300/300"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{instructorData.username || "Instructor"}</h2>
          <p className="text-purple-600">{instructorData.expertise || "Education Expert"}</p>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div 
        className="max-w-7xl mx-auto mb-8 flex justify-center space-x-4"
        variants={itemVariants}
      >
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "profile" 
              ? "bg-purple-600 text-white shadow-md" 
              : "bg-white text-gray-700 hover:bg-purple-50"
          }`}
        >
          <User className="w-5 h-5 mr-2" />
          Edit Profile
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "password" 
              ? "bg-purple-600 text-white shadow-md" 
              : "bg-white text-gray-700 hover:bg-purple-50"
          }`}
        >
          <Shield className="w-5 h-5 mr-2" />
          Change Password
        </button>
      </motion.div>

      {/* Content Section */}
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={itemVariants}
      >
        {activeTab === "profile" ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EditProfile />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChangePassword />
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      
    </motion.div>
  );
};

export default ProfileHeader;