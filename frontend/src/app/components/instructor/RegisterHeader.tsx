"use client"
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const RegisterHeader=()=> {
  return (
    
    <motion.div
        initial={{ opacity: 0, x: -1000 }} // Starts slightly below the viewport
        animate={{ opacity: 1, x: 0 }} // Moves to its final position
        transition={{
          duration: 1, // Duration of the animation
          ease: "easeOut", // Smooth easing
        }}
        className="w-full h-[100px] bg-purple-200 sticky top-0 rounded-br-full"
      ></motion.div>
  )
}
export default RegisterHeader;
