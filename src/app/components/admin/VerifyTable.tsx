"use client";
import { approveRequest, getAllRequests } from "@/api/verificationApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VerifyTable = () => {
  const [requests, setRequests] = useState<any>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAllRequests();
        console.log(fetchedData,"dataa")
        setRequests(fetchedData || []); // Set fetched data or empty object
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);
  const handleVerify=async(email:string)=>{
    try {
      console.log(email)
      const status="approved"
      const response=await approveRequest(email,status)
      if(response.success){
        toast.success(response.message)
        setRequests((prevInstructor:any[])=>
          prevInstructor.map((instructor)=>
            instructor.email===email?{...instructor,status:"approved"}:instructor
          )
        )
        
      }else{
        toast.error(response.message)
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  const handleReject=async(email:string)=>{
    try {
      console.log(email)
      const status="rejected"
      const response=await approveRequest(email,status)
      if(response.success){
        toast.success(response.message)
        setRequests((prevInstructor:any[])=>
          prevInstructor.map((instructor)=>
            instructor.email===email?{...instructor,status:"rejected"}:instructor
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
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                View 
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((user: any) => (
              <tr
                key={user.email}
                className="text-gray-300 border-t border-gray-300 hover:bg-gray-700"
              >
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  {user.status==="approved" ? (
                    <span
                      className={` rounded-full text-sm text-white font-medium px-3 py-1 text-left bg-green-400 uppercase`}
                    >
                      Verified
                    </span>
                  ) :user.status==="pending" ? (
                    <span
                      className={` rounded-full text-sm text-white font-medium px-3 py-1 bg-orange-400 text-left  uppercase`}
                    >
                      Pending
                    </span>
                  ):(
                    <span
                      className={` rounded-full text-sm text-white font-medium px-3 py-1 bg-red-400 text-left  uppercase`}
                    >
                      Rejected
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                    <Link href={`/admin/verifyInstructors/${user.email}`}>
                    <button className="bg-blue-500 text-sm px-4 py-2 rounded-md">View</button>
                    </Link>

                </td>
                <td className="px-6 py-3 text-center flex gap-2">
                  {user.status==="appraoved"  ? (
                    <button onClick={()=>{}} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                      Verified
                    </button>
                  ) :user.status==="rejectaed"  ? (
                    <button onClick={()=>{}} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                      Rejected
                    </button>
                  ) : (
                    <>
                    <button onClick={()=>handleVerify(user.email)} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                      Approve
                    </button>
                    <button onClick={()=>handleReject(user.email)} className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md">
                      Reject
                    </button>
                    </>
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

export default VerifyTable;
