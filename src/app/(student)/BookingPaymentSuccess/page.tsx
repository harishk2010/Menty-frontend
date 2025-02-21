'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import { bookSlot, getSlot } from '@/api/bookingApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getStudentData } from '@/api/studentApi';
// import { confirmSlotBooking } from '@/api/bookingApi';
interface Slot{
    instructorId: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  price: number;
}
const BookingPaymentSuccess = () => {
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasPaid = useRef(false);
    const [slot,setSlot]=useState<Slot>()
    const [created,setCreated]=useState<Boolean>(false)

    const txnid = searchParams.get('txnid');
    const amountPaid = searchParams.get('amountPaid');
    const slotId = searchParams.get('slotId');
    const mentorName = searchParams.get('mentorName');
    const bankRefNum = searchParams.get('bankRefNum');
    const userData=useSelector((state:RootState)=>state.user)

    useEffect(()=>{
        const fetchData=async()=>{
            const response=await getSlot(slotId as string)
            setSlot(response.data)
        }
        fetchData()
    },[slotId])

    const processBooking = useCallback(async () => {
        if (!slotId || hasPaid.current) return;
        
        hasPaid.current = true;
        
        try {
            const user=await getStudentData(userData?.email)
            const studentId=user._id
            const slotData=await getSlot(slotId)
            const instructorId=slotData?.data.instructorId
            if(!created){
                
                const response = await bookSlot({
                    studentId,
                    instructorId,
                    slotId,
                    txnid,
                    amountPaid}
                );
                // const response =await useMemo(() => {
                //     return bookSlot({ studentId, instructorId, slotId, txnid, amountPaid });
                // }, []);
                
                if (response.success) {
                    toast.success(response.message);
                }
                setCreated(true)
            }
        } catch (error: any) {
            toast.error(error.message.includes('Invalid hook call')?"error":error.message);
        } finally {
            setIsLoading(false);
        }
    }, [slot, slotId,amountPaid,txnid]);

    useEffect(() => {
        processBooking();
    }, [processBooking]);

    const handleNavigateToBookings = () => {
        router.replace('/bookings');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-20 h-20 bg-purple-100 rounded-full mb-4"></div>
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-xl p-8 transform animate-fadeIn">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-6 transform animate-bounce">
                            <CheckCircle className="h-20 w-20 text-purple-500" />
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Booking Confirmed!
                        </h1>
                        
                        <p className="text-lg text-gray-600 mb-8">
                            Your mentoring session has been successfully booked.
                        </p>

                        <div className="w-full bg-gray-50 rounded-xl p-6 mb-8">
                            <div className="space-y-4">
                                {mentorName && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Mentor</span>
                                        <span className="font-semibold text-gray-900">{mentorName}</span>
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

                                {bankRefNum && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Bank Reference</span>
                                        <span className="font-semibold text-gray-900 text-sm">{bankRefNum}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleNavigateToBookings}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        >
                            View My Bookings
                        </button>

                        <div className="mt-6 flex items-center gap-2 text-purple-600">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                            <p className="text-sm">
                                A confirmation email has been sent with the session details
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPaymentSuccess;