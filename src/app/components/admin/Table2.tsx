"use client";
import { blockInstructor, blockStudent, getAllInstructors, getAllStudents } from "@/api/studentApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UsersTable = () => {
  const [students, setStudents] = useState<any>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAllInstructors();
        // console.log(fetchedData)
        setStudents(fetchedData || []); // Set fetched data or empty object
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);
  const handleBlock=async(email:string)=>{
    try {
      console.log(email)
      const response=await blockInstructor(email)
      if(response.success){
        toast.success(response.message)
        setStudents((prevStudents:any[])=>
          prevStudents.map((student)=>
            student.email===email?{...student,isBlocked:!student.isBlocked}:student
          )
        )
        
      }else{
        toast.error(response.message)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="w-full bg-gray-800 px-6 py-4 rounded-lg">
        <h1 className="text-2xl text-white font-semibold">Instructor Listing</h1>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border-collapse bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-900 text-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((user: any) => (
              <tr
                key={user.email}
                className="text-gray-300 border-t border-gray-300 hover:bg-gray-700"
              >
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  {user.isBlocked ? (
                    <span
                      className={` rounded-full text-sm text-white font-medium px-3 py-1 text-left bg-orange-400 uppercase`}
                    >
                      Blocked
                    </span>
                  ) : (
                    <span
                      className={` rounded-full text-sm text-white font-medium px-3 py-1 bg-blue-400 text-left  uppercase`}
                    >
                      Active
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  {user.isBlocked ? (
                    <button onClick={()=>handleBlock(user.email)} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                      Unblock
                    </button>
                  ) : (
                    <button onClick={()=>handleBlock(user.email)} className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md">
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
