

"use client"
import React, { useEffect, useRef, useState } from 'react';
import { chapterCompleted, getPlayCourse } from '@/api/courseApi';
import { 
  Check, Play, Clock, BarChart, BookOpen, Star, Users,
  ChevronRight, PlayCircle, Pause, RotateCcw, VolumeOff,
  FastForward, SkipBack, SkipForward, Volume2 
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

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
  captionsUrl: string;
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
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const MainVideo = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout | null>(null);

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

  // Add effect to handle captions whenever the active chapter changes or caption state changes
  useEffect(() => {
    // Short delay to ensure video and tracks are loaded
    const timer = setTimeout(() => {
      if (MainVideo.current && MainVideo.current.textTracks.length > 0) {
        // Force display mode based on captionsEnabled state
        for (let i = 0; i < MainVideo.current.textTracks.length; i++) {
          MainVideo.current.textTracks[i].mode = captionsEnabled ? 'showing' : 'hidden';
        }
      }
    }, 500); // Increased delay to ensure tracks are fully loaded
    
    return () => clearTimeout(timer);
  }, [activeChapter, captionsEnabled]);

  // Ensure captions are properly loaded when video source changes
  useEffect(() => {
    if (MainVideo.current) {
      // Reset video when changing chapters to ensure captions load properly
      MainVideo.current.load();
    }
  }, [activeChapter]);

  // Handle mouse movement to show/hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    
    // Clear any existing timer
    if (controlsTimer) {
      clearTimeout(controlsTimer);
    }
    
    // Set a new timer to hide controls after 3 seconds of inactivity
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    
    setControlsTimer(timer);
  };

  // Clear timer on component unmount
  useEffect(() => {
    return () => {
      if (controlsTimer) {
        clearTimeout(controlsTimer);
      }
    };
  }, [controlsTimer]);

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
  
  const handleChapterCompletion = async(chapterId: string) => {
    try {
      const response = await chapterCompleted(chapterId);
      if (response.success) {
        toast.success(response.message);
        setCourse((prevCourse) => {
          if (!prevCourse) return prevCourse; // Handle case when prevCourse is undefined
        
          return {
            ...prevCourse,
            purchasedCourse: {
              ...prevCourse.purchasedCourse,
              completedChapters: prevCourse.purchasedCourse.completedChapters.map(ch =>
                ch.chapterId === chapterId ? { ...ch, isCompleted: !ch.isCompleted } : ch
              )
            }
          };
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  
  const toggleMute = () => {
    if (MainVideo.current) {
      MainVideo.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const toggleCaptions = () => {
    setCaptionsEnabled(!captionsEnabled);
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
      
      // Ensure captions are applied when metadata is loaded
      if (MainVideo.current.textTracks.length > 0) {
        for (let i = 0; i < MainVideo.current.textTracks.length; i++) {
          MainVideo.current.textTracks[i].mode = captionsEnabled ? 'showing' : 'hidden';
        }
      }
    }
  };

  // Handle chapter change
  const handleChapterChange = (chapter: Chapter) => {
    const index = course?.chapters.findIndex(ch => ch._id === chapter._id);
    if (index === undefined || index < 0) return; // Prevent errors if chapter is not found
    
    const completedIndex = course?.purchasedCourse.completedChapters.findIndex(ch => ch.chapterId === chapter._id);
    
    if (completedIndex === undefined || completedIndex < 0) return;

    const currentChapter = course?.purchasedCourse?.completedChapters[currentChapterIndex];
    const clickedChapter = course?.purchasedCourse?.completedChapters.find(ch => ch.chapterId === chapter._id);

    if (
        index === currentChapterIndex || // Allow replaying the current chapter.
        clickedChapter?.isCompleted || // Allow access to completed chapters.
        (index === currentChapterIndex + 1 && currentChapter?.isCompleted) // Allow next chapter if current one is completed.
    ) {
        setCurrentChapterIndex(index);
        setActiveChapter(chapter);
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
        if (MainVideo.current) {
            MainVideo.current.currentTime = 0;
        }
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
            {course?.chapters.map((chapter, index) => {
              const isChapterCompleted = course.purchasedCourse.completedChapters.find(
                (ch) => ch.chapterId === chapter._id
              );
            
              return (
                <div 
                  key={chapter._id}
                  className={`flex justify-between p-3 items-center cursor-pointer hover:bg-purple-50 ${
                    chapter._id === activeChapter?._id ? 'bg-purple-50 border-l-2 border-purple-500' : ''
                  }`}
                  onClick={() => {
                    handleChapterChange(chapter);
                    setCurrentChapterIndex(index);
                  }}
                >
                  <div className="p-3 pl-6 text-sm">
                    {chapter.chapterTitle}
                  </div>
                  <div>
                    <Check className={`text-sm size-5 p-1 ${isChapterCompleted?.isCompleted ? "bg-green-500" : "bg-purple-500"}  text-white rounded-full`}/>
                  </div>
                </div>
              );
            })}
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <div 
          ref={videoContainerRef}
          className="relative h-[60vh] bg-black group"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Video container with styled captions area */}
          <div className="relative w-full h-full">
            <video 
              ref={MainVideo}
              src={activeChapter?.videoUrl}
              poster={course?.course.thumbnailUrl}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              crossOrigin='anonymous'
              onClick={handlePlayPause}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onContextMenu={(e) => e.preventDefault()}
              onEnded={() => handleChapterCompletion(activeChapter?._id || "")}
            >
              {activeChapter?.captionsUrl && (
                <track
                  src={activeChapter.captionsUrl}
                  kind="subtitles"
                  label="English"
                  srcLang="en"
                  className='pb-2 absolute bg-green-400'
                  default
                />
              )}
            </video>
            
           
            {/* <div 
              className={`absolute bottom-24 left-0 right-0 text-center z-20 ${captionsEnabled ? 'block' : 'hidden'}`}
            >
              <div className="bg-black/70 text-white inline-block px-4 py-2 rounded text-lg font-semibold mx-auto">
               
              </div>
            </div> */}
          </div>
          
          
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 z-10 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
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
                    onClick={toggleCaptions}
                    className={`p-2 ${captionsEnabled ? 'bg-purple-500/60' : 'hover:bg-white/20'} rounded-full transition`}
                  >
                    CC
                  </button>
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
                Chapter {(course?.chapters.findIndex(ch => ch._id === activeChapter?._id) ?? 0) + 1} of {course?.chapters.length}
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