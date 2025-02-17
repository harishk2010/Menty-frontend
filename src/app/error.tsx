"use client";

import { AlertCircle } from "lucide-react";

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error; 
  reset: () => void 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h2>
            
            <p className="text-gray-500 mb-6">
              {error.message || "We encountered an unexpected error. Please try again."}
            </p>

            <button
              onClick={() => reset()}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            If the problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
}