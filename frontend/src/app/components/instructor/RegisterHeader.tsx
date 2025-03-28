"use client"
import { motion } from "framer-motion";
import React from "react";

// RegisterHeader Component
 const RegisterHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="w-full mb-5 h-[80px] bg-gradient-to-r from-purple-500 to-purple-700 sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
        <img 
              src="../MentyLogo.png" 
              className="w-12 h-12 mr-3" 
              alt="Menty Logo" 
            />
            
          <h1 className="text-white text-2xl font-bold tracking-wider">
            Welcome Mentor
          </h1>
        </div>
      </div>
    </motion.header>
  );
};

export default RegisterHeader;