"use client"
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Video } from 'lucide-react';
import { updateChapter, getChapter } from '@/api/courseApi';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface ChapterInputs {
  title: string;
  description: string;
  chapterVideo: File | null;
}

const EditChapter: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [courseId,setCourseId]=useState<{courseId:string}>()
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentVideoName, setCurrentVideoName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ChapterInputs>();

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const response = await getChapter( chapterId);
        if (response) {
          const chapter = response;
          setCourseId(chapter.courseId ||"")
          
          setValue('title', chapter.chapterTitle);
          setValue('description', chapter.description);
          setCurrentVideoName(chapter.videoUrl || 'No video uploaded');
        } else {
          toast.error('Failed to fetch chapter data');
        //   router.back();
        }
      } catch (error) {
        console.error('Error fetching chapter:', error);
        toast.error('Error loading chapter data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChapterData();
  }, [ ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
  };

  const onSubmit: SubmitHandler<ChapterInputs> = async (data: ChapterInputs) => {
    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      if (videoFile) {
        formData.append('chapterVideo', videoFile);
      }
      if(courseId){

          formData.append('courseId',courseId as any)
      }

      const response = await updateChapter(chapterId,formData);
      if (response.success) {
        toast.success(response.message);
        router.back();
      } else {
        toast.error(response.message || 'Failed to update chapter');
      }
      
    } catch (error) {
      console.error('Error updating chapter:', error);
      toast.error('Failed to update chapter');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading chapter data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-md p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Chapter</h1>
          <p className="text-gray-600 mt-2">Update your chapter content</p>
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
                    {videoFile ? videoFile.name : `Current video: ${currentVideoName}`}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Click to upload new video (optional)
                  </p>
                  <input
                    id="chapterVideo"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating Chapter...' : 'Update Chapter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChapter;