"use client"

import { test } from "@/api/userAuthentication"


const Users = () => {

  const handleClick=async()=>{
    try {
      await test()
    } catch (error) {
      
    }
  }
  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleClick} className="py-2 px-4 bg-black">test</button>
    </div>
    
  )
}

export default Users