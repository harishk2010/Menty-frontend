
"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RootState } from '@/redux/store';
import { getInstructorData } from '@/api/instructorApi';
import { updatePlanPrice } from '@/api/instructorApi';
import { getRequestData } from '@/api/verificationApi';
import { Wallet } from 'lucide-react';
import { toast } from 'react-toastify';

interface Transaction {
  amount: number;
  type: 'credit' | 'debit';
  txnId: string;
  description: string;
  date: Date;
}

interface InstructorData {
  userId: string | null;
  username: string | null;
  email: string | null;
  mobile: string | null;
  expertise: string | null;
  skills: string | null;
  role: string | null;
  profilePicUrl: string | null;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  isVerified: boolean;
  isBlocked: boolean;
  planPrice: number;
  wallet: {
    balance: number;
    transactions: Transaction[];
  };
}

interface VerificationRequest {
  _id: string;
  username: string;
  email: string;
  resumeUrl: string;
  degreeCertificateUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

const ProfileHeader = () => {
  const pathname = usePathname();
  const [requestData, setRequestData] = useState<VerificationRequest | null>(null);
  const [instructorData, setInstructorData] = useState<InstructorData>({
    userId: null,
    username: null,
    email: null,
    mobile: null,
    expertise: null,
    skills: null,
    role: null,
    profilePicUrl: null,
    verificationStatus: 'pending',
    isVerified: false,
    isBlocked: false,
    planPrice: 100,
    wallet: {
      balance: 0,
      transactions: []
    }
  });

  // Plan Pricing State
  const [currentPrice, setCurrentPrice] = useState(instructorData.planPrice);
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(currentPrice);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const loggedIn = useSelector((state: RootState) => state.instructor.email);
  const instructor = useSelector((state: RootState) => state.instructor);
  const instructorUserId = useSelector((state: RootState) => state.instructor.userId);
  
  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && instructor?.email) {
        try {
          const fetchedData = await getInstructorData(instructor.email);
          setInstructorData(fetchedData || {});
          setCurrentPrice(fetchedData?.planPrice || 100);
          const fetchedRequestData = await getRequestData(instructor.email);
          setRequestData(fetchedRequestData);
        } catch (error) {
          console.error('Error fetching instructor data:', error);
        }
      }
    };

    fetchData();
  }, [loggedIn, instructor?.email]);

  const handlePriceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    try {
      if (!instructorUserId) {
        toast.error("No instructor ID found");
        setStatus("error");
        return;
      }

      const response = await updatePlanPrice(newPrice, instructorUserId);
      
      if (response.success) {
        setCurrentPrice(response.data.planPrice);
        setIsEditing(false);
        setStatus("success");
        toast.success("Price updated successfully!");
      } else {
        throw new Error(response.message || "Failed to update price");
      }
    } catch (error) {
      console.error("Price update error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update price");
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const renderVerificationButton = () => {
    if (instructorData.isVerified) {
      return (
        <Link href="/instructor/changePassword">
          <button className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
            Change Password
          </button>
        </Link>
      );
    }

    if (instructorData.verificationStatus === "rejected") {
      return (
        <Link href="/instructor/verification">
          <button className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
            Reverify
          </button>
        </Link>
      );
    }

    if (instructorData.verificationStatus === "pending") {
      return (
        <Link href="/instructor/verification">
          <button className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
            Get Verified
          </button>
        </Link>
      );
    }

    return null;
  };

  const getVerificationStatusDisplay = () => {
    if (instructorData.isVerified) {
      return {
        text: 'Verified',
        className: 'bg-green-100 text-green-800'
      };
    }

    if (instructorData.verificationStatus === 'rejected') {
      return {
        text: 'Rejected',
        className: 'bg-red-100 text-red-800'
      };
    }

    return {
      text: 'Pending',
      className: 'bg-yellow-100 text-yellow-800'
    };
  };

  const statusDisplay = getVerificationStatusDisplay();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Section */}
            <div className="flex-1">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-100">
                  <img
                    src={instructorData.profilePicUrl || '/placeholder-avatar.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {instructorData.username}
                    </h1>
                    <span className={`px-2 py-1 text-sm rounded ${statusDisplay.className}`}>
                      {statusDisplay.text}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">Role:</span> {instructorData.role}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {instructorData.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Mobile:</span> {instructorData.mobile|| "Not Provided"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Expertise:</span> {instructorData.expertise || "Not Provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Wallet Section */}
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Wallet Balance</h2>
                </div>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  ₹{instructorData.wallet.balance.toFixed(2)}
                </p>
                <Link href="/instructor/transactions">
                  <p className="text-sm text-gray-600">
                    Recent Transactions: {instructorData.wallet.transactions.length}
                  </p>
                </Link>
              </div>

              {/* Plan Pricing Section */}
              <div className="w-full max-w-lg p-6 mt-4 bg-white rounded-lg shadow-purple-300 shadow-lg">
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2 text-purple-600">
                    ₹ Plan Pricing
                  </h2>
                  <p className="text-gray-600">
                    Set your fixed price per mentorship slot. This price will apply to all
                    future slots.
                  </p>
                </div>

                {!isEditing ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">
                          Current Price per Slot
                        </div>
                        <div className="text-2xl text-orange-500 font-bold">
                          ₹{currentPrice}
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm bg-purple-500 hover:bg-purple-600 rounded-md text-white"
                      >
                        Change Price
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePriceSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Price per Slot
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">₹</span>
                        <input
                          type="number"
                          min="100"
                          value={newPrice}
                          onChange={(e) => setNewPrice(Number(e.target.value))}
                          className="w-full pl-7 pr-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={status === "saving"}
                        className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300"
                      >
                        {status === "saving" ? "Saving..." : "Save New Price"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setNewPrice(currentPrice);
                        }}
                        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-black"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {status === "success" && (
                  <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md">
                    Price successfully updated to ₹{currentPrice}
                  </div>
                )}

                {status === "error" && (
                  <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
                    Failed to update price. Please try again.
                  </div>
                )}
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col gap-4 min-w-[200px]">
              <Link href="/instructor/editProfile">
                <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Edit Profile
                </button>
              </Link>

              {renderVerificationButton()}

              {instructorData.isBlocked && (
                <div className="mt-2 p-3 bg-red-50 rounded-lg">
                  <p className="text-red-600 text-sm text-center">
                    Your account is currently blocked. Please contact support.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;