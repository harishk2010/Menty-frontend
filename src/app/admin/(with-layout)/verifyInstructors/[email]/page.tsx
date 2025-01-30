"use client";

import { getRequestData } from "@/api/verificationApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InstructorDocumentsPage() {
  const { email } = useParams<{ email: string }>();
  const [data, setData] = useState({ username: "", resumeUrl: "", degreeCertificateUrl: "" ,email:"" });

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        const response = await getRequestData(email);
        setData(response.data);
      }
    };
    fetchData();
  }, [email]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="rounded-lg bg-gray-900 p-6 text-white">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-left text-sm font-medium text-gray-400">Name</h2>
            <p className="mt-1 text-lg">{data.username}</p>
          </div>
          <div>
            <h2 className="text-left text-sm font-medium text-gray-400">Email</h2>
            <p className="mt-1 text-lg">{data.email}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-sm font-medium text-gray-400">Resume</h2>
            <div
              className="h-64 w-64 rounded-lg border border-gray-700 bg-cover"
              style={{ backgroundImage: `url(${data.resumeUrl})` }}
              title="Resume Preview"
            />
          </div>
          <div>
            <h2 className="mb-4 text-sm font-medium text-gray-400">Degree Certificate</h2>
            <div
              className="h-64 w-64 rounded-lg border border-gray-700 bg-cover"
              style={{ backgroundImage: `url(${data.degreeCertificateUrl})` }}
              title="Degree Certificate Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}