"use client"
import { useState } from "react";

export default function PrimaryButton() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            <div className="flex flex-col space-y-3">
                <button className="text-white h-10 w-32  bg-purple-700 py-2 px-3 rounded-full hover:bg-purple-900 shadow-md   shadow-purple-500 hover:translate-x-1 transition-all ease-in-out duration-300">Primary</button>
                <button className="text-purple-700 h-10 w-32 bg-purple-300 py-2 px-3 rounded-full hover:bg-purple-700 hover:text-white shadow-md   shadow-purple-500 hover:shadow-purple-700 hover:translate-x-1 transition-all ease-in-out duration-300 ">
                    Secondary</button>
                <button className="h-10
             w-32
             py-2 px-5
             border  border-purple-300
             rounded-full
             text-purple-700
             shadow-md
             shadow-purple-500
             hover:translate-x-1 transition-all ease-in-out duration-300
             ">Plain</button>
            </div>
            <div className="flex  space-x-3 mt-8">
                <button className="text-white hover:text-purple-700 
                h-10 w-32 
                 bg-purple-700 hover:bg-purple-300
                  py-2 px-3 rounded-full
                 
                 shadow-[5px_5px_0px_0px_rgba(216,180,254)] 
                 hover:shadow-[5px_5px_0px_0px_rgba(88,22,135)] 
                    hover:translate-x-1 transition-all ease-in-out duration-300">Primary</button>
                <button className="text-purple-700 h-10 w-32 bg-purple-300 py-2 px-3 rounded-full hover:bg-purple-700 hover:text-white 
                shadow-md  
                 shadow-purple-500
                  hover:shadow-[5px_5px_0px_0px_rgba(168,85,247)] hover:translate-x-1 transition-all ease-in-out duration-300 ">
                    Secondary</button>
                <button className="h-10
             w-32
             py-2 px-5
             border  border-purple-300
             rounded-full
             text-purple-700
             
             shadow-[5px_5px_0px_0px_rgba(109,40,217)]
             hover:translate-x-1 transition-all ease-in-out duration-300
             ">Plain</button>

                <button className="
             bg-violet-600
              text-white text-sm md:text-md
               hover:bg-violet-500 font-bold 
               py-2 md:py-3 pl-6 pr-3 rounded-xl mr-4 mb-4
                shadow-[5px_5px_0px_0px_rgba(109,40,217)] z-10"> elipse</button>
            </div>
            <div className="flex space-x-3 mt-8">
                <button className="
                flex items-center justify-center
                border
                py-2 px-3
                rounded-lg
                border-purple-700
                hover:bg-purple-100
                text-purple-700
               
                ">Secondaray</button>
                 <button className="
                flex items-center justify-center
                border
                py-2 px-3
                rounded-lg
                border-purple-700
                bg-purple-700
                hover:bg-transparent
                hover:text-purple-700
                text-white
                transition-all
                ease-in-out
                duration-400
                ">Primary</button>

            </div>

            {/* <div className="flex flex-col space-y-3 mt-8">
                <button className="text-white h-12 w-40 bg-purple-700 py-3 px-5 rounded-full hover:bg-purple-900 shadow-md shadow-purple-500 hover:translate-x-1 transition-all ease-in-out duration-300">
                    Primary
                </button>
                <button className="text-purple-700 h-12 w-40 bg-purple-300 py-3 px-5 rounded-full hover:bg-purple-700 hover:text-white shadow-md shadow-purple-500 hover:shadow-purple-700 hover:translate-x-1 transition-all ease-in-out duration-300">
                    Secondary
                </button>
                <button className="h-12 w-40 py-3 px-5 border border-purple-300 rounded-full text-purple-700 shadow-md shadow-purple-500 hover:translate-x-1 transition-all ease-in-out duration-300">
                    Plain
                </button>
            </div> */}
            {/* <div className="flex flex-col space-y-3 mt-8">
                <button className="flex items-center justify-center text-white text-center h-8 w-28 bg-purple-700 py-2 px-3 rounded-full hover:bg-purple-900 shadow-md shadow-purple-500 hover:translate-x-1 transition-all ease-in-out duration-300">
                    Primary
                </button>
                <button className="flex items-center justify-center text-purple-700 h-8 w-28 bg-purple-300 py-2 px-3 rounded-full hover:bg-purple-700 hover:text-white shadow-md shadow-purple-500 hover:shadow-purple-700 hover:translate-x-1 transition-all ease-in-out duration-300">
                    Secondary
                </button>
                <button className="h-8 w-28 py-2 px-4 flex  items-center justify-center border border-purple-300 rounded-full text-purple-700 shadow-md shadow-purple-500 hover:translate-x-1 transition-all ease-in-out duration-300">
                    Plain
                </button>
            </div> */}


            <div className="flex space-x-4 mt-8">

                <button className="flex items-center justify-center text-blue-00 h-10 w-10 bg-blue-100 hover:bg-blue-200 rounded-full shadow-md hover:-translate-x-1 transition-all ease-in-out duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-3 -blue-500" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
                </button>


                <button className="flex items-center justify-center font-bold text-green-600 h-10 w-10 bg-green-100 hover:bg-green-200 rounded-full shadow-md  hover:-translate-y-1  transition-all ease-in-out duration-300">
                    +
                </button>


                <button className="flex items-center justify-center text-red-600 h-10 w-10 bg-red-100 hover:bg-red-200 rounded-full shadow-md hover:translate-x-1 transition-all ease-in-out duration-300">
                    x
                </button>
                <button
            className={`flex items-center justify-center font-bold text-green-600 h-10 ${isHovered?"w-24":"w-10"} bg-green-100 hover:bg-green-200 rounded-full shadow-md hover:-translate-y-1 transition-all ease-in-out duration-300`}
            onMouseEnter={() => setIsHovered(true)} // Set hover to true on mouse enter
            onMouseLeave={() => setIsHovered(false)} // Set hover to false on mouse leave
        >
            {isHovered ? '+ Add' : '+'} {/* Change text based on hover state */}
        </button>
            </div>
        </>
    )
}