// "use client"

// import React, { useEffect, useState } from 'react';
// import { Wallet, QrCode, CheckCircle, Clock, User } from 'lucide-react';
// import { useParams } from 'next/navigation';
// import CryptoJS from 'crypto-js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { getSlot } from '@/api/bookingApi';
// import { getInstructorData, getInstructorDataById } from '@/api/instructorApi';

// interface IMentor {
//   _id: string;
//   username: string;
//   email: string;
//   mobile: string;
//   expertise: string[];
//   skills: string;
//   profilePicUrl: string;
//   verificationStatus: 'pending' | 'verified' | 'rejected';
//   isVerified: boolean;
// }

// interface ISlot {
//   _id: string;
//   instructorId: string;
//   startTime: Date;
//   endTime: Date;
//   isBooked: boolean;
//   price: number;
// }

// const SlotCheckout: React.FC = () => {
//   const params = useParams();
//   const slotId = params.slotId as string;
//   const [slot, setSlot] = useState<ISlot>();
//   const [mentor, setMentor] = useState<IMentor>();
//   const [paymentMethod, setPaymentMethod] = useState<'upi' | 'wallet' | 'PayU'>('upi');
//   const [txnid, setTxnid] = useState<string>('');
//   const [hash, setHash] = useState<string>('');

//   const userDetails = useSelector((state: RootState) => state.user);
//   const { userId, name, email } = userDetails;
//   const phone = '8248093223'; // This should come from user details

//   useEffect(() => {
//     if (!slotId) {
//       console.error('Slot ID is invalid');
//       return;
//     }

//     const fetchSlotAndMentor = async () => {
//       try {
//         // These API calls should be implemented based on your backend structure
//         const slotResponse = await getSlot(slotId)
//         const slotData = slotResponse.data
//         setSlot(slotData);

//         const mentorResponse = await getInstructorDataById(slotData.instructorId);
//         const mentorData =  mentorResponse
//         setMentor(mentorData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to load booking details');
//       }
//     };

//     fetchSlotAndMentor();
//     setTxnid('txn' + new Date().getTime());
//   }, [slotId]);

//   useEffect(() => {
//     if (!txnid || !slot) return;
//     const key = process.env.NEXT_PUBLIC_PAYU_KEY;
//     const salt = process.env.NEXT_PUBLIC_PAYU_SALT;
//     const productinfo = slotId;
//     const firstname = name || '';
//     const userEmail = email || '';
//     const udf1 = '';
//     const udf2 = '';
//     const udf3 = '';
//     const udf4 = '';
//     const udf5 = '';
//     const hashString = `${key}|${txnid}|${slot.price}|${productinfo}|${firstname}|${userEmail}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
//     setHash(CryptoJS.SHA512(hashString).toString());
//   }, [txnid, slot, name, email, slotId]);

//   const formatDateTime = (date: Date) => {
//     return new Date(date).toLocaleString('en-US', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const handlePayment = () => {
//     if (!txnid || !slot?.price || !slotId) {
//       toast.error('Invalid payment details. Please refresh and try again.');
//       return;
//     }

//     const surl = `${window.location.origin}/api/booking-payment-success`;
//     const furl = `${window.location.origin}/api/booking-payment-failure`;

//     if (paymentMethod === 'PayU') {
//       const formData = {
//         key: process.env.NEXT_PUBLIC_PAYU_KEY,
//         txnid: txnid,
//         productinfo: slotId,
//         amount: slot.price.toString(),
//         email: email,
//         firstname: name,
//         lastname: mentor?.username || '',
//         phone: phone,
//         surl,
//         furl,
//         hash: hash,
//       };

//       const form = document.createElement('form');
//       form.method = 'POST';
//       form.action = `${process.env.NEXT_PUBLIC_PAYU_URL}`;

//       Object.keys(formData).forEach((key) => {
//         const input = document.createElement('input');
//         input.type = 'hidden';
//         input.name = key;
//         input.value = formData[key as keyof typeof formData] || '';
//         form.appendChild(input);
//       });

//       document.body.appendChild(form);
//       form.submit();
//     } else {
//       toast.success('Payment successful via Wallet/UPI!');
//     }
//   };

//   if (!slot || !mentor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
//         <div className="p-6 border-b">
//           <h2 className="text-2xl font-bold text-gray-800">Booking Checkout</h2>
//         </div>

//         <div className="p-6 flex space-x-4">
//           <img 
//             src={mentor.profilePicUrl} 
//             alt={mentor.username} 
//             className="w-32 h-32 rounded-full object-cover"
//           />
//           <div>
//             <h3 className="font-bold text-lg">{mentor.username}</h3>
//             <p className="text-gray-600">
//               <Clock className="inline-block mr-2" size={16} />
//               {formatDateTime(slot.startTime)} - {new Date(slot.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
//             </p>
//             <p className="text-gray-600 mt-2">{mentor.skills}</p>
//           </div>
//         </div>

//         <div className="p-6 bg-gray-50">
//           <div className="flex justify-between font-bold text-xl">
//             <span>Total</span>
//             <span>${slot.price.toFixed(2)}</span>
//           </div>
//         </div>

//         <div className="p-6">
//           <h4 className="text-lg font-semibold mb-4">Choose Payment Method</h4>
//           <div className="grid grid-cols-1 gap-4">
//             {/* <button 
//               onClick={() => setPaymentMethod('upi')} 
//               className={`flex items-center justify-center p-4 rounded-lg border-2 ${
//                 paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
//               }`}
//             >
//               <QrCode className="mr-2" /> UPI
//             </button>
//             <button 
//               onClick={() => setPaymentMethod('wallet')} 
//               className={`flex items-center justify-center p-4 rounded-lg border-2 ${
//                 paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
//               }`}
//             >
//               <Wallet className="mr-2" /> Wallet
//             </button> */}
//             <button 
//               onClick={() => setPaymentMethod('PayU')} 
//               className={`flex items-center justify-center p-4 rounded-lg border-2 ${
//                 paymentMethod === 'PayU' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
//               }`}
//             >
//               PayU
//             </button>
//           </div>
//         </div>

//         <div className="p-6 pt-0">
//           <button 
//             onClick={handlePayment}
//             className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center"
//           >
//             <CheckCircle className="mr-2" /> Confirm Booking
//           </button>
//         </div>
//       </div>
//       <ToastContainer position="bottom-right" />
//     </div>
//   );
// };

// export default SlotCheckout;
"use client"

import React, { useEffect, useState } from 'react';
import { Wallet, QrCode, CheckCircle, Clock, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import CryptoJS from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getSlot } from '@/api/bookingApi';
import { getInstructorData, getInstructorDataById } from '@/api/instructorApi';
import { FRONTEND_URL } from '@/app/utils/validationSchemas/constants';

interface IMentor {
  _id: string;
  username: string;
  email: string;
  mobile: string;
  expertise: string[];
  skills: string;
  profilePicUrl: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  isVerified: boolean;
}

interface ISlot {
  _id: string;
  instructorId: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  price: number;
}

const SlotCheckout: React.FC = () => {
  const params = useParams();
  const slotId = params.slotId as string;
  const [slot, setSlot] = useState<ISlot>();
  const [mentor, setMentor] = useState<IMentor>();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'wallet' | 'PayU'>('PayU');
  const [txnid, setTxnid] = useState<string>('');
  const [hash, setHash] = useState<string>('');
  const [formReady, setFormReady] = useState<boolean>(false);

  const userDetails = useSelector((state: RootState) => state.user);
  const { userId, name, email } = userDetails;
  const phone = '8248093223'; // This should come from user details

  useEffect(() => {
    if (!slotId) {
      console.error('Slot ID is invalid');
      return;
    }

    const fetchSlotAndMentor = async () => {
      try {
        // These API calls should be implemented based on your backend structure
        const slotResponse = await getSlot(slotId)
        const slotData = slotResponse.data
        setSlot(slotData);

        const mentorResponse = await getInstructorDataById(slotData.instructorId);
        const mentorData = mentorResponse
        setMentor(mentorData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load booking details');
      }
    };

    fetchSlotAndMentor();
    setTxnid('txn' + new Date().getTime());
  }, [slotId]);

  useEffect(() => {
    if (!txnid || !slot) return;
    const key = process.env.NEXT_PUBLIC_PAYU_KEY|| 't4VOu4';
    const salt = process.env.NEXT_PUBLIC_PAYU_SALT || 'h1r2JIjnHkpgtJrfBkfqKOS02hi3B0UB';
    const productinfo = slotId;
    const firstname = name || '';
    const userEmail = email || '';
    const udf1 = '';
    const udf2 = '';
    const udf3 = '';
    const udf4 = '';
    const udf5 = '';
    const hashString = `${key}|${txnid}|${slot.price}|${productinfo}|${firstname}|${userEmail}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
    setHash(CryptoJS.SHA512(hashString).toString());
    setFormReady(true);
  }, [txnid, slot, name, email, slotId]);

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handlePayment = () => {
    if (!txnid || !slot?.price || !slotId) {
      toast.error('Invalid payment details. Please refresh and try again.');
      return;
    }

    if (paymentMethod === 'PayU') {
      // Directly submit the form that's already in the DOM
      const paymentForm = document.getElementById('payuForm') as HTMLFormElement;
      if (paymentForm) {
        try {
          console.log('Submitting payment form...');
          paymentForm.submit();
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('Payment gateway error. Please try again.');
        }
      } else {
        console.error('Payment form not found in DOM');
        toast.error('Payment form not found. Please refresh the page.');
      }
    } else {
      toast.success('Payment successful via Wallet/UPI!');
    }
  };

  if (!slot || !mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  const surl = `${FRONTEND_URL}/nextapi/booking-payment-success`;
  const furl = `${FRONTEND_URL}/nextapi/booking-payment-failure`;

  return (
    <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center p-4">
      {/* Hidden payment form - always present in DOM */}
      {formReady && (
        <form
          id="payuForm"
          method="POST"
          action={process.env.NEXT_PUBLIC_PAYU_URL || 'https://test.payu.in/_payment'}
          style={{ display: 'none' }}
        >
          <input type="hidden" name="key" value={process.env.NEXT_PUBLIC_PAYU_KEY || 't4VOu4'} />
          <input type="hidden" name="txnid" value={txnid} />
          <input type="hidden" name="productinfo" value={slotId} />
          <input type="hidden" name="amount" value={slot.price.toString()} />
          <input type="hidden" name="email" value={email || ''} />
          <input type="hidden" name="firstname" value={name || ''} />
          <input type="hidden" name="lastname" value={mentor?.username || ''} />
          <input type="hidden" name="phone" value={phone} />
          <input type="hidden" name="surl" value={surl} />
          <input type="hidden" name="furl" value={furl} />
          <input type="hidden" name="hash" value={hash} />
        </form>
      )}

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Booking Checkout</h2>
        </div>

        <div className="p-6 flex space-x-4">
          <img 
            src={mentor.profilePicUrl} 
            alt={mentor.username} 
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-lg">{mentor.username}</h3>
            <p className="text-gray-600">
              <Clock className="inline-block mr-2" size={16} />
              {formatDateTime(slot.startTime)} - {new Date(slot.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </p>
            <p className="text-gray-600 mt-2">{mentor.skills}</p>
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>₹{slot.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Choose Payment Method</h4>
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => setPaymentMethod('PayU')} 
              className={`flex items-center justify-center p-4 rounded-lg border-2 ${
                paymentMethod === 'PayU' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              PayU
            </button>
          </div>
        </div>

        <div className="p-6 pt-0">
          <button 
            onClick={handlePayment}
            disabled={!formReady}
            className={`w-full ${formReady ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-400'} text-white py-3 rounded-lg flex items-center justify-center`}
          >
            <CheckCircle className="mr-2" /> Confirm Booking
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default SlotCheckout;