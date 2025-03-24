

"use client"
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { format } from 'date-fns';
import { Send, Image, X } from 'lucide-react';
import { getChatHistoryById, uploadChatImage } from '@/api/chatApi';
import { RootState } from '@/redux/store';

import { motion } from "framer-motion";
import PrimaryButton from '../../buttons/PrimaryButton';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { SOCKET_URL } from '@/utils/constants';

interface Message {
  content: string;
  sender: string;
  senderType: 'student' | 'instructor';
  createdAt: Date;
  messageType?: 'text' | 'image';
  imageUrl?: string;
}

interface ChatInterfaceProps {
  bookingId: string;
  studentId: string;
  instructorId: string;
  slotStartTime: Date;
  slotEndTime: Date;
}

// New interfaces for user types
interface BaseUser {
  userId: string;
  role: 'student' | 'instructor';
}

interface Student extends BaseUser {
  role: 'student';
  // Add student-specific fields here
}

interface Instructor extends BaseUser {
  role: 'instructor';
  // Add instructor-specific fields here
}

// Custom hook for getting current user
const useCurrentUser = () => {
  const student = useSelector((state: RootState) => state.user);
  const instructor = useSelector((state: RootState) => state.instructor);
  
  return student.userId? student : instructor;
};

const ChatInterface = ({ 
  bookingId, 
  studentId, 
  instructorId, 
  slotStartTime, 
  slotEndTime 
}: ChatInterfaceProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUser = useCurrentUser();
  const [isChatActive, setIsChatActive] = useState(false);
  const router = useRouter();
  const currentTime = Date.now();
  const startTime = new Date(slotStartTime).getTime();
  const endTime = new Date(slotEndTime).getTime();

  // Validate current user has access to this chat
  useEffect(() => {
    if (!currentUser) return;
    
    const hasAccess = 
      (currentUser.role === 'student' && currentUser.userId === studentId) ||
      (currentUser.role === 'instructor' && currentUser.userId === instructorId);
      
    if (!hasAccess) {
      console.error('User does not have access to this chat', `${currentUser.userId}--${instructorId}`);
      router.back();
    }
  }, [currentUser, studentId, instructorId, router]);

  useEffect(() => {
 
  console.log("first socket / https://menty.live /",SOCKET_URL)
 
  const socketInstance = io("https://menty.live", {
    transports: ['websocket'],
    path: '/socket.io', // Change this to match the default Socket.IO path
    reconnectionDelayMax: 10000,
    reconnectionAttempts: 5,
  });

    socketInstance.on('connect', () => {
      console.log('Connected to chat server');
      socketInstance.emit('join-room', bookingId);
    });
    
    socketInstance.on('receive-message',async (newMessage: Message) => {
      if (newMessage.messageType === 'image') {
        try {
          console.log('Image message detected, refreshing chat history');
          const updatedMessages = await getChatHistoryById(bookingId);
          console.log('Updated messages:', updatedMessages);
          setMessages(updatedMessages);
        } catch (err) {
          console.error("Error refreshing chat history:", err);
        }
      } else {
        // For text messages, just append
        setMessages(prev => [...prev, newMessage]);
      }
    });

    socketInstance.on('show-typing', (data) => setIsTyping(true));
    socketInstance.on('hide-typing', () => setIsTyping(false));

    setSocket(socketInstance);

    getChatHistoryById(bookingId)
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching chat history:", err));

    return () => {
      socketInstance.disconnect();
    };
  }, [bookingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const now = new Date();
    const start = new Date(slotStartTime);
    const end = new Date(slotEndTime);
    
    setIsChatActive(now >= start && now <= end);
    
    if (now < start) {
      const timeout = setTimeout(() => setIsChatActive(true), start.getTime() - now.getTime());
      return () => clearTimeout(timeout);
    }
  }, [slotStartTime, slotEndTime]);

  const typingFun = () => {
    socket?.emit('typing', { roomId: bookingId, userId: currentUser.userId });
  };

  const sendMessage = async () => {
    if (!socket || !isChatActive || !currentUser) return;

    if (selectedImage) {
      await sendImageMessage();
      return;
    }

    if (!message.trim()) return;

    const messageData = {
      bookingId,
      message: message.trim(),
      sender: currentUser.userId,
      senderType: currentUser.role,
      roomId: bookingId,
      messageType: 'text'
    };

    socket.emit('send-message', messageData);
    setMessage('');
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Validate file is an image
    if (!file.type.startsWith('image/')) {
     toast.warn("Choose Only Image Files!")
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.warn('Image size should be less than 5MB');
      return;
    }
    
    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const cancelImageUpload = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sendImageMessage = async () => {
    if (!selectedImage || !socket || !currentUser) return;
    
    try {
      setIsUploading(true);
      
      // Upload image to S3
      const uploadResult = await uploadChatImage(selectedImage);
      
      // Send message with image URL
      const messageData = {
        bookingId,
        message: 'Image sent',
        sender: currentUser.userId,
        senderType: currentUser.role,
        roomId: bookingId,
        messageType: 'image',
        imageUrl: uploadResult.imageUrl
      };
      
      socket.emit('send-message', messageData);
      
      // Reset image state
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setTimeout(async()=>{
        try {
          
          const signedMessages=await getChatHistoryById(bookingId)
          setMessages(signedMessages)
        } catch (error) {
          console.log(error)
        }
      },1000) 
      // const signedMessages=await getChatHistoryById(bookingId)
      //    await setMessages(signedMessages)
    } catch (error) {
      console.error('Failed to send image:', error);
      toast.error('Failed to send image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const getMessageStyle = (msg: Message) => {
    const isOwnMessage = msg.sender === currentUser?.userId;
    return {
      containerClass: `flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`,
      messageClass: `max-w-[70%] p-3 rounded-lg ${
        isOwnMessage ? 'bg-purple-600 text-white' : 'bg-orange-300'
      }`
    };
  };

  if (!currentUser) {
    return <div className="text-center p-4">Please log in to access the chat.</div>;
  }

  if (!isChatActive) {
    return (
      <div className="flex flex-col space-y-5 items-center justify-center h-64 bg-gray-50 rounded-lg">
        {currentTime < startTime ? (
          // Show "Join at" message if the session hasn't started
          <p className="text-gray-600">
            Join at {format(startTime, 'hh:mm a')}
          </p>
        ) : currentTime > endTime ? (
          // Show "Chat Ended" message if the session has ended
          <p className="text-gray-600">
            Chat Ended at {format(endTime, 'hh:mm a')}
          </p>
        ) : (
          // Show "Join Now" if the session is ongoing
          <p className="text-gray-600 font-semibold text-lg">
            Session is Live! Join Now
          </p>
        )}
        <div onClick={() => router.back()}>
          <PrimaryButton name={"Return to Bookings"} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Live Chat</h2>
        <p className="text-sm text-gray-500">
          Session ends at {format(new Date(slotEndTime), 'hh:mm a')}
        </p>
        <p className="text-sm text-gray-500">
          Logged in as: {currentUser.role}
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const { containerClass, messageClass } = getMessageStyle(msg);
          
          return (
            <div key={index} className={containerClass}>
              <div className={messageClass}>
                {msg.messageType === 'image' && msg.imageUrl ? (
                
                  <div className="mb-2">
                    <img
                      src={msg.imageUrl}
                      alt="Shared image"
                      className="max-w-full rounded"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
                <p className="text-xs mt-1 opacity-70">
                  {format(new Date(msg.createdAt), 'hh:mm a')}
                </p>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div
            // initial={{ opacity: 0, x: 10 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-sm text-black max-w-[10%] rounded-lg  p-2 text-wrap"
          >
            typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview Area */}
      {imagePreview && (
        <div className="px-4 pb-2">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-24 rounded border"
            />
            <button
              onClick={cancelImageUpload}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onKeyUp={typingFun}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            disabled={!!selectedImage || isUploading}
            className="flex-1 p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          
          {/* Image upload button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            title="Send image"
          >
            <Image className="w-5 h-5" />
          </button>
          
          {/* Send button */}
          <button
            onClick={sendMessage}
            disabled={isUploading || (!message.trim() && !selectedImage)}
            className={`p-2 rounded-lg transition-colors ${
              isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isUploading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;