"use client"
import React, { useState } from 'react';

interface AlertDialogProps {
  children: React.ReactNode;
  onConfirm: (comment: string) => void;
  alert: string;
  showCommentField?: boolean;
  commentLabel?: string;
}

const AlertDialogWithComment: React.FC<AlertDialogProps> = ({
  children,
  onConfirm,
  alert,
  showCommentField = false,
  commentLabel = "Comment"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');

  const handleConfirm = () => {
    onConfirm(comment);
    setIsOpen(false);
    setComment('');
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Confirmation</h2>
            <p className="text-gray-600 mb-4">{alert}</p>

            {showCommentField && (
              <div className="mb-4">
                <label 
                  htmlFor="comment" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {commentLabel}
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  className="w-full px-3 py-2 border text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={`Enter ${commentLabel.toLowerCase()}`}
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-purple-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertDialogWithComment;