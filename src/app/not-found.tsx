"use client";

import { useRouter } from "next/navigation";
import { BookX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="p-6 bg-purple-100 rounded-full">
            <BookX className="h-16 w-16 text-purple-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mt-8 text-4xl font-extrabold text-gray-900 tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>

        {/* Navigation Options */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors"
          >
            Go back
          </button>
          <Link href="/">
            <button className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
              Return to home
            </button>
          </Link>
        </div>

        {/* Course Suggestions */}
        <div className="mt-12 pt-10 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Looking for learning resources?
          </h2>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <button className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors">
                Browse Courses
              </button>
            </Link>
            <Link href="/mentors">
              <button className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors">
                Find a Mentor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}