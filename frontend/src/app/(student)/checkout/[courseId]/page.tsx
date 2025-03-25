'use client';

import React, { useEffect, useState } from 'react';
import { Wallet, QrCode, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getAllBoughtCourses, getCourse, isBoughtCourse } from '@/api/courseApi';
import CryptoJS from 'crypto-js';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { FRONTEND_URL } from '@/app/utils/validationSchemas/constants';

interface ICourse {
  courseName: string;
  instructor: string;
  price: string;
  description: string;
  thumbnailUrl: string;
}
interface Course {
  _id: string;
  courseDetails: {
    _id: string;
    courseName: string;
    level: string;
    thumbnailUrl: string;
    quizId: string;
  };
  userId: string;
  instructorId: string;
  transactionId: string;

  isCourseCompleted: boolean;
  purchasedAt: string;
  createdAt: string;
  updatedAt: string;
}


const CourseCheckout: React.FC = () => {
  // const { courseId } = useParams<{ courseId: string }>();
  const params=useParams()
  const courseId=params.courseId as string
  const [course, setCourse] = useState<ICourse>();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'wallet' | 'PayU'>('upi');
  const [txnid, setTxnid] = useState<string>('');
  const [hash, setHash] = useState<string>('');

  const userDetails = useSelector((state: RootState) => state.user)
  const { userId, name, email } = userDetails
  console.log(name,email)

  const phone = '8248093223';

  useEffect(() => {
    if (!courseId) {
      console.error('Course ID is invalid');
      return;
    }
    const fetchCourse = async () => {
      try {
        const response = await getCourse(courseId);
        if (!response) {
          throw new Error('Course not found');
        }
        setCourse(response);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
    setTxnid('txn' + new Date().getTime());
  }, [courseId]);

  useEffect(() => {
    if (!txnid || !course) return;
    const key = process.env.NEXT_PUBLIC_PAYU_KEY || 't4VOu4';
    const salt = process.env.NEXT_PUBLIC_PAYU_SALT || "h1r2JIjnHkpgtJrfBkfqKOS02hi3B0UB";
    const productinfo = courseId || "";
    const firstname = name || '';
    const userEmail = email || '';
    const udf1 = '';
    const udf2 = '';
    const udf3 = '';
    const udf4 = '';
    const udf5 = '';
    const hashString = `${key}|${txnid}|${course.price}|${productinfo}|${firstname}|${userEmail}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
   console.log(`${key}|${txnid}|${course.price}|${productinfo}|${firstname}|${userEmail}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`)
   
    setHash(CryptoJS.SHA512(hashString).toString());
  }, [txnid, course]);
  console.log("hash,hash",hash)


  const handlePayment =async () => {
    if (!txnid || !course?.price || !courseId) {
      toast.error('Invalid payment details. Please refresh and try again.');
      return;
    }
    if (!userId) {
      toast.error('Invalid user details. Please login and try again.');
      
      return;
    }
    console.log(userId,"userId")
    const response=await isBoughtCourse(userId,courseId)
    if(response.success){
      toast.error(response.message);
      return;
    }
    
    
    

    const surl = `${FRONTEND_URL}/nextapi/payment-success`;
    const furl = `${FRONTEND_URL}/nextapi/payment-failure`;
    if (paymentMethod === 'PayU') {
      const formData = {
        key: process.env.NEXT_PUBLIC_PAYU_KEY || 't4VOu4',
        txnid: txnid,
        productinfo: courseId,
        amount: course?.price,
        email: email,
        firstname: name,
        lastname: course?.courseName,
        phone: phone,
        // surl: fullUrl,
        // surl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/paymentFailure`,
        // furl: 'http://localhost:3000/payment/paymentFailure',
        surl,
        furl,
        hash: hash,
      };
      console.log(formData,"formdata")

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://test.payu.in/_payment';

      Object.keys(formData).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData[key as keyof typeof formData] || '';
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } else {
      toast.success('Payment successful via Wallet/UPI!');
    }
  };

  const discountedPrice = Number(course?.price) - 100;

  return (
    <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center p-4">

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        </div>
        <div className="p-6 flex space-x-4">
          <img src={course?.thumbnailUrl||'https://via.placeholder.com/150'} alt={course?.courseName || "courseName" } className="w-32 h-20 object-cover rounded-md" />
          <div>
            <h3 className="font-bold text-lg">{course?.courseName}</h3>
            <p className="text-gray-600">Instructor: {course?.description}</p>
          </div>
        </div>
        <div className="p-6 bg-gray-50">
          {/* <div className="flex justify-between mb-2">
            <span>Original Price</span>
            <span className="line-through text-gray-500">₹{course?.price}</span>
          </div> */}
          {/* <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span className="text-green-600">₹{discountedPrice} OFF</span>
          </div> */}
          <div className="flex justify-between font-bold text-xl border-t pt-3">
            <span>Total</span>
            <span>₹{course?.price}</span>
          </div>
        </div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Choose Payment Method</h4>
          <div className="grid grid-cols-1 gap-4">
            {/* <button onClick={() => setPaymentMethod('upi')} className={`flex items-center justify-center p-4 rounded-lg border-2 ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'}`}>
              <QrCode className="mr-2" /> UPI
            </button>
            <button onClick={() => setPaymentMethod('wallet')} className={`flex items-center justify-center p-4 rounded-lg border-2 ${paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'}`}>
              <Wallet className="mr-2" /> Wallet
            </button> */}
            <button onClick={() => setPaymentMethod('PayU')} className={`flex items-center justify-center p-4 rounded-lg border-2 ${paymentMethod === 'PayU' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'}`}>
              PayU
            </button>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button onClick={handlePayment} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center">
            <CheckCircle className="mr-2" /> Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCheckout;
