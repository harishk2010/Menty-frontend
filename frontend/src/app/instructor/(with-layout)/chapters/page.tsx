"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { PlusCircle, Upload, X, Video } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getInstructorDataById } from '@/api/instructorApi';
import GetVerified from '@/app/components/instructor/GetVerified';
import Loading from '@/app/components/fallbacks/Loading';

// Interface for course data
interface CourseData {
  courseName: string;
  description: string;
  price: string;
  category: string;
  level: string;
  duration: string;
  thumbnail: File | null;
  demoVideos: File[];
}

// Interface for chapter data
interface ChapterData {
  title: string;
  description: string;
  video: File | null;
}
interface Instructor {
  isVerified: boolean;
}
// Type for active step
type ActiveStep = 'course' | 'chapters';

const CourseCreation: React.FC = () => {
  const [course, setCourse] = useState<CourseData>({
    courseName: '',
    description: '',
    price: '',
    category: '',
    level: '',
    duration: '',
    thumbnail: null,
    demoVideos: []
  });
  const Instructor = useSelector((state: RootState) => state.instructor);

     const [instructorData, setInstructorData] = useState<Instructor>();
  const [chapters, setChapters] = useState<ChapterData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<ActiveStep>('course');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      try {
        const instructor = await getInstructorDataById(Instructor.userId);
        setInstructorData(instructor);
      } catch (error) {
        // alert('Error fetching quiz data');
        // router.push('/quizzes'); // Redirect to quizzes list on error
      }finally {      
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  const handleCourseSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Append course data
      Object.entries(course).forEach(([key, value]) => {
        if (key === 'thumbnail' && value) {
          formData.append('thumbnail', value);
        } else if (key === 'demoVideos') {
          value.forEach((video: File) => {
            formData.append('demoVideos', video);
          });
        } else {
          formData.append(key, String(value));
        }
      });

      // Here you would implement the actual API call
      // await axios.post('/api/courses', formData);
      
      setActiveStep('chapters');
    } catch (error) {
      console.error('Error submitting course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddChapter = (): void => {
    setChapters([...chapters, {
      title: '',
      description: '',
      video: null
    }]);
  };

  const handleChapterChange = (
    index: number,
    field: keyof ChapterData,
    value: string | File | null
  ): void => {
    const updatedChapters = [...chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      [field]: value
    };
    setChapters(updatedChapters);
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'thumbnail' | 'video',
    chapterIndex?: number
  ): void => {
    const file = e.target.files?.[0] || null;
    
    if (field === 'thumbnail') {
      setCourse(prev => ({ ...prev, thumbnail: file }));
    } else if (field === 'video' && typeof chapterIndex === 'number') {
      handleChapterChange(chapterIndex, 'video', file);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const removeChapter = (index: number): void => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handlePublishCourse = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      
      // Create FormData for chapters
      const chaptersFormData = new FormData();
      
      chapters.forEach((chapter, index) => {
        chaptersFormData.append(`chapters[${index}][title]`, chapter.title);
        chaptersFormData.append(`chapters[${index}][description]`, chapter.description);
        if (chapter.video) {
          chaptersFormData.append(`chapters[${index}][video]`, chapter.video);
        }
      });

      // Here you would implement the API call to save chapters
      // await axios.post('/api/chapters', chaptersFormData);
      
    } catch (error) {
      console.error('Error publishing course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading || instructorData === null) return <Loading />;

  if (!instructorData?.isVerified) return <GetVerified/>

  return (
    <div className="min-h-screen rounded-md  p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-2">Share your knowledge by creating a comprehensive course</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            type="button"
            className={`px-6 py-3 rounded-lg font-medium ${
              activeStep === 'course'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setActiveStep('course')}
          >
            Course Details
          </button>
          <button
            type="button"
            className={`px-6 py-3 rounded-lg font-medium ${
              activeStep === 'chapters'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setActiveStep('chapters')}
          >
            Chapters
          </button>
        </div>

        {activeStep === 'course' ? (
          <div className="bg-white  text-black rounded-lg border shadow-md">
            <div className="flex flex-col space-y-1.5 p-6 border-b">
              <h3 className="text-2xl font-semibold">Course Information</h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleCourseSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Course Name
                    </label>
                    <input
                      type="text"
                      name="courseName"
                      className="w-full p-2 border rounded-lg"
                      value={course.courseName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="w-full p-2 border rounded-lg"
                      value={course.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      className="w-full p-2 border rounded-lg"
                      value={course.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="programming">Programming</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Level
                    </label>
                    <select
                      name="level"
                      className="w-full p-2 border rounded-lg"
                      value={course.level}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full p-2 border rounded-lg h-32"
                    value={course.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Thumbnail
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
                       onClick={() => document.getElementById('thumbnail')?.click()}>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {course.thumbnail ? course.thumbnail.name : 'Drag and drop your thumbnail here or click to browse'}
                    </p>
                    <input
                      id="thumbnail"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'thumbnail')}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save & Continue'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-white text-black rounded-lg border shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6 border-b">
              <h3 className="text-2xl font-semibold">Course Chapters</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-6 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeChapter(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Chapter Title
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg"
                          value={chapter.title}
                          onChange={(e) =>
                            handleChapterChange(index, 'title', e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          className="w-full p-2 border rounded-lg h-24"
                          value={chapter.description}
                          onChange={(e) =>
                            handleChapterChange(index, 'description', e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Video
                        </label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
                             onClick={() => document.getElementById(`chapter-video-${index}`)?.click()}>
                          <Video className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">
                            {chapter.video ? chapter.video.name : 'Upload chapter video'}
                          </p>
                          <input
                            id={`chapter-video-${index}`}
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleFileChange(e, 'video', index)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddChapter}
                  className="w-full py-4 border-2 border-dashed rounded-lg text-gray-600 hover:text-gray-800 flex items-center justify-center gap-2"
                >
                  <PlusCircle className="h-5 w-5" />
                  Add New Chapter
                </button>

                <button
                  type="button"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                  onClick={handlePublishCourse}
                  disabled={isSubmitting || chapters.length === 0}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Course'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCreation;
