"use client"
import React, { useEffect } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { editQuiz, getQuizData } from '@/api/courseApi';
import { toast } from 'react-toastify';

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface QuizFormData {
  title: string;
  description: string;
  questions: Question[];
}

interface quizId {
  quizId: string;
}

const EditQuizForm: React.FC = () => {
  const {id}=useParams<{id:string}>()
  const router = useRouter();
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<QuizFormData>({
    defaultValues: {
      title: '',
      description: '',
      questions: [
        {
          questionText: '',
          options: ['', ''],
          correctAnswer: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  // Fetch existing quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizData(id);

        if (!response.success) toast.error("couldint get quiz data")

        const quizData =  response.data;

        
        // Reset form with existing data
        reset({
          title: quizData.title,
          description: quizData.description,
          questions: quizData.questions,
        });
      } catch (error) {
        // alert('Error fetching quiz data');
        // router.push('/quizzes'); // Redirect to quizzes list on error
      }
    };

    if (id) {
      fetchQuiz();
    }
  }, [id, reset, router]);

  const handleAddOption = (questionIndex: number) => {
    const currentQuestions = watch('questions');
    const updatedQuestions = [...currentQuestions];
    updatedQuestions[questionIndex].options.push('');
    setValue('questions', updatedQuestions);
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const currentQuestions = watch('questions');
    const updatedQuestions = [...currentQuestions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
      (_, index) => index !== optionIndex
    );
    setValue('questions', updatedQuestions);
  };

  const onSubmit = async (data: QuizFormData) => {
    try {
      const response = await editQuiz(id,data)

      if (!response.success) {
        toast.error(response.message)
        return
      }

     toast.success(response.message)
     router.back()
     
    } catch (error:any) {
      toast.error(error.message)
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Quiz</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title
            </label>
            <input
              {...register('title', {
                required: 'Title is required',
                minLength: {
                  value: 3,
                  message: 'Title must be at least 3 characters',
                },
              })}
              type="text"
              placeholder="Enter quiz title"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters',
                },
              })}
              placeholder="Enter quiz description"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {fields.map((field, questionIndex) => (
            <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  Question {questionIndex + 1}
                </h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(questionIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <MinusCircle className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <input
                  {...register(`questions.${questionIndex}.questionText`, {
                    required: 'Question text is required',
                    minLength: {
                      value: 5,
                      message: 'Question must be at least 5 characters',
                    },
                  })}
                  type="text"
                  placeholder="Enter question text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.questions?.[questionIndex]?.questionText && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.questions[questionIndex]?.questionText?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                {watch(`questions.${questionIndex}.options`).map((_, optionIndex) => (
                  <div key={optionIndex} className="flex gap-2">
                    <input
                      {...register(`questions.${questionIndex}.options.${optionIndex}`, {
                        required: 'Option text is required',
                      })}
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {watch(`questions.${questionIndex}.options`).length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <MinusCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddOption(questionIndex)}
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Option
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correct Answer
                </label>
                <select
                  {...register(`questions.${questionIndex}.correctAnswer`, {
                    required: 'Please select the correct answer',
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select correct answer</option>
                  {watch(`questions.${questionIndex}.options`).map((option, index) => (
                    <option key={index} value={option}>
                      {option || `Option ${index + 1}`}
                    </option>
                  ))}
                </select>
                {errors.questions?.[questionIndex]?.correctAnswer && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.questions[questionIndex]?.correctAnswer?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ questionText: '', options: ['', ''], correctAnswer: '' })}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Question
        </button>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? 'Updating...' : 'Update Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuizForm;