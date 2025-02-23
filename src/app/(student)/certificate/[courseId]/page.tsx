"use client";

import { getBoughtCourse, getCourse } from "@/api/courseApi";
import { getStudentData } from "@/api/studentApi";
import CertificatePage from "@/app/components/students/CertificateGenerator";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface CourseDetails {
    _id: string;
    courseName: string;
    level: string;
    thumbnailUrl: string;
    quizId: string;
  }
  
interface Course {
  _id: string;
  courseDetails: CourseDetails;
  userId: string;
  instructorId: string;
  transactionId: string;
  completedChapters: Array<{
    isCompleted: boolean;
    chapterId: string;
  }>;
  isCourseCompleted: boolean;
  purchasedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface Student{
    username:string
}

const Page = () => {
  const { courseId } = useParams() as { courseId: string };
  const userEmail = useSelector((state: RootState) => state.user.email) ?? "Guest";
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getBoughtCourse(courseId);
        const studentDetails=await getStudentData(userEmail)
        setCourseData(response);
        setStudent(studentDetails)
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  return courseData && student ? (
    <CertificatePage course={courseData} studentName={student.username} />
  ) : (
    <p>Loading...</p>
  );
};

export default Page;
