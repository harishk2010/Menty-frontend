"use client"

import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  BarChart, 
  BookOpen, 
  Star, 
  Users, 
  ChevronRight, 
  PlayCircle 
} from 'lucide-react';

// Mock course data - would be replaced with actual API data
const mockCourse = {
  id: 'course123',
  title: 'Complete React Developer Bootcamp',
  instructor: 'John Smith',
  rating: 4.7,
  totalReviews: 1245,
  students: 15420,
  level: 'Intermediate',
  description: 'Master React from scratch with this comprehensive course covering modern web development techniques, state management, and advanced component design.',
  price: 49.99,
  totalHours: 32,
  chapters: [
    { 
      id: 'ch1', 
      title: 'React Fundamentals', 
      duration: '2h 45m', 
      isPreview: true,
      description: 'Learn the core concepts of React and build your first application'
    },
    { 
      id: 'ch2', 
      title: 'State Management with Redux', 
      duration: '3h 15m', 
      isPreview: false,
      description: 'Deep dive into advanced state management techniques'
    },
    { 
      id: 'ch3', 
      title: 'Hooks and Performance Optimization', 
      duration: '2h 30m', 
      isPreview: false,
      description: 'Optimize your React applications using modern hooks'
    }
  ],
  requirements: [
    'Basic JavaScript knowledge',
    'HTML and CSS understanding',
    'Computer with Node.js installed'
  ],
  learningOutcomes: [
    'Build complex React applications',
    'Understand state management',
    'Create responsive web designs',
    'Implement advanced React patterns'
  ]
};

const CourseDetails: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
        fill={index < Math.floor(rating) ? '#FFD700' : 'none'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Course Overview */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {mockCourse.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(mockCourse.rating)}
                  <span className="text-gray-600 ml-2">
                    {mockCourse.rating} ({mockCourse.totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span>{mockCourse.students} Students</span>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                {['overview', 'curriculum', 'reviews'].map((section) => (
                  <button
                    key={section}
                    className={`capitalize px-4 py-2 rounded-lg ${
                      activeSection === section 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveSection(section as any)}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {activeSection === 'overview' && (
                <div>
                  <p className="text-gray-700 mb-6">{mockCourse.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                      <Clock className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Total Duration</h4>
                        <p>{mockCourse.totalHours} Hours</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                      <BarChart className="h-8 w-8 text-green-600" />
                      <div>
                        <h4 className="font-semibold">Skill Level</h4>
                        <p>{mockCourse.level}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'curriculum' && (
                <div>
                  {mockCourse.chapters.map((chapter, index) => (
                    <div 
                      key={chapter.id} 
                      className="border-b py-4 hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => setSelectedChapter(chapter.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              Chapter {index + 1}: {chapter.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {chapter.duration} • {chapter.description}
                            </p>
                          </div>
                        </div>
                        {chapter.isPreview && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Preview
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Course Purchase & Instructor */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">${mockCourse.price}</h2>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Enroll Now
                </button>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 mb-2">Course Requirements</h3>
                {mockCourse.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-blue-600" />
                    <p className="text-gray-600">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl text-black font-bold mb-4">What You'll Learn</h3>
              {mockCourse.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <ChevronRight className="h-4 w-4 text-green-600" />
                  <p className="text-gray-700">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;