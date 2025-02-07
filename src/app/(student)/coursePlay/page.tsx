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
"use client"
import React, { useState } from 'react';

const CourseStudyPage = () => {
  const [activeChapterId, setActiveChapterId] = useState('1');
  const [activeSectionId, setActiveSectionId] = useState('1.1');
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const chapters = [
    {
      id: '1',
      title: 'Web Development Basics',
      sections: [
        { id: '1.1', title: 'HTML Fundamentals', duration: '15:30', videoUrl: '/api/placeholder/640/360' },
        { id: '1.2', title: 'CSS Basics', duration: '12:45', videoUrl: '/api/placeholder/640/360' }
      ]
    },
    {
      id: '2',
      title: 'JavaScript Essentials',
      sections: [
        { id: '2.1', title: 'JS Introduction', duration: '18:20', videoUrl: '/api/placeholder/640/360' },
        { id: '2.2', title: 'DOM Manipulation', duration: '20:15', videoUrl: '/api/placeholder/640/360' }
      ]
    }
  ];

  const activeSection = chapters.flatMap(c => c.sections).find(s => s.id === activeSectionId);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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
            {chapters.map(chapter => (
              <div key={chapter.id}>
                <div 
                  className="p-3 hover:bg-gray-50 cursor-pointer font-medium"
                  onClick={() => setActiveChapterId(chapter.id)}
                >
                  {chapter.title}
                </div>
                {chapter.id === activeChapterId && (
                  <div className="bg-gray-50">
                    {chapter.sections.map(section => (
                      <div
                        key={section.id}
                        onClick={() => setActiveSectionId(section.id)}
                        className={`p-3 pl-6 cursor-pointer text-sm ${
                          section.id === activeSectionId ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                        }`}
                      >
                        <div>{section.title}</div>
                        <div className="text-xs text-gray-500">{section.duration}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <div className="relative h-[60vh] bg-black">
          <img 
            src={activeSection?.videoUrl} 
            alt="Video content" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
            <div className="w-full bg-white/30 h-1 rounded mb-3">
              <div className="bg-blue-500 h-full w-1/3 rounded"/>
            </div>
            <div className="flex justify-between text-white">
              <span>{activeSection?.title}</span>
              <span>{activeSection?.duration}</span>
            </div>
          </div>
        </div>
        {/* Bottom bar with video controls */}
         <div className="bg-white border-t border-gray-200 p-4">
           <div className="flex justify-between items-center">
             <div>
               <h3 className="text-lg font-semibold text-gray-800">{activeSection?.title}</h3>
               <p className="text-sm text-gray-500">Section {activeSectionId}</p>
             </div>
             <div className="flex items-center space-x-4">
               <button className="p-2 hover:bg-gray-100 rounded-full">
                 <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 </svg>
               </button>
               <button className="p-2 hover:bg-gray-100 rounded-full">
                 <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </button>
             </div>
           </div>
         </div>
      </main>
    </div>
  );
};

export default CourseStudyPage;