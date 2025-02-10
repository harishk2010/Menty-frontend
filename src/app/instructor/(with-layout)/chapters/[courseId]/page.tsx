"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllChapter, getAllCourses, handlePublish } from "@/api/courseApi";
import { toast } from "react-toastify";
import AlertDialog2 from "@/app/components/common/alertBoxes/AlertDialogBox2";
import { useParams } from "next/navigation";
import { tr } from "framer-motion/client";

interface IChapters {
  _id?: string;
  chapterTitle: string;
  description: string;
  videoUrl: string;
}

const InstructorChapterTable = () => {
  // Sample data - replace with your actual data fetching logic
  const { courseId } = useParams<{ courseId: string }>();
  const [chapters, setChapters] = useState<IChapters[]>([]);

  useEffect(() => {
    try {
      const fetchChapters = async () => {
        const response = await getAllChapter(courseId);
        setChapters(response.data || []);
      };
      fetchChapters();
    } catch (error) {}
  }, []);

  // const togglePublish = async (id: string) => {
  //   try {
  //     const response = await handlePublish(id);
  //     if (response.success) {
  //       toast.success(response.message);
  //       setChapters((prevCourses: IChapters[]) =>
  //         prevCourses.map((course: IChapters) => {}
  //           // course._id == id? { ...course, isPublished: course.isPublished! }  : course
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Chapters</h1>
        {}
        <Link href={`/instructor/addChapters/${courseId}`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add New Chapter
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Video
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              chapters.length==0?(
              <tr className="w-full"><td className="text-black ">
                No Chapters</td></tr>
              ):(
                chapters.map((chapter) => (
                  <tr
                    key={chapter.chapterTitle}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 w-10 h-10">
                        <video autoPlay muted  onContextMenu={(e) => e.preventDefault()} className="" src={chapter.videoUrl}></video>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {chapter.chapterTitle}
                      </div>
                    </td>
    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {chapter.description}
                      </div>
                    </td>
                   
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/instructor/editChapter/${chapter._id}`}>
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorChapterTable;
