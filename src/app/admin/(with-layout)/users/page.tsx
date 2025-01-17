import { FaUserCircle } from "react-icons/fa"; // User icon
import { AiOutlineMail, AiOutlineSearch } from "react-icons/ai"; // Email & search icons
import MainButton from "@/app/components/buttons/MainButton";
import Table from "@/app/components/admin/Table"
const Users = () => {
  return (
    // <div className="flex flex-col gap-6 p-6">
    //   {/* Page Header */}
    //   <div className="w-full bg-gray-800 px-6 py-4 rounded-md flex justify-between items-center">
    //     <h1 className="text-2xl font-bold text-white">Student Management</h1>
    //     <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-md">
    //       <AiOutlineSearch className="text-white" size={20} />
    //       <input
    //         type="text"
    //         placeholder="Search students..."
    //         className="bg-transparent outline-none text-white"
    //       />
    //     </div>
    //   </div>

    //   {/* User List */}
    //   <div className="flex flex-col gap-4 bg-gray-800 px-6 py-4 rounded-md">
    //     {/* Table Header */}
    //     <div className="flex justify-between items-center bg-gray-700 px-5 py-3 rounded-md">
    //       <h1 className="text-lg font-semibold text-gray-200">Name</h1>
    //       <h1 className="text-lg font-semibold text-gray-200">Email</h1>
    //       <h1 className="text-lg font-semibold text-gray-200">Actions</h1>
    //     </div>

    //     {/* Table Rows */}
    //     {["John Doe", "Jane Smith", "Emily Johnson"].map((name, index) => (
    //       <div
    //         key={index}
    //         className="flex justify-between items-center bg-gray-700 px-5 py-3 rounded-md hover:bg-gray-600 transition-all"
    //       >
    //         {/* User Info */}
    //         <span className="flex items-center gap-3">
    //           <FaUserCircle className="text-gray-400" size={28} />
    //           <h1 className="text-lg text-gray-200">{name}</h1>
    //         </span>
    //         {/* Email */}
    //         <span className="flex items-center gap-2">
    //           <AiOutlineMail className="text-gray-400" size={20} />
    //           <h1 className="text-lg text-gray-200">
    //             {`${name.toLowerCase().replace(" ", ".")}@example.com`}
    //           </h1>
    //         </span>
    //         {/* Action Button */}
    //         <MainButton name="Block" />
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <Table/>
    
  );
};

export default Users;
