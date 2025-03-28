"use client";

import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Loader from "@/app/components/fallbacks/Loader";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import { resendOtp, verifyOtp } from "@/api/userAuthentication";

export default function OtpPage() {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const [counter, setCounter] = useState<number>(60);
  const [resendActive, setResendActive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setResendActive(true);
    }
  }, [counter]);

  const handleResend = async () => {
    setResendActive(false);
    setCounter(60);

    let email = localStorage.getItem("email") || "";
    let username = localStorage.getItem("username") || "";
    const response = await resendOtp(email, username);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    if (value && index < otp.length - 1) {
      const nextSibling = document.getElementById(`otpInput-${index + 1}`);
      nextSibling?.focus();
    } else if (!value && index > 0) {
      const prevSibling = document.getElementById(`otpInput-${index - 1}`);
      prevSibling?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otpInput-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async () => {
    let OTP = otp.join("");
    if (OTP.length !== 4) {
      toast.error("Enter full OTP");
      return;
    }

    let response = await verifyOtp(OTP);
    if (response.success) {
      toast.success(response.message);
      localStorage.removeItem('verificationToken');
      router.push('/instructor/login');
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-center items-center min-h-[calc(100vh-160px)] space-y-8 lg:space-y-0 lg:space-x-16">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="hidden lg:block"
      >
        <Player
          autoplay
          loop
          style={{ height: "400px", width: "400px" }}
          src="https://lottie.host/cade60f0-bcd4-409a-b821-b36eeb4e8679/uMH9otOft0.json"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="flex flex-col items-center justify-center bg-violet-100 w-full max-w-md p-8 rounded-lg shadow-lg backdrop-blur-3xl"
      >
        <h1 className="text-black py-3 font-bold text-2xl text-center">
          Enter <span className="text-purple-600">OTP</span>
        </h1>
        
        <h6 className="text-black py-3 text-center text-sm font-light italic">
          "The <span className="text-purple-600">OTP</span> has been sent to
          your respective email"
        </h6>
        
        <div className="flex space-x-2 p-3">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              id={`otpInput-${index}`}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onChange={(e) => handleChange(e, index)}
              className="no-spinner bg-gray-100 rounded-md w-12 h-12 border-black border-2 outline-1 hover:shadow-[3px_3px_0px_0px_rgb(88,22,135,0.5)] text-black text-center text-xl"
            />
          ))}
        </div>

        <div className="p-3 w-full flex items-center justify-center">
          <div onClick={handleSubmit} className="">
            <PrimaryButton name="Submit OTP" />
          </div>
        </div>

        <div className="mt-2">
          {resendActive ? (
            <button 
              onClick={handleResend} 
              className="text-red-600 hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-red-500">Try again in {counter} seconds</span>
          )}
        </div>
      </motion.div>
    </div>
  );
}