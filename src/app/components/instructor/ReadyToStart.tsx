import React from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';

const ReadyToStart = () => {
  return (
    <motion.div 
        className="max-w-2xl mx-auto mt-16 text-center"
        variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
          }}
      >
        <div className="p-8 bg-gradient-to-r from-purple-800 to-indigo-900 rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to start teaching?</h3>
          <p className="mb-6">Share your knowledge and expertise with students around the world.</p>
          <Link href={'/instructor/courses'}>
          <button className="bg-white text-purple-700 hover:bg-gray-100 transition-colors py-3 px-6 rounded-md font-medium">
            Create a New Course
          </button>
          </Link>
        </div>
        
      </motion.div>
  )
}

export default ReadyToStart