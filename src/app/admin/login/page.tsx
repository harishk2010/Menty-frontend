"use client"

import PrimaryColorButton from '@/app/components/buttons/PrimaryColorButton';
import Loader from '@/app/components/fallbacks/Loader';
import dynamic from 'next/dynamic';
import { ReactElement, useState } from 'react';


export default function LoginPage(): ReactElement {


    return (

        <div className="flex justify-center h-screen items-center bg-gray-800  px-5">
            <div className="flex flex-col justify-center shadow-md shadow-blue-300  items-center w-full max-w-sm  p-4 bg-white border border-gray-200 rounded-lg  sm:p-6 md:p-8">

                <form className="space-y-6 my-4 flex flex-col justify-center " action="#">


                    <h5 className="text-xl font-medium text-gray-900">Log In as <span className='text-gray-700 font-semibold'>Admin</span></h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" required />
                    </div>



                    <PrimaryColorButton name={"Login to your account"} colorOne={"gray-700"}  />
                 






                </form>
            </div>
        </div>



    )
}