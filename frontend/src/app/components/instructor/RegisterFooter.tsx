
"use client"
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
 const RegisterFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="w-full mt-10 h-[80px] bg-gradient-to-r from-purple-500 to-purple-700 fixed bottom-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-center">
        <p className="text-white text-sm tracking-wider">
          © {new Date().getFullYear()} Instructor Portal. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
};
export default RegisterFooter;