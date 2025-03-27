import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface Chapter {
  _id: string;
  chapterTitle: string;
  description: string;
  courseId: string;
}

const ExpandableChapters: React.FC<{ chapters: Chapter[] }> = ({ chapters }) => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter(prevExpanded => 
      prevExpanded === chapterId ? null : chapterId
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl text-black font-bold mb-4">
        What You'll Learn
      </h3>
      {chapters.map((chapter) => (
        <div key={chapter._id} className="mb-2">
          <div 
            onClick={() => toggleChapter(chapter._id)}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
          >
            {expandedChapter === chapter._id ? (
              <ChevronDown className="h-4 w-4 text-green-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-green-600" />
            )}
            <p className="text-gray-700 font-medium">{chapter.chapterTitle}</p>
          </div>
          <AnimatePresence>
            {expandedChapter === chapter._id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 text-sm ml-8 mt-2 p-2 bg-gray-50 rounded-md">
                  {chapter.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

export default ExpandableChapters;