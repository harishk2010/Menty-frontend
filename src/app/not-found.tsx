"use client";

import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="font-serif bg-black text-center w-full h-screen flex justify-center items-center">
      <div>
        <h1 className="text-white">
          <b>404</b> - Page Not Found
        </h1>
        <p>The page you are looking for does not exist or has been moved.</p>

        {router && (
          <a onClick={() => router.back()} className="cursor-pointer text-blue-500 underline">
            Go back Previous Page
          </a>
        )}
      </div>
    </div>
  );
}
