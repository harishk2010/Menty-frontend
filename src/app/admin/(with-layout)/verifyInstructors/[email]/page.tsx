"use client";

import { getRequestData } from "@/api/verificationApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InstructorDocumentsPage() {
  const { email } = useParams<{email:string}>();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (email) {
      const fetch = async () => {
        const fetchedData = await getRequestData(email);
        console.log(fetchedData)
        setData(fetchedData.data);
      };
      fetch();
    }
  }, [email]);

  console.log(email);
  return (
    <div className=" h-screen px-4 py-2 rounded-md bg-">
      <div className="grid sm:grid-cols-2 rounded-md grid-cols-1 bg-gray-900 text-center gap-2">
        <div className="p-3">
          <h1 className="text-start">Name :</h1>
          <h1>{data?.username}</h1>
        </div>
        <div className="p-3">
          <h1 className="text-start">Email:</h1>
          <h1>{email}</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">

       
        <div className="mt-2">
                  <p className="text-sm text-gray-600">Resume:</p>
                  <div
                    style={{
                        backgroundImage: `url(${data.resumeUrl})`,
                      }}
                    className="w-64 h-64 bg-cover border rounded-lg"
                    title="Degree Certificate Preview"
                  />
                </div>
        <div className="mt-2">
                  <p className="text-sm text-gray-600">Degree Certificate:</p>
                  <div
                    style={{
                        backgroundImage: `url(${data.degreeCertificateUrl})`,
                      }}
                    className="w-64 h-64 bg-cover border rounded-lg"
                    title="Degree Certificate Preview"
                  />
                </div>
                </div>
      </div>
    </div>
  );
}
