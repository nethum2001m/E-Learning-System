import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const QuizResult = () => {
  const { id } = useParams()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2 // adjust how many submissions per page

  useEffect(() => {
    const token = localStorage.getItem("token")
    const getQuizResult = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/teacher/getQuizResult/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setSubmissions(res.data.quizeSubmissions || [])
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    getQuizResult()
  }, [id])

  // calculate pagination
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentSubmissions = submissions.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(submissions.length / itemsPerPage)

  if (loading) return <p className="p-6 text-gray-500">Loading results...</p>
  if (!submissions.length) return <p className="p-6 text-red-600">No submissions found</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Quiz Results</h1>

      <div className="space-y-4">
        {currentSubmissions.map((sub, index) => (
          <div
            key={sub._id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {indexOfFirst + index + 1}. {sub.studentID?.FullName || "Unknown Student"}
            </h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Email:</span> {sub.studentID?.email}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Score:</span> {sub.score}
            </p>
            <p className="text-gray-500 mb-2">
              <span className="font-medium">Submitted At:</span>{" "}
              {new Date(sub.submittedAt).toLocaleString()}
            </p>
            <div className="ml-4">
              <h3 className="font-medium text-gray-700 mb-1">Answers:</h3>
              <ul className="list-disc list-inside">
                {sub.answers.map((ans, i) => (
                  <li key={i}>Q{i + 1}: {ans}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-3">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default QuizResult
