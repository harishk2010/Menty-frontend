import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PrimaryButton from '../buttons/PrimaryButton';

interface CoursePricingProps {
  price: number;
  courseId: string;
  isPurchased: boolean;
}

const CoursePricing: React.FC<CoursePricingProps> = ({
  price,
  courseId,
  isPurchased
}) => {
  const router = useRouter();
  
  const handleNavigate = () => router.push(`/coursePlay/${courseId}`);

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{price.toLocaleString()}
              </span>
              {isPurchased && (
                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Purchased
                </span>
              )}
            </div>

            {isPurchased ? (
              <button 
                onClick={handleNavigate} 
                className="
                  flex items-center gap-2 
                  px-4 py-2 
                  bg-purple-600 text-white 
                  rounded-lg 
                  hover:bg-purple-700 
                  transition-colors 
                  duration-300 
                  shadow-md 
                  hover:shadow-lg
                "
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Go to Course
              </button>
            ) : (
              <Link href={`/checkout/${courseId}`} className="block">
                <PrimaryButton name="Enroll Now" />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoursePricing;