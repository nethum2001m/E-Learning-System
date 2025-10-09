import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const QuizInclude = () => {
  const { id } = useParams()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const getQuizById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/teacher/getQuizById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setQuiz(res.data.matchedQuiz)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    getQuizById()
  }, [id])

  if (loading) return <p className="p-6 text-gray-500">Loading quiz...</p>
  if (!quiz) return <p className="p-6 text-red-600">Quiz not found</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{quiz.title}</h1>
      <p className="text-gray-700 mb-2">{quiz.description}</p>
      <p className="text-sm text-gray-500 mb-6">
        <span className="font-medium">Course:</span> {quiz.courseId?.title || "Unknown"}
      </p>

      <div className="space-y-6">
        {quiz.questions?.map((q, index) => (
          <div
            key={q._id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h3 className="font-medium text-lg mb-2">
              Q{index + 1}. {q.questionText}
            </h3>
            <ul className="space-y-2">
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  className={`px-3 py-2 border rounded ${
                    i === q.correctAnswer
                      ? "bg-green-100 border-green-400 text-green-700"
                      : "bg-gray-50 border-gray-300"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizInclude
