"use client"
import { useState } from "react"

export default function instructorForm1(){
    const [item,setIem]=useState()

    let stored=localStorage.getItem("signupData")
    return(
        <div className="text-black">
            {
                stored
            }
            
        </div>
    )
}   