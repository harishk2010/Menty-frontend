"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AlertCircle } from 'lucide-react';
import { getQuizData, submitResult } from '@/api/courseApi';
import { toast } from 'react-toastify';

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  courseId: string;
}

const QuizAttempt = () => {
  const router = useRouter();
  const { quizId } = useParams<{quizId: string}>();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [complete,setComplete]=useState(false)
  const [error, setError] = useState<string | null>(null);

  const student = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;
      
      try {
        const response = await getQuizData(quizId);
        if (response.data) {
          setQuiz(response.data);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionSelect = (questionIndex: number, option: string) => {
    if (isSubmitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [quiz!.questions[questionIndex]._id]: option,
    }));
  };

  const calculateScore = (): number => {
    if (!quiz) return 0;

    let totalScore = 0;
    quiz.questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question._id];
      if (selectedAnswer === question.correctAnswer) {
        totalScore += 1;
      }
    });
    return totalScore;
  };

  const handleSubmit = async () => {
    if (!quiz || isSubmitted) return;
    
    if(quiz.questions.length!==Object.entries(selectedAnswers).length){
      toast.error("Attend all the Questions!")
      return 
    }
    

    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);

    try {
     
      const response=await submitResult(quiz.courseId,{score:finalScore ,total:quiz.questions.length})
      if(response.success){
        toast.success(response.message)
        setComplete(true)
        
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error || 'Quiz not found'}
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen text-black bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Quiz Results</h1>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {score} / {quiz.questions.length}
            </div>
            <div className="text-gray-600 mb-6">
              Your Score: {((score / quiz.questions.length) * 100).toFixed(1)}%
            </div>
          </div>

          <div className="space-y-6 text-black">
            {quiz.questions.map((question, index) => {
              const selectedAnswer = selectedAnswers[question._id];
              const isCorrect = selectedAnswer === question.correctAnswer;

              return (
                <div 
                  key={question._id}
                  className={`p-4 rounded-lg ${
                    isCorrect ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="font-medium text-purple-700 mb-2">
                    {index + 1}. {question.questionText}
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-600 mb-1">
                      Your answer: {selectedAnswer || 'Not answered'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Correct answer: {question.correctAnswer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push('/myCourses')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-purple-700 font-bold">{quiz.title}</h1>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-purple-600 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg text-black font-medium mb-4">
            {quiz.questions[currentQuestion].questionText}
          </h2>
          <div className="space-y-3">
            {quiz.questions[currentQuestion].options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                onClick={() => handleOptionSelect(currentQuestion, option)}
                className={`w-full p-4 text-black text-left rounded-lg border transition-colors ${
                  selectedAnswers[quiz.questions[currentQuestion]._id] === option
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(prev + 1, quiz.questions.length - 1))}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;