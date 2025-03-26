"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import otp from '@/lottie/otp.json'
import Lottie from "lottie-react"
import Loader from "@/app/components/fallbacks/Loader";
import dynamic from "next/dynamic";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import RegisterHeader from "@/app/components/instructor/RegisterHeader";
import { useEffect, useState } from "react";
import { button, h6, span } from "framer-motion/client";
import { resendOtp, verifyOtp } from "@/api/userAuthentication";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const [counter, setCounter] = useState<number>(60);
  const [resendAtive,setResendActive]=useState(false)
  const [submitActive,setSubmitActive]=useState(false)

  const router=useRouter()
  console.log(otp,"otp")
  useEffect(()=>{
    
     
    if(counter>0){
      const timer=setInterval(()=>{
        setCounter(prev=>prev-1)
      },1000)
      return()=>    clearInterval(timer)
    }else{
      setResendActive(true)
    }
   
    }

  ,[counter,otp])
  const handleResend=async()=>{
    setResendActive(false)
    setCounter(60)

    let email= localStorage.getItem("email")|| ""
    let username= localStorage.getItem("username")|| ""
    const respone=await resendOtp(email,username)

    if(respone.success){
      toast.success(respone.message)
    }else{
      toast.error(respone.message)
    }
    
    
  }
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
  const handleSubmit=async ()=>{
    let OTP=otp.join("")
    if(OTP.length==4){
      console.log("submit Clicked")
    }else{
     toast.error("enter full OTP")
      return 
    }
    
    let response=await verifyOtp(OTP)
    if(response.success){
      toast.success(response.message)
      localStorage.removeItem('verificationToken')
      
        router.push('/instructor/login')
        
     

    }else{
      toast.error(response.message)
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
      className="sm:block hidden lg:mr-32"
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
          
          className="flex border-black border-2 bg-violet-100 w-[300px] h-[320px] lg:w-[400px] lg:h-[420px] flex-col lg:mt-28  space-y-1 justify-center backdrop-blur-3xl shadow-[10px_10px_0px_0px_rgb(88,22,135,0.5)] items-center rounded-lg bg-transparent "
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
              className="no-spinner bg-gray-100 rounded-md w-10 h-10 border-black border-2 outline-1 hover:shadow-[3px_3px_0px_0px_rgb(88,22,135,0.5)] text-black text-center"
            />
              ))
            }
            
          </div>
      
          <div className="p-3">
          
            <span onClick={handleSubmit}><PrimaryButton name={"Submit OTP"}  /></span>
            
            
          </div>
          <div className="">
            {
              resendAtive?<button typeof="button" onClick={handleResend} className="text-red-600">Resend OTP</button>:<span className="text-red-500">Try again in {counter}</span>
            }
            
          </div>
        </motion.div>

      
    </div>
  );
}
