'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
const FailureNavigations = () => {
   
        const router = useRouter();
      
        const handleBackToHome = () => {
          router.replace('/courses');
        };
      
        const handleRetry = () => {
          router.replace('/home');
        };
  return (
    <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleBackToHome}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Courses
              </button>
              
              <button 
                onClick={handleRetry}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
  )
}

export default FailureNavigations