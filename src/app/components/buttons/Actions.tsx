"use client"

import { useState } from "react";

export default function Actions(){
     const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex space-x-4 mt-8">

                <button className="flex items-center justify-center text-blue-00 h-10 w-10 bg-blue-100 hover:bg-blue-200 rounded-full shadow-md hover:-translate-x-1 transition-all ease-in-out duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-3 -blue-500" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
                </button>


                <button className="flex items-center justify-center font-bold text-green-600 h-10 w-10 bg-green-100 hover:bg-green-200 rounded-full shadow-md  hover:-translate-y-1  transition-all ease-in-out duration-300">
                    +
                </button>


                <button className="flex items-center justify-center text-red-600 text-sm h-10 w-10 bg-red-100 hover:bg-red-200 rounded-lg shadow-md hover:translate-x-1 transition-all ease-in-out duration-300">
                    Block
                </button>
                {/* <button
            className={`flex items-center justify-center font-bold text-green-600 h-10 ${isHovered?"w-24":"w-10"} bg-green-100 hover:bg-green-200 rounded-full shadow-md hover:-translate-y-1 transition-all ease-in-out duration-300`}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
        >
            {isHovered ? '+ Add' : '+'} 
        </button> */}
            </div>
  )
}
