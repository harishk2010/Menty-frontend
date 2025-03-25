"use client";
import { updatePlanPrice } from "@/api/instructorApi";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface PricingProps {
  initialPrice?: number;
  onSave?: (price: number) => Promise<void>;
}

const InstructorPricing: React.FC<PricingProps> = ({
  initialPrice = 100,
  onSave = async () => {},
}) => {
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(currentPrice);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const instructoruserId = useSelector(
    (state: RootState) => state.instructor.userId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    try {
      if (!instructoruserId) {
        toast.error("No instructor ID found");
        setStatus("error");
        return;
      }

      // Call the API with newPrice instead of currentPrice
      const response = await updatePlanPrice(newPrice, instructoruserId);
      
      if (response.success) {
        setCurrentPrice(response.data.planPrice);
        setIsEditing(false);
        setStatus("success");
        toast.success("Price updated successfully!");
        await onSave(newPrice);
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

  return (
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium  text-gray-700 mb-1">
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
  );
};

export default InstructorPricing;