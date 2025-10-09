import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Quizes = () => {
  const [quizes, setQuizes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [quizesPerPage] = useState(6)
  const authURL = 'http://localhost:8000/api/teacher/getteacherid'

  useEffect(() => {
    const token = localStorage.getItem("token")

    const getTeacherId = async () => {
      try {
        const res = await axios.post(authURL, null, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const teacherId = res.data.teacherid

        const quizRes = await axios.get(
          `http://localhost:8000/api/teacher/getAllQuizesByTeacher/${teacherId}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        )

        setQuizes(quizRes.data.quizes)
      } catch (err) {
        console.error(err)
      }
    }
    getTeacherId()
  }, [])

  // pagination logic
  const indexOfLastQuiz = currentPage * quizesPerPage
  const indexOfFirstQuiz = indexOfLastQuiz - quizesPerPage
  const currentQuizes = quizes.slice(indexOfFirstQuiz, indexOfLastQuiz)
  const totalPages = Math.ceil(quizes.length / quizesPerPage)

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

  // Delete quiz function
  const handleDeleteQuiz = async (quizId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quiz?")
    if (!confirmDelete) return

    const token = localStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:8000/api/teacher/deleteQuiz/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // remove deleted quiz from state
      setQuizes(prev => prev.filter(q => q._id !== quizId))
      alert("Quiz deleted successfully")
    } catch (err) {
      console.error(err)
      alert("Failed to delete quiz")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">All Quizzes</h1>

      {quizes.length === 0 ? (
        <p className="text-gray-500 text-lg">No quizzes found</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentQuizes.map((quiz) => (
              <div
                key={quiz._id}
                className="p-5 border rounded-2xl shadow-md hover:shadow-xl transition bg-white"
              >
                <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                  {quiz.title}
                </h2>
                <p className="text-gray-700 mb-3">{quiz.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">Course:</span> {quiz.courseId?.title || "Unknown"}
                </p>

                <div className="flex gap-3 mb-2">
                  <Link
                    to={`/teacher/QuizInclude/${quiz._id}`}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 transition"
                  >
                    Watch Quiz
                  </Link>
                  <Link
                    to={`/teacher/quizResult/${quiz._id}`}
                    className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-lg shadow hover:bg-gray-300 transition"
                  >
                    Watch Result
                  </Link>
                </div>

                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow hover:bg-red-600 transition"
                >
                  Delete Quiz
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm shadow ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Prev
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm shadow ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Quizes
