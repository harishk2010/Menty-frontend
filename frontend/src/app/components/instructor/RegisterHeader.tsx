"use client"
import { motion } from "framer-motion";
import React from "react";

// RegisterHeader Component
export const RegisterHeader = () => {
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
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-10 h-10 text-white mr-3"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <h1 className="text-white text-2xl font-bold tracking-wider">
            Instructor Portal
          </h1>
        </div>
      </div>
    </motion.header>
  );
};