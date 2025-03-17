"use client";
import { getRequestData } from "@/api/verificationApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Award, UserCircle, Mail } from "lucide-react";

interface InstructorData {
  username: string;
  email: string;
  resumeUrl: string;
  degreeCertificateUrl: string;
}

export default function InstructorDocumentsPage() {
  const { email } = useParams<{ email: string }>();
  const [data, setData] = useState<InstructorData>({ 
    username: "", 
    resumeUrl: "", 
    degreeCertificateUrl: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (email) {
          const response = await getRequestData(email);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [email]);

  return (
    <div className="bg-gray-900 text-gray-100 p-6 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6"
      >
        {/* Header Card */}
        <div className="bg-gray-800 px-6 py-5 rounded-lg shadow-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <UserCircle className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-semibold text-indigo-300">Instructor Documents</h1>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-400">Loading instructor data...</p>
            </div>
          ) : (
            <div className="p-6">
              {/* Instructor Information */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCircle className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-sm font-medium text-gray-400">Name</h2>
                  </div>
                  <p className="text-lg text-white pl-7">{data.username}</p>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-sm font-medium text-gray-400">Email</h2>
                  </div>
                  <p className="text-lg text-white pl-7">{data.email}</p>
                </div>
              </div>

              {/* Documents Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-indigo-300 mb-6">Verification Documents</h2>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  {/* Resume */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-sm font-medium text-gray-400">Resume</h2>
                    </div>
                    <div className="relative group">
                      <div
                        className="h-72 w-full rounded-lg border border-gray-700 bg-cover bg-center transition-all duration-300 group-hover:border-indigo-500"
                        style={{ backgroundImage: `url(${data.resumeUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gray-800/80 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-all duration-300">
                        <a 
                          href={data.resumeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                        >
                          View Full Size
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Degree Certificate */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-sm font-medium text-gray-400">Degree Certificate</h2>
                    </div>
                    <div className="relative group">
                      <div
                        className="h-72 w-full rounded-lg border border-gray-700 bg-cover bg-center transition-all duration-300 group-hover:border-indigo-500"
                        style={{ backgroundImage: `url(${data.degreeCertificateUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gray-800/80 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-all duration-300">
                        <a 
                          href={data.degreeCertificateUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                        >
                          View Full Size
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}