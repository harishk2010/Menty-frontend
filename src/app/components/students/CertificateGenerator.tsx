"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Award, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

// Types
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

interface PageProps {
  course: Course;
  studentName: string;
}

const CertificatePage: React.FC<PageProps> = ({ course, studentName }) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const router = useRouter();
  const currentDate: string = format(new Date(), 'MMMM dd, yyyy');

  const generatePDF = async (): Promise<void> => {
    setIsGenerating(true);
    try {
      // Create PDF with specific dimensions
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4'
      });

      // Set font styles
      pdf.setFont('Helvetica');
      
      // Add decorative border
      pdf.setLineWidth(2);
      pdf.setDrawColor(59, 130, 246); // blue-600
      pdf.rect(20, 20, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 40);
      
      // Add certificate title
      pdf.setFontSize(40);
      pdf.setTextColor(30, 58, 138); // blue-900
      pdf.text('Certificate of Achievement', pdf.internal.pageSize.width / 2, 80, { align: 'center' });
      
      // Add "This is to certify that" text
      pdf.setFontSize(20);
      pdf.setTextColor(75, 85, 99); // gray-600
      pdf.text('This is to certify that', pdf.internal.pageSize.width / 2, 120, { align: 'center' });
      
      // Add student name
      pdf.setFontSize(32);
      pdf.setTextColor(30, 58, 138); // blue-900
      pdf.text(studentName, pdf.internal.pageSize.width / 2, 160, { align: 'center' });
      
      // Add course completion text
      pdf.setFontSize(20);
      pdf.setTextColor(75, 85, 99); // gray-600
      pdf.text('has successfully completed the course', pdf.internal.pageSize.width / 2, 200, { align: 'center' });
      
      // Add course name
      pdf.setFontSize(28);
      pdf.setTextColor(30, 58, 138); // blue-900
      pdf.text(course.courseDetails.courseName, pdf.internal.pageSize.width / 2, 240, { align: 'center' });
      
      // Add completion date
      pdf.setFontSize(16);
      pdf.setTextColor(75, 85, 99); // gray-600
      pdf.text(`Completed on ${currentDate}`, pdf.internal.pageSize.width / 2, 280, { align: 'center' });
      
      // Add signatures
      pdf.setLineWidth(0.5);
      pdf.line(150, 350, 300, 350); // Instructor signature line
      pdf.line(450, 350, 600, 350); // Director signature line
      
      pdf.setFontSize(14);
      pdf.text('Course Instructor', 225, 370, { align: 'center' });
      pdf.text('Platform Director', 525, 370, { align: 'center' });
      
      // Add certificate ID at the bottom
      pdf.setFontSize(12);
      pdf.setTextColor(107, 114, 128); // gray-500
      pdf.text(`Certificate ID: ${course.courseDetails._id}`, 40, pdf.internal.pageSize.height - 30);

      // Save the PDF
      pdf.save(`${course.courseDetails.courseName}-Certificate.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Course
        </button>
      </div>

      {/* Certificate Preview */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-[1000px] h-[700px] bg-white relative p-12 shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-blue-600" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-blue-600" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-blue-600" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-blue-600" />
          
          {/* Certificate Content */}
          <div className="flex flex-col items-center text-center h-full">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-16 h-16 text-blue-600 mr-4" />
                <h1 className="text-5xl font-serif text-blue-900">Certificate of Achievement</h1>
              </div>
              <p className="text-gray-600 text-xl italic">This is to certify that</p>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl font-bold text-blue-800 mb-2">{studentName}</h2>
              <div className="w-96 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto" />
            </div>

            <div className="mb-12 space-y-4">
              <p className="text-xl text-gray-600">has successfully completed the course</p>
              <h3 className="text-3xl font-bold text-blue-900">{course.courseDetails.courseName}</h3>
              <p className="text-lg text-gray-600">with all requirements and assessments</p>
            </div>

            <div className="flex justify-between w-full mt-auto">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600 mb-1">Completion Date</p>
                <p className="font-semibold text-blue-900">{currentDate}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-48 border-t-2 border-gray-400" />
                <p className="text-gray-600 mt-2">Course Instructor</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-48 border-t-2 border-gray-400" />
                <p className="text-gray-600 mt-2">Platform Director</p>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 text-sm text-gray-500">
              Certificate ID: {course.courseDetails._id||"67b6009ea6393c92a6a79239"}
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="mt-8 flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   transition-all transform hover:scale-105 disabled:bg-blue-400 disabled:scale-100
                   shadow-lg hover:shadow-xl"
        >
          <Download className="w-6 h-6" />
          <span className="text-lg font-semibold">
            {isGenerating ? 'Generating Certificate...' : 'Download Certificate'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CertificatePage;