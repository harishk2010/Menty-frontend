"use client"
import Link from "next/link";
import PlainButton from "../buttons/PlainButton";
import MainButton from "../buttons/MainButton";
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import { ReactElement, useState } from "react";

export default function Navbar(): ReactElement {

    const [isOpen,setIsOpen]=useState(false)
    return <div className={` ${isOpen?"w-12":"w-40"}    bg-black text-white  p-6    h-full `}>

        <div className="flex  gap-28">

            <ul className=" flex flex-col  cursor-pointer  gap-4 text-purple-700">
                
                
                {!isOpen?<>
                    <Link href={"/home"}><li><HomeIcon/>home</li></Link>
                <li><BookIcon/>Courses</li>
                <li>Mentors</li>
                <button onClick={()=>setIsOpen(!isOpen)}>
                    +
                </button>
                </>:<>
                <li><HomeIcon/></li>
                <li><BookIcon/></li>
                <button onClick={()=>setIsOpen(!isOpen)}>
                    +
                </button>
                </>}
                
                
            </ul>
        </div>
        <div className='sm:hidden flex flex-col mt-8 justify-center items-center gap-3'>

            <Link href={"/login"}><PlainButton name={"Login"} /></Link>
            <Link href={"/register"}><MainButton name={"Register"} /></Link>

        </div>

    </div>
}