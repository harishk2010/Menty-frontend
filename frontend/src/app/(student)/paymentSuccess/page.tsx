'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { payCourse } from '@/api/courseApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/api/studentAuthentication';
// import { cookies } from 'next/headers';

const PaymentSuccess = () => {
    const user=useSelector((state:RootState)=>state.user)
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();

    const txnid = searchParams.get('txnid');
    const amountPaid = searchParams.get('amountPaid');
    const courseId=searchParams.get('courseId')
    const courseName = searchParams.get('courseName');
    const hasPaid = useRef(false); // Track if payment API was already called


    // Use useCallback to prevent unnecessary re-renders
    const processPayment = useCallback(async () => {
        if (!courseId || hasPaid.current) return; // Prevent duplicate API calls
        
        hasPaid.current = true; // Mark API as called before making the request
        const userId=user.userId
        if(!userId){
            logout()
            router.replace('/login')
            toast.error('Please login to continue')
            return
        }
        try {
         
            const response = await payCourse(
                String(userId),
                String(courseId),
                String(txnid),
                Number(amountPaid),
                String(courseName)
            );
            if (response) {
                toast.success('You have purchased the course');
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [courseId, txnid, amountPaid, courseName]);

    useEffect(() => {
        processPayment(); // Run only once when `courseId` is available
    }, [processPayment]);

    const handleNavigateToCourses = () => {
        router.replace('/myCourses');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full mb-4"></div>
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-xl p-8 transform animate-fadeIn">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-6 transform animate-bounce">
                            <CheckCircle className="h-20 w-20 text-green-500" />
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Payment Successful!
                        </h1>
                        
                        <p className="text-lg text-gray-600 mb-8">
                            Thank you for your purchase. Your enrollment is now complete.
                        </p>

                        <div className="w-full bg-gray-50 rounded-xl p-6 mb-8">
                            <div className="space-y-4">
                                {courseName && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Course</span>
                                        <span className="font-semibold text-gray-900">{courseName}</span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Amount Paid</span>
                                    <span className="font-semibold text-gray-900">₹{amountPaid}</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Transaction ID</span>
                                    <span className="font-semibold text-gray-900 text-sm">{txnid}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleNavigateToCourses}
                            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        >
                            Start Learning Now
                        </button>

                        <div className="mt-6 flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <p className="text-sm">
                                A confirmation email has been sent to your registered email address
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;