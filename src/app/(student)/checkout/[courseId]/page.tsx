"use client"
import React, { useEffect, useState } from 'react';
import { Wallet, QrCode, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getCourse } from '@/api/courseApi';
interface ICourse  {
  courseName: string,
  instructor: string,
  price: string,
  description :string,
  thumbnailUrl: string,
};
const CourseCheckout: React.FC = () => {

  const {courseId}=useParams<{courseId:string}>()

  const[course,setCourse]=useState<ICourse>()
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'wallet'>('upi');
  

  useEffect(()=>{
    try {
      const fetchCourse=async()=>{
        const response=await getCourse(courseId)
        setCourse(response || {})

      }
      fetchCourse()
    } catch (error) {
      
    }
  },[])

  const discountedPrice = Number(course?.price) -100;

  return (
    <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        </div>

        <div className="p-6 flex space-x-4">
          <img 
            src={course?.thumbnailUrl} 
            alt={course?.courseName} 
            className="w-32 h-20 object-cover rounded-md"
          />
          <div>
            <h3 className="font-bold text-lg">{course?.courseName}</h3>
            <p className="text-gray-600">Instructor: {course?.description}</p>
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <div className="flex justify-between mb-2">
            <span>Original Price</span>
            <span className="line-through text-gray-500">${course?.price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span className="text-green-600">{discountedPrice}% OFF</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-3">
            <span>Total</span>
            <span>${discountedPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Choose Payment Method</h4>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setPaymentMethod('upi')}
              className={`flex items-center justify-center p-4 rounded-lg border-2 ${
                paymentMethod === 'upi' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <QrCode className="mr-2"/>
              UPI Payment
            </button>
            <button 
              onClick={() => setPaymentMethod('wallet')}
              className={`flex items-center justify-center p-4 rounded-lg border-2 ${
                paymentMethod === 'wallet' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Wallet className="mr-2"/>
              Wallet
            </button>
          </div>
        </div>

        <div className="p-6 pt-0">
          <button 
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center"
          >
            <CheckCircle className="mr-2"/>
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCheckout;