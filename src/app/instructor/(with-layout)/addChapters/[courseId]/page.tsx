"use client"
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Video } from 'lucide-react';
import { addChapter } from '@/api/courseApi';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { getInstructorDataById } from '@/api/instructorApi';
import GetVerified from '@/app/components/instructor/GetVerified';

interface ChapterInputs {
  title: string;
  description: string;
  chapterVideo:File | null
}
interface Instructor {
  isVerified: boolean;
}

const AddChapter: React.FC = () => {

    const { courseId } = useParams<{ courseId: string }>();
    const Instructor = useSelector((state: RootState) => state.instructor);

     const [instructorData, setInstructorData] = useState<Instructor>();

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router=useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChapterInputs>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
  };
   useEffect(() => {
      try {
        const fetch = async () => {
        
          const instructor = await getInstructorDataById(Instructor.userId);
          setInstructorData(instructor);
  
          
        };
        fetch();
      } catch (error) {}
    }, []);

  const onSubmit: SubmitHandler<ChapterInputs> = async (data:ChapterInputs) => {
    try {
      console.log(data,videoFile)
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      if (videoFile) {
        formData.append('chapterVideo', videoFile);
      }

      const response=await addChapter(formData,courseId)
      if(response.success){
        toast.success(response.message)
        router.back()
      }
      
      // Reset form after successful submission
      reset();
      setVideoFile(null);
      
    } catch (error) {
      console.error('Error adding chapter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!instructorData?.isVerified) return <GetVerified/>


  return (
    <div className="min-h-screen rounded-md p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Chapter</h1>
          <p className="text-gray-600 mt-2">Create a new chapter for your course</p>
        </div>

        <div className="bg-white text-black rounded-lg border shadow-lg">
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Chapter Title
                </label>
                <input
                  {...register("title", { 
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters"
                    }
                  })}
                  type="text"
                  className="w-full p-2 border rounded-lg"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description", { 
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters"
                    }
                  })}
                  className="w-full p-2 border rounded-lg h-24"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Video
                </label>
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
                  onClick={() => document.getElementById('chapterVideo')?.click()}
                >
                  <Video className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {videoFile ? videoFile.name : 'Upload chapter video'}
                  </p>
                  <input
                    id="chapterVideo"
                    type="file"
                    className="hidden"
                    accept="video/mp4,video/x-matroska"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Chapter...' : 'Add Chapter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChapter;