import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EnrolledCourses = () => {
  const authURL = "http://localhost:8000/api/student/verifyStudentToken"
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [search, setSearch] = useState("")
  const [userId, setUserId] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [coursesPerPage] = useState(6) // show 6 courses per page
  const navigate = useNavigate()

  useEffect(() => {
    let userid
    const token = localStorage.getItem("token")

    const checkAuth = async () => {
      try {
        const res = await axios.post(authURL, null, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        setUserId(res.data.userid)
        userid = res.data.userid

        const getCourses = async () => {
          try {
            const res = await axios.get(
              `http://localhost:8000/api/course/getEnrolledCourses/${userid}`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            )
            setEnrolledCourses(res.data.courses)
          } catch (error) {
            console.log(error)
          }
        }
        getCourses()
      } catch (error) {
        navigate('/')
      }
    }
    checkAuth()
  }, [navigate])

  // Filter courses by search
  const filteredCourses = enrolledCourses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        My Enrolled Courses
      </h1>
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 shadow"
        />
      </div>

      {currentCourses.length > 0 ? (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {currentCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={`http://localhost:8000/getImages/images/${course.lessonPicture}`}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {course.description}
                  </p>
                  <button
                    onClick={() => navigate(`/student/courseInclude/${course._id}`)}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Visit Course
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                } transition-colors`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-600">
          <p className="text-lg font-medium">There are no enrolled courses</p>
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses
