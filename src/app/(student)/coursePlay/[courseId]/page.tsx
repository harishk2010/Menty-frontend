// "use client"
// import React, { useState } from 'react';

// interface Chapter {
//   id: string;
//   title: string;
//   duration: string;
//   isCompleted: boolean;
//   sections: {
//     id: string;
//     title: string;
//     duration: string;
//     isCompleted: boolean;
//     videoUrl?: string;
//   }[];
// }

// const CourseStudyPage = () => {
//   const [activeChapterId, setActiveChapterId] = useState('1');
//   const [activeSectionId, setActiveSectionId] = useState('1.1');
//   const [isChapterListOpen, setIsChapterListOpen] = useState(true);

//   // Sample data - replace with your actual data
//   const chapters: Chapter[] = [
//     {
//       id: '1',
//       title: 'Getting Started with Web Development',
//       duration: '45:00',
//       isCompleted: true,
//       sections: [
//         {
//           id: '1.1',
//           title: 'Introduction to HTML',
//           duration: '15:30',
//           isCompleted: true,
//           videoUrl: '/api/placeholder/640/360'
//         },
//         {
//           id: '1.2',
//           title: 'Basic HTML Tags',
//           duration: '12:45',
//           isCompleted: true,
//           videoUrl: '/api/placeholder/640/360'
//         }
//       ]
//     },
//     {
//       id: '2',
//       title: 'CSS Fundamentals',
//       duration: '55:00',
//       isCompleted: false,
//       sections: [
//         {
//           id: '2.1',
//           title: 'CSS Selectors',
//           duration: '18:20',
//           isCompleted: false,
//           videoUrl: '/api/placeholder/640/360'
//         },
//         {
//           id: '2.2',
//           title: 'Box Model',
//           duration: '20:15',
//           isCompleted: false,
//           videoUrl: '/api/placeholder/640/360'
//         }
//       ]
//     }
//   ];

//   const activeSection = chapters
//     .flatMap(chapter => chapter.sections)
//     .find(section => section.id === activeSectionId);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar with chapters */}
//       <div className={`bg-white w-80 flex-shrink-0 border-r border-gray-200 transition-all duration-300 
//         ${isChapterListOpen ? 'translate-x-0' : '-translate-x-80'}`}>
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
//           <p className="text-sm text-gray-500 mt-1">12 chapters • 3.5 hours</p>
//         </div>
        
//         <div className="overflow-y-auto h-[calc(100vh-5rem)]">
//           {chapters.map(chapter => (
//             <div key={chapter.id} className="border-b border-gray-200">
//               <button
//                 onClick={() => setActiveChapterId(chapter.id)}
//                 className="w-full p-4 text-left hover:bg-gray-50"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     {chapter.isCompleted ? (
//                       <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
//                         <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                     ) : (
//                       <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
//                     )}
//                     <span className="text-sm font-medium text-gray-800">{chapter.title}</span>
//                   </div>
//                   <span className="text-xs text-gray-500">{chapter.duration}</span>
//                 </div>
//               </button>
              
//               {chapter.id === activeChapterId && (
//                 <div className="bg-gray-50">
//                   {chapter.sections.map(section => (
//                     <button
//                       key={section.id}
//                       onClick={() => setActiveSectionId(section.id)}
//                       className={`w-full p-4 pl-12 text-left hover:bg-gray-100 flex items-center justify-between
//                         ${section.id === activeSectionId ? 'bg-blue-50' : ''}`}
//                     >
//                       <div className="flex items-center space-x-3">
//                         {section.isCompleted ? (
//                           <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
//                             <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                           </div>
//                         ) : (
//                           <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
//                         )}
//                         <span className="text-sm text-gray-700">{section.title}</span>
//                       </div>
//                       <span className="text-xs text-gray-500">{section.duration}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top bar */}
//         <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
//           <button
//             onClick={() => setIsChapterListOpen(!isChapterListOpen)}
//             className="p-2 hover:bg-gray-100 rounded-lg"
//           >
//             <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <div className="flex items-center space-x-4">
//             <button className="text-gray-600 hover:text-gray-800">
//               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </button>
//             <button className="text-gray-600 hover:text-gray-800">
//               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Video player area */}
//         <div className="flex-1 overflow-y-auto bg-gray-900">
//           <div className="aspect-w-16 aspect-h-9 bg-black">
//             {activeSection?.videoUrl && (
//               <img 
//                 src={activeSection.videoUrl} 
//                 alt="Video placeholder"
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>
//         </div>

//         {/* Bottom bar with video controls */}
//         <div className="bg-white border-t border-gray-200 p-4">
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800">{activeSection?.title}</h3>
//               <p className="text-sm text-gray-500">Section {activeSectionId}</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 hover:bg-gray-100 rounded-full">
//                 <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-full">
//                 <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseStudyPage;
// "use client"
// import { getPlayCourse } from '@/api/courseApi';
// import { Check, Play,
//   Clock,
//   BarChart,
//   BookOpen,
//   Star,
//   Users,
//   ChevronRight,
//   PlayCircle,
//   Pause,
//   RotateCcw,
//   VolumeOff,
//   FastForward,
//   SkipBack,
//   SkipForward, } from 'lucide-react';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useRef, useState } from 'react';
// import { motion } from "framer-motion";

// interface PurchasedCourse {
//   _id: string;
//   courseId: CourseDetails;
//   userId: string;
//   instructorId: string;
//   transactionId: string;
//   completedChapters: CompletedChapter[]; // Update with actual structure if needed
//   isCourseCompleted: boolean;
//   purchasedAt: string;
//   createdAt: string;
//   updatedAt: string;
// }
// interface CompletedChapter {
//   chapterId: string;
//   isCompleted: boolean;
// }

// interface CourseDetails {
//   _id: string;
//   courseName: string;
//   description: string;
//   category: string;
//   level: string;
//   duration: string;
//   thumbnailUrl: string;
//   fullVideo: { chapterId: string; _id: string }[]; // Assuming it's an array of video URLs
// }

// interface Course {
//   courseName: string;
//   description: string;
//   category: string;
//   level: string;
//   duration: string;
//   thumbnailUrl: string;
// }

// interface Chapter {
//   _id: string;
//   chapterTitle: string;
//   courseId: string;
//   description: string;
//   videoUrl: string;
//   createdAt: string;
// }

// interface CourseResponse {
//   purchasedCourse: PurchasedCourse;
//   course: Course;
//   chapters: Chapter[];
// }

// const CourseStudyPage = () => {

//   const {courseId}=useParams<{courseId:string}>()
//     const [course, setCourse] = useState<CourseResponse>();
  
//   const [activeChapterId, setActiveChapterId] = useState('1');
//   const [activeChapter, setActiveChapter] = useState<Chapter>();
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//    const [isPlaying, setIsPlaying] = useState<boolean>(false);
//     const [showControls, setShowControls] = useState<boolean>(true);
//     const [currentTime, setCurrentTime] = useState<number>(0);
//     const MainVideo = useRef<HTMLVideoElement | null>(null);
//     const [muted, setMuted] = useState(false);
//     const [progress, setProgress] = useState(0);
  
//     const handlePlayPause = () => {
//       try {
//         if (MainVideo.current) {
//           isPlaying ? MainVideo.current?.pause() : MainVideo.current?.play();
//           setIsPlaying(!isPlaying);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     const toggleMute = () => {
//       if (!MainVideo.current) return;
//       MainVideo.current.muted = !muted;
//       setMuted(!muted);
//     };
  
//     // Restart video
//     const restartVideo = () => {
//       if (!MainVideo.current) return;
//       MainVideo.current.currentTime = 0;
//     };
//     const forwardTenSec = () => {
//       if (!MainVideo.current) return;
//       MainVideo.current.currentTime += 10;
//     };
//     const backwardTenSec = () => {
//       if (!MainVideo.current) return;
//       MainVideo.current.currentTime -= 10;
//     };

//    useEffect(() => {
//       try {
//         const fetchCourse = async () => {
//           const response = await getPlayCourse(courseId);
//           setCourse(response.data || {});
//         };
//         fetchCourse();
//       } catch (error) {
//         console.log(error);
//       }
//     }, []);

//     console.log(course,"fetched")

 


//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className={`${isMenuOpen ? 'w-72' : 'w-0 lg:w-16'} h-full bg-white text-black shadow transition-all duration-300`}>
//         <div className="p-4 border-b flex justify-between items-center">
//           {isMenuOpen && <h2 className="font-bold">Contents</h2>}
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-gray-100 rounded">
//             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h14v2H3v-2z"/>
//             </svg>
//           </button>
//         </div>
        
//         {isMenuOpen && (
//           <nav className="overflow-y-auto h-[calc(100vh-4rem)]">
//             {course?.chapters.map(chapter => (
//               <div className={`flex justify-between p-3 items-center ${
//                 chapter._id === activeChapterId ? 'bg-purple-50 border-l-2 border-purple-500' : ''
//               }`} key={chapter._id}>
//                 <div 
//                   className={`p-3 pl-6 cursor-pointer text-sm `}
//                   onClick={() => {
//                     setActiveChapter(chapter)
//                     setActiveChapterId(chapter._id)
                  
//                   }}
//                 >
//                   {chapter.chapterTitle}
//                 </div>
//                 <div>
//                   <Check className='text-sm size-5 p-1 bg-purple-500 text-white rounded-full'/>
//                 </div>
                
//               </div>
//             ))}
//           </nav>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100">
//         <div className="relative h-[60vh] bg-black">
//           <video 
//             src={activeChapter?.videoUrl  } 
//             poster={course?.course.thumbnailUrl}
//             ref={MainVideo}
//             onContextMenu={(e) => e.preventDefault()}
            
//             controls
//             className="w-full relative h-full object-cover"
//           />
        
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
//           {showControls && (
               
//                 <motion.div 
//                 initial={{y:20,opacity:0}}
//                 animate={{y:0,opacity:100}}
//                 transition={{ease:"easeInOut" ,duration:.3}}
//                 className="  flex space-x-1 justify-center items-center">
//                   <button
//                     onClick={restartVideo}
//                     className=" transparent hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-1 "
//                   >
//                     <RotateCcw/>
//                   </button>
//                   <button
//                     onClick={backwardTenSec}
//                     className=" bg-purple-400 hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-2 "
//                   >
//                     <SkipBack/>
//                   </button>
//                   <button
//                     onClick={handlePlayPause}
//                     className=" bg-purple-400 hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-3 "
//                   >
//                     {" "}
//                     {isPlaying ? <Pause /> : <Play />}
//                   </button>
//                   <button
//                     onClick={forwardTenSec}
//                     className=" bg-purple-400 hover:bg-purple-500 transition ease-in-out duration-400 rounded-full p-2 "
//                   >
//                     <SkipForward/>
//                   </button>
                  
//                   <button
//                     onClick={toggleMute}
//                     className=" transparent hover:bg-purple-500 rounded-full p-1 "
//                   >
//                     <VolumeOff/>
//                   </button>
//                   <span className="">{Math.floor(currentTime)}</span>
                  
                    
                  
//                 </motion.div>
                
                      
//               )}
            
//             <div className="w-full bg-white/30 h-1 rounded mb-3">
//               <div className="bg-blue-500 h-full w-1/3 rounded"/>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>{activeChapter?.chapterTitle}</span>
//               <span>{activeChapter?.createdAt}</span>
//             </div>
//           </div>
//         </div>
//         {/* Bottom bar with video controls */}
//          <div className="bg-white border-t border-gray-200 p-4">
//            <div className="flex justify-between items-center">
//              <div>
//                <h3 className="text-lg font-semibold text-gray-800">{activeChapter?.chapterTitle}</h3>
//                <p className="text-sm text-gray-500">Section {activeChapterId}</p>
//              </div>
//              <div className="flex items-center space-x-4">
//                <button className="p-2 hover:bg-gray-100 rounded-full">
//                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                  </svg>
//                </button>
//                <button className="p-2 hover:bg-gray-100 rounded-full">
//                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                  </svg>
//                </button>
//              </div>
//            </div>
//          </div>
//       </main>
//     </div>
//   );
// };

// export default CourseStudyPage;
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { getPlayCourse } from '@/api/courseApi';
import { 
  Check, Play, Clock, BarChart, BookOpen, Star, Users,
  ChevronRight, PlayCircle, Pause, RotateCcw, VolumeOff,
  FastForward, SkipBack, SkipForward, Volume2 
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { motion } from "framer-motion";

// Your existing interfaces remain the same
interface PurchasedCourse {
  _id: string;
  courseId: CourseDetails;
  userId: string;
  instructorId: string;
  transactionId: string;
  completedChapters: CompletedChapter[]; // Update with actual structure if needed
  isCourseCompleted: boolean;
  purchasedAt: string;
  createdAt: string;
  updatedAt: string;
}
interface CompletedChapter {
  chapterId: string;
  isCompleted: boolean;
}

interface CourseDetails {
  _id: string;
  courseName: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  thumbnailUrl: string;
  fullVideo: { chapterId: string; _id: string }[]; // Assuming it's an array of video URLs
}

interface Course {
  courseName: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  thumbnailUrl: string;
}

interface Chapter {
  _id: string;
  chapterTitle: string;
  courseId: string;
  description: string;
  videoUrl: string;
  createdAt: string;
}

interface CourseResponse {
  purchasedCourse: PurchasedCourse;
  course: Course;
  chapters: Chapter[];
}
const CourseStudyPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseResponse>();
  const [activeChapter, setActiveChapter] = useState<Chapter>();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const MainVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getPlayCourse(courseId);
        setCourse(response.data);
        // Set initial active chapter to first chapter
        if (response.data?.chapters?.length > 0) {
          setActiveChapter(response.data.chapters[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, [courseId]);

  // Video control functions
  const handlePlayPause = () => {
    if (MainVideo.current) {
      if (isPlaying) {
        MainVideo.current.pause();
      } else {
        MainVideo.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (MainVideo.current) {
      MainVideo.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const restartVideo = () => {
    if (MainVideo.current) {
      MainVideo.current.currentTime = 0;
    }
  };

  const skipTime = (seconds: number) => {
    if (MainVideo.current) {
      MainVideo.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Video event handlers
  const handleTimeUpdate = () => {
    if (MainVideo.current) {
      setCurrentTime(MainVideo.current.currentTime);
      setProgress((MainVideo.current.currentTime / MainVideo.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (MainVideo.current) {
      setDuration(MainVideo.current.duration);
    }
  };

  // Handle chapter change
  const handleChapterChange = (chapter: Chapter) => {
    setActiveChapter(chapter);
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);
    if (MainVideo.current) {
      MainVideo.current.currentTime = 0;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - Your existing sidebar code remains the same */}
      <aside className={`${isMenuOpen ? 'w-72' : 'w-0 lg:w-16'} h-full bg-white text-black shadow transition-all duration-300`}>
        <div className="p-4 border-b flex justify-between items-center">
          {isMenuOpen && <h2 className="font-bold">Contents</h2>}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h14v2H3v-2z"/>
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <nav className="overflow-y-auto h-[calc(100vh-4rem)]">
            {course?.chapters.map(chapter => (
              <div 
                key={chapter._id}
                className={`flex justify-between p-3 items-center cursor-pointer hover:bg-purple-50 ${
                  chapter._id === activeChapter?._id ? 'bg-purple-50 border-l-2 border-purple-500' : ''
                }`}
                onClick={() => handleChapterChange(chapter)}
              >
                <div className="p-3 pl-6 text-sm">
                  {chapter.chapterTitle}
                </div>
                <div>
                  <Check className="text-sm size-5 p-1 bg-purple-500 text-white rounded-full"/>
                </div>
              </div>
            ))}
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <div className="relative h-[60vh] bg-black group">
          <video 
            ref={MainVideo}
            src={activeChapter?.videoUrl}
            poster={course?.course.thumbnailUrl}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onContextMenu={(e) => e.preventDefault()}
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress bar */}
              <div className="w-full bg-white/30 h-1 rounded mb-4 cursor-pointer"
                onClick={(e) => {
                  if (MainVideo.current) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percent = x / rect.width;
                    MainVideo.current.currentTime = percent * duration;
                  }
                }}
              >
                <div 
                  className="bg-purple-500 h-full rounded transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={restartVideo}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    <RotateCcw size={20} />
                  </button>
                  <button
                    onClick={() => skipTime(-10)}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    <SkipBack size={20} />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="p-3 bg-purple-500 hover:bg-purple-600 rounded-full transition"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button
                    onClick={() => skipTime(10)}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    <SkipForward size={20} />
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    {muted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
                  </button>
                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="text-sm">
                  <span className="font-medium">{activeChapter?.chapterTitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom chapter navigation */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{activeChapter?.chapterTitle}</h3>
              <p className="text-sm text-gray-500">
                Chapter {course?.chapters.findIndex(ch => ch._id === activeChapter?._id) ?? 0 + 1} of {course?.chapters.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                disabled={!course?.chapters[0] || activeChapter?._id === course?.chapters[0]._id}
                onClick={() => {
                  const currentIndex = course?.chapters.findIndex(ch => ch._id === activeChapter?._id) ?? 0;
                  if (currentIndex > 0) {
                    handleChapterChange(course!.chapters[currentIndex - 1]);
                  }
                }}
              >
                <ChevronRight className="w-6 h-6 text-gray-600 rotate-180" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                disabled={!course?.chapters || activeChapter?._id === course?.chapters[course.chapters.length - 1]._id}
                onClick={() => {
                  const currentIndex = course?.chapters.findIndex(ch => ch._id === activeChapter?._id) ?? 0;
                  if (currentIndex < (course?.chapters.length ?? 0) - 1) {
                    handleChapterChange(course!.chapters[currentIndex + 1]);
                  }
                }}
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray border-t border-gray-200 p-4">
            {/* <h1 className='text-black max-w-4xl mx-auto flex justify-between items-center'>Des:</h1> */}
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <p className='text-black'>
              {activeChapter?.description}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseStudyPage;