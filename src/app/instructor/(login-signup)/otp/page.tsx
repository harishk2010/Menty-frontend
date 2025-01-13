"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import otp from '@/lottie/otp.json'
import Lottie from "lottie-react"
import Loader from "@/app/components/fallbacks/Loader";
import dynamic from "next/dynamic";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import RegisterHeader from "@/app/components/instructor/RegisterHeader";
import { useState } from "react";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div>
        <Loader />
      </div>
    ),
  }
);
export default function OtpPage() {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  console.log(otp,"otp")

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>,index:number)=>{

    const value=e.target.value

    const newOTP= [...otp]
    newOTP[index]=value
    setOtp(newOTP)

    if(value && index<otp.length-1){
      const nextSibling=document.getElementById(`otpInput-${index+1}`)
      nextSibling?.focus()
    }else if (!value && index > 0) {
      const prevSibling = document.getElementById(`otpInput-${index - 1}`);
      prevSibling?.focus();
    }

    

  }
  const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>,index:number)=>{
    if(e.key==="Backspace" && !otp[index] && index>0){
      document.getElementById(`otpInput-${index-1}`)?.focus()
    }
  }
  
  
  return (
    <div className="bg-white  w-full flex  justify-between items-center mt-16">
      
     
{/*       
      <div className="flex justify-center items-center ">
      
        
      </div> */}
      <motion.div
          initial={{ opacity: 0, x: -50 }} // Starts slightly below the viewport
          animate={{ opacity: 1, x: 0 }} // Moves to its final position
          transition={{
            duration: 1, // Duration of the animation
            ease: "easeOut", // Smooth easing
          }}>
      <Player
      className="sm:block hidden"
          autoplay
          loop
          style={{ height: "400px", width: "400px" }}
          src="https://lottie.host/cade60f0-bcd4-409a-b821-b36eeb4e8679/uMH9otOft0.json"
        />

      </motion.div>
    
        
      
        
        <motion.div
          initial={{ opacity: 0, x: 50 }} // Starts slightly below the viewport
          animate={{ opacity: 1, x: 0 }} // Moves to its final position
          transition={{
            duration: 1, // Duration of the animation
            ease: "easeOut", // Smooth easing
          }}
          
          className="flex bg-violet-100 w-[300px] h-[300px] flex-col space-y-3 justify-center backdrop-blur-3xl shadow-[10px_10px_0px_0px_rgb(88,22,135,0.5)] items-center rounded-lg bg-transparent "
        >
          <div className="flex justify-evenly items-center space-4">
            <h1 className="text-black py-3 font-bold text-xl">
              Enter <span className="text-purple-600">OTP</span>
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <h6 className="text-black py-3 text-center text-sm font-light italic">
              "The <span className="text-purple-600">OTP</span> has been sent to
              your <br /> respective email"
            </h6>
          </div>
          <div className="flex space-x-2 p-3">
            {/* <input
              maxLength={1}
              type="number"
              className="no-spinner appearance-none outline-none hover:shadow-[3px_3px_0px_0px_rgb(88,22,135,0.5)] bg-gray-100 rounded-md w-10 h-10 text-black text-center"
            />
            <input
              type="number"
              className="no-spinner bg-gray-100 rounded-md w-10 h-10 outline-none hover:shadow-[3px_3px_0px_0px_rgb(88,22,135,0.5)] text-black text-center"
            />
            <input
              type="number"
              className="no-spinner bg-gray-100 rounded-md w-10 h-10 outline-none hover:shadow-[3px_3px_0px_0px_rgb(88,22,135,0.5)] text-black text-center"
            /> */}
            {
              otp.map((value,index)=>(
                <input
              type="text"
              key={index}
              maxLength={1}
              value={value}
              id={`otpInput-${index}`}
              onKeyDown={(e)=>handleKeyDown(e,index)}
              onChange={(e)=>handleChange(e,index)}
              className="no-spinner bg-gray-100 rounded-md w-10 h-10 outline-none hover:shadow-[3px_3px_0px_0px_rgb(88,22,135,0.5)] text-black text-center"
            />
              ))
            }
            
          </div>
          <div className="p-3">
            <PrimaryButton name={"Submit OTP"} />
          </div>
        </motion.div>

      
    </div>
  );
}
