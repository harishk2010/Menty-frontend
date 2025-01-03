"use client"

import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import Loader from '@/app/components/fallbacks/Loader';
import dynamic from 'next/dynamic';
import { ReactElement, useState } from 'react';

// Dynamically import the Player component from Lottie with SSR disabled
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), {
    ssr: false,
    loading: () => <div><Loader/></div>
});
export default function LoginPage():ReactElement {

    let [isLogin,setIsLogin]=useState(true)
    return (
        <>
            <div className="flex justify-evenly max-h-screen items-center my-8 py-3 px-5">



                <div className='sm:block hidden '>
                    <Player
                        autoplay
                        loop
                        style={{ height: "400px", width: "400px" }}
                        src="https://lottie.host/be2302b1-71d9-4ba5-ad8c-68b3e4d9923a/VFsZzRBBvQ.json" />
                </div>

                <div className="flex flex-col justify-center shadow-md items-center w-full max-w-sm  p-4 bg-white border border-gray-200 rounded-lg  sm:p-6 md:p-8">
                    
                    <form className="space-y-6 my-4 flex flex-col justify-center " action="#">

                        
                        <h5 className="text-xl font-medium text-gray-900">{isLogin?"Log In":"Sign Up"} as <span className='text-purple-700 font-semibold'>Student</span></h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" required />
                        </div>
                        {
                            !isLogin &&<div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                            <input type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" required />
                        </div>
                        }
                        
                        <div className="flex items-start gap-2">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 ">Remember me </label>
                            </div>
                            <a href="#" className="ms-auto text-sm font-medium text-purple-700 hover:underline"> Lost Password?</a>
                        </div>
                        {
                            isLogin?<>
                            <PrimaryButton name={"Login to your account"} />
                            <div  onClick={()=>setIsLogin(prev=>!prev)} className="text-sm font-medium text-gray9500 ">
                            Not registered? <a className="text-purple-700 cursor-pointer hover:underline ">Create account</a>
                        </div>
                            </>:<>
                            
                            <PrimaryButton name={"Register Account"} />
                            <div  onClick={()=>setIsLogin(prev=>!prev)} className="text-sm font-medium text-gray9500 ">
                        Have an account? <a className="text-purple-700 cursor-pointer hover:underline ">Log In</a>
                        </div>
                            </>
                        }
                        

                        
                        
                    </form>
                </div>
            </div>


        </>
    )
}