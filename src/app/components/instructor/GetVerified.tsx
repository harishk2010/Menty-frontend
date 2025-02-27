"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const GetVerified = () => {
     const router=useRouter()


    const redirectToVerification=()=>{
        router.replace('/instructor/verification')
        
      }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-yellow-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verification Required</h1>
        <p className="text-gray-600 mb-6">
          You need to complete the instructor verification process to access this feature.
        </p>
        <button onClick={redirectToVerification} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Complete Verification
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Verification helps maintain quality standards and ensures instructors meet our platform requirements.
      </p>
    </div>
  </div>
  )
}

export default GetVerified