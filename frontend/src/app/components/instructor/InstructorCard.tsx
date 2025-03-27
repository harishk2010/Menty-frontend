// import React from 'react';
// import Link from 'next/link';
// import { UserCheck, Calendar, IndianRupee } from 'lucide-react';

// interface Instructor {
//   _id: string;
//   username: string;
//   profilePicUrl: string;
//   isVerified: boolean;
//   expertise: string;
//   planPrice: number;
// }

// const InstructorCard: React.FC<{ instructor?: Instructor }> = ({ instructor }) => {
//     if (!instructor) {
//         return (
//           <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden text-center p-6">
//             <p className="text-gray-500">No instructor information available</p>
//           </div>
//         );
//       }
    
  
//     return (
//     <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
//       <div className="p-6">
//         <div className="flex flex-col items-center">
//           <img
//             src={instructor.profilePicUrl}
//             alt={instructor.username}
//             className="h-24 w-24 rounded-full object-cover border-2 border-purple-200"
//           />
//           <div className="mt-4 text-center">
//             <h3 className="font-semibold text-lg text-gray-900">
//               {instructor.username}
//             </h3>
//             {instructor.isVerified && (
//               <span className="flex items-center justify-center mt-1 text-green-600 text-sm">
//                 <UserCheck className="h-4 w-4 mr-1" />
//                 Verified
//               </span>
//             )}
//             <p className="mt-2 text-purple-600 font-medium">
//               {instructor.expertise}
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 pt-4 border-t border-gray-100">
//           <p className="flex items-center text-sm text-gray-600 justify-center mb-2">
//             <Calendar className="h-4 w-4 mr-2" />
//             Available for 1:1 Sessions
//           </p>
//           <p className="text-center font-medium text-gray-800">
//             <IndianRupee className="h-4 w-4 inline mr-1" />
//             {instructor.planPrice} per session
//           </p>
//         </div>

//         <div className="mt-6">
//           <Link href={`/mentorProfile/${instructor._id}`}>
//             <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
//               View Profile
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorCard;
import React from 'react';
import Link from 'next/link';
import { UserCheck, Calendar, IndianRupee } from 'lucide-react';
import { motion } from "framer-motion";


interface Instructor {
  _id: string;
  username: string;
  profilePicUrl: string;
  isVerified: boolean;
  expertise: string;
  planPrice: number;
}

interface InstructorCardProps {
  instructor?: Instructor;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  
      if (!instructor) {
        return (
          <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden text-center p-6">
            <p className="text-gray-500">No instructor information available</p>
          </div>
        );
      }
    

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeOut", 
      }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex flex-col items-center">
        <div className='mb-4'>
            <h1 className='text-black font-semibold text-xl '>Instructor Details</h1>
        </div>
        <img
          src={instructor.profilePicUrl}
          alt={instructor.username}
          className="h-24 w-24 rounded-full object-cover border-2 border-purple-200 mb-4"
        />
        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-900">
            {instructor.username}
          </h3>
          {instructor.isVerified && (
            <span className="flex items-center justify-center mt-1 text-green-600 text-sm">
              <UserCheck className="h-4 w-4 mr-1" />
              Verified
            </span>
          )}
          <p className="mt-2 text-purple-600 font-medium">
            {instructor.expertise}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="flex items-center text-sm text-gray-600 justify-center mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          Available for 1:1 Sessions
        </p>
        <p className="text-center font-medium text-gray-800">
          <IndianRupee className="h-4 w-4 inline mr-1" />
          {instructor.planPrice} per session
        </p>
      </div>

      <div className="mt-6">
        <Link href={`/mentorProfile/${instructor._id}`}>
          <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
            View Profile
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default InstructorCard;