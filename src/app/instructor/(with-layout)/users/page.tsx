"use client"

import { getInstructorData } from "@/api/instructorApi"
import { test } from "@/api/userAuthentication"
import { authErrorHandler } from "@/utils/exceptionHandler"
import { ApiError } from "next/dist/server/api-utils"
// import { error } from "console"
import { useState } from "react"


const Users = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleClick=async()=>{

    try {
      let tester=await test()
      let a=await getInstructorData("harish200126@gmail.com")
      console.log(a,"aaaaaaaaaaaaaaaaaaa")
    } catch (error) {
      
        setError(error as Error); // 🔹 Store UI error to trigger error.tsx
      
      
    }
  }

  if(error){
    throw error
  }
  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleClick} className="py-2 px-4 bg-black">test</button>
    </div>
    
  )
}

export default Users