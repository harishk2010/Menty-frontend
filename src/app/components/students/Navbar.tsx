"use client"
import { ReactElement, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import MainButton from '../buttons/MainButton';
import PlainButton from '../buttons/PlainButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from "next/link";
export default function Navbar():ReactElement{
    const [toggleMenu,setToggleMenu]=useState(false)
    const handleToggleMenu=()=>{
        setToggleMenu(prev=>!prev)

    }

    return(
        <>
        <nav className="
        bg-transparent backdrop-blur-xl black
        shadow-md
        w-full 
        flex sm:justify-evenly justify-self-stretch items-center
        py-3 px-5
        sticky
        top-0
        z-10
        ">
            <div className=' flex justify-start'>
                <button onClick={handleToggleMenu}>
                {toggleMenu?<ChevronLeftIcon className='text-purple-400'/>:
                <MenuIcon  className='text-purple-400'/>
                }
                
                </button>

            </div>
            <div className="flex ">
                <h1 className='text-purple-700 font-bold text-2xl'>Menty</h1>
            </div>
            <div>

           <ul className="hidden cursor-pointer sm:flex gap-11 text-purple-700">
           <Link href={"/home"}><li>Home</li></Link>
            <li>Courses</li>
            <li>Mentors</li>
           </ul>
            </div>
            <div className='hidden sm:flex gap-3'>
            <Link href={"/login"}><PlainButton name={"Login"}/></Link>
            <Link href={"/Register"}><MainButton name={"register"}/></Link>
                
            </div>
            
            

        </nav>
        {toggleMenu?<div className="
        bg-transparent backdrop-blur-3xl
        shadow
        bg-gray-100
        p-6
        w-1/2
        sm:w-1/4
       
        fixed
        origin-top-right
        
        h-screen   
        z-20
        ">
            
            <div className="flex justify-center  gap-28">

           <ul className=" flex flex-col justify-center cursor-pointer items-center gap-4 text-purple-700">
            
            <Link href={"/home"}><li>Home</li></Link>
            <li>Courses</li>
            <li>Mentors</li>
           </ul>
            </div>
            <div className='sm:hidden flex flex-col mt-8 justify-center items-center gap-3'>
                
                <Link href={"/login"}><PlainButton name={"Login"}/></Link>
                <Link href={"/register"}><MainButton name={"Register"}/></Link>
                
            </div>
                
            </div>:""}
        
             </>
    )
}