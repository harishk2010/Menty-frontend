"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { getCategories } from "@/api/adminApi";
import { addCouse, getCourse, updateCourse } from "@/api/courseApi";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import AlertDialog2 from "@/app/components/common/alertBoxes/AlertDialogBox2";
import AlertDialog from "@/app/components/common/alertBoxes/AlertDialogBox";
import { getInstructorDataById } from "@/api/instructorApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import GetVerified from "@/app/components/instructor/GetVerified";
import Loading from "@/app/components/fallbacks/Loading";

interface CourseData {
  courseName: string;
  description: string;
  price: string;
  category: string;
  level: string;
  duration: string;
  thumbnail: FileList | null;
  demoVideos: FileList | null;
}
interface ICategory {
  categoryName: string;
}
interface Instructor {
  isVerified: boolean;
}
const CourseCreation: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CourseData>();
  const router = useRouter();
  const Instructor = useSelector((state: RootState) => state.instructor);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [demoVideoPreview, setDemoVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [instructorData, setInstructorData] = useState<Instructor | null>(null);
  const [courseLoaded, setCourseLoaded] = useState<boolean>(false);
  
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [demoVideoUrl, setDemoVideoUrl] = useState<string | null>(null);

  const handleDemoVideoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
       if (!file.type.startsWith('video/')) {
              toast.warn("Choose Only Video Files!");
              return;
            }
             
            //  // Validate file size (5MB max)
            //  if (file.size > 5 * 1024 * 1024) {
            //    toast.warn('Video size should be less than 5MB');
            //    return;
            //  }
      const reader = new FileReader();

      reader.onloadend = () => {
        setDemoVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailPreview = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {

      if (!file.type.startsWith('image/')) {
                 toast.warn("Choose Only Image Files!")
                  return;
                }
                
                // Validate file size (5MB max)
                if (file.size > 5 * 1024 * 1024) {
                  toast.warn('Image size should be less than 5MB');
                  return;
                }
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [categoriesResponse, instructorResponse, courseResponse] = await Promise.all([
          getCategories(),
          getInstructorDataById(Instructor.userId),
          getCourse(courseId)
        ]);
        
        // Set categories
        setCategories(categoriesResponse || []);
        
        // Set instructor data
        setInstructorData(instructorResponse);
        
        // Set course data
        if (courseResponse) {
          const fetchedCourse = courseResponse;
          setValue("courseName", fetchedCourse.courseName);
          setValue("description", fetchedCourse.description);
          setValue("category", fetchedCourse.category);
          setValue("level", fetchedCourse.level);
          setValue("duration", fetchedCourse.duration);
          setValue("price", fetchedCourse.price);
          setThumbnailPreview(fetchedCourse.thumbnailUrl);
          setDemoVideoPreview(fetchedCourse.demoVideo?.url);
          setCourseLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load necessary data");
      } finally {
        // Only set loading to false once all requests are complete
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [courseId, Instructor.userId, setValue]);

  const onSubmit = async (data: CourseData) => {
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();
  

      if (data.thumbnail && data.thumbnail.length > 0) {
        formData.append("thumbnail", data.thumbnail[0]);
      }
      if (data.demoVideos && data.demoVideos.length > 0) {
        formData.append("demoVideos", data.demoVideos[0]);
      }
  
  
      for (const key in data) {
        if (key !== "thumbnail" && key !== "demoVideos") {
          formData.append(key, data[key as keyof CourseData] as string);
        }
      }
  
     
    
      const response = await updateCourse(courseId, formData);
  
      if (response?.success) {
        toast.success(response.message);
        router.replace("/instructor/courses");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmSubmission = () => {
    handleSubmit(onSubmit)();  // Call the form submission function
  };

  // Show loading screen until all data is fetched
  if (isLoading || instructorData === null || !courseLoaded) return <Loading />;

  // After loading, check verification status
  if (!instructorData.isVerified) return <GetVerified />;
  
  return (
    <div className="min-h-screen rounded-md p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-gray-600 mt-2">
            Update your course details
          </p>
        </div>

        <div className="bg-white text-black rounded-lg border shadow-md">
          <div className="flex flex-col space-y-1.5 p-6 border-b">
            <h3 className="text-2xl font-semibold">Course Information</h3>
          </div>
          <div className="p-6">
            <form onSubmit={e => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Course Name
                  </label>
                  <input
                    {...register("courseName", {
                      required: "Course Name is required",
                    })}
                    type="text"
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.courseName && (
                    <p className="text-red-500 text-sm">
                      {errors.courseName.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-3">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      {...register("price", { required: "Price is required" })}
                      type="text"
                      className=" p-2 border rounded-lg"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Duration (Hours)
                    </label>
                    <input
                      {...register("duration", {
                        required: "Duration is required",
                      })}
                      type="text"
                      className=" p-2 border rounded-lg"
                    />
                    {errors.duration && (
                      <p className="text-red-500 text-sm">
                        {errors.duration.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => {
                      return (
                        <option
                          key={category.categoryName}
                          value={category?.categoryName}
                        >
                          {category?.categoryName}
                        </option>
                      );
                    })}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Level
                  </label>
                  <select
                    {...register("level", { required: "Level is required" })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  {errors.level && (
                    <p className="text-red-500 text-sm">
                      {errors.level.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full p-2 border rounded-lg h-32"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 space-x-3">
                <div className="space-y-2 w-[400px]">
                  <label className="text-sm font-medium text-gray-700">
                    Thumbnail
                  </label>
                  <div
                    onClick={() =>
                      document.getElementById(`thumbnailInput`)?.click()
                    }
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
                  >
                    {thumbnailPreview ? (
                      <img
                        onContextMenu={(e) => e.preventDefault()}
                        src={thumbnailPreview}
                        alt="Course thumbnail"
                        className="mx-auto h-full w-full"
                      />
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <input
                      id="thumbnailInput"
                      {...register("thumbnail", {
                        onChange: handleThumbnailPreview,
                      })}
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                    {errors.thumbnail && (
                      <p className="text-red-500 text-sm">
                        {errors.thumbnail.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 w-[400px]">
                  <label className="text-sm font-medium text-gray-700">
                    Demo Video
                  </label>
                  <div
                    id="demoVideos"
                    onClick={() =>
                      document.getElementById(`demoVideoInput`)?.click()
                    }
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
                  >
                    {demoVideoPreview ? (
                      <video
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        src={demoVideoPreview}
                        controls
                        className="mx-auto"
                      ></video>
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}

                    <input
                      id="demoVideoInput"
                      {...register("demoVideos", {
                        onChange: handleDemoVideoChange,
                      })}
                      type="file"
                      className="hidden"
                      accept="video/*"
                    />
                    {errors.demoVideos && (
                      <p className="text-red-500 text-sm">
                        {errors.demoVideos.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <AlertDialog2
                title="Confirm Changes"
                alert="Are you sure you want to update your course details?"
                onConfirm={handleConfirmSubmission}
              >
                <button
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save & Continue"}
                </button>
              </AlertDialog2>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreation;