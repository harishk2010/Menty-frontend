"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { getCategories } from "@/api/adminApi";
import { addCouse, getCourse } from "@/api/courseApi";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

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

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [demoVideoPreview, setDemoVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [demoVideoUrl, setDemoVideoUrl] = useState<string | null>(null);

  const handleDemoVideoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response || "[]");
      };
      fetchCategories();

      const fetchCourse = async () => {
        const response = await getCourse(courseId);
        if (response) {
          const fetchedCourse = response;
          console.log(fetchedCourse, "fetcheddd");
          setValue("courseName", fetchedCourse.courseName);
          setValue("description", fetchedCourse.description);
          setValue("category", fetchedCourse.category);
          setValue("level", fetchedCourse.level);
          setValue("duration", fetchedCourse.duration);
          setValue("price", fetchedCourse.price);
          setThumbnailPreview(fetchedCourse.thumbnailUrl);
          setDemoVideoPreview(fetchedCourse.demoVideo?.url);
        }
      };
      fetchCourse();
    } catch (error) {}
  }, []);

  const onSubmit = async (data: CourseData) => {
    console.log("Submitting Data:", data);
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      if (data.thumbnail && data.thumbnail.length > 0) {
        formData.append("thumbnail", data.thumbnail[0]);
      }
      if (data.demoVideos && data.demoVideos.length > 0) {
        formData.append("demoVideos", data.demoVideos[0]);
      }

      // Append all other fields dynamically (including price and duration)
      for (const key of Object.keys(data)) {
        if (key !== "thumbnail" && key !== "demoVideos") {
          formData.append(key, data[key as keyof CourseData] as string);
        }
      }

      // Debugging: Check FormData
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // Send request
      const response = await addCouse(formData);
      console.log("Server Response:", response);

      if (response.success) {
        toast.success(response.message);
        setIsSubmitting(false);
        router.replace("/instructor/courses");
      }
    } catch (error: unknown) {
      // Type-check the error
      if (error instanceof Error) {
        console.error("Error submitting course:", error.message);
        toast.error(`Error: ${error.message}`);
      } else {
        console.error("Unknown error submitting course:", error);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen rounded-md p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-gray-600 mt-2">
            Share your knowledge by creating a comprehensive course
          </p>
        </div>

        <div className="bg-white text-black rounded-lg border shadow-md">
          <div className="flex flex-col space-y-1.5 p-6 border-b">
            <h3 className="text-2xl font-semibold">Course Information</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="space-y-2">
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
                      src={thumbnailPreview}
                      className="mx-auto h-full w-full"
                    ></img>
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  )}{" "}
                  <input
                    id="thumbnailInput"
                    {...register("thumbnail", {
                      onChange: handleThumbnailPreview,
                      required: "Thumbnail is required",
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  DemoVideo
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
                      src={demoVideoPreview}
                      controls
                      className="mx-auto "
                    ></video>
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  )}

                  <input
                    id="demoVideoInput"
                    {...register("demoVideos", {
                      required: "DemoVideos is required",
                      onChange: handleDemoVideoChange,
                    })}
                    type="file"
                    className="hidden"
                    accept="video/*"
                  />
                  {errors.thumbnail && (
                    <p className="text-red-500 text-sm">
                      {errors.thumbnail.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save & Continue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreation;
