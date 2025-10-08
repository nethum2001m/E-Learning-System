import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Announcement = () => {
  const navigate = useNavigate()
  const [announcements, setAnnouncements] = useState([])
  const [filtered, setFiltered] = useState([])
  const [userid,setUserId] = useState(null)
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const validateAuthURL = "http://localhost:8000/api/student/verifyStudentToken"
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4 // 👈 number of announcements per page

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem("token")
        const studentId = localStorage.getItem("userId")

         const response = await axios.post(validateAuthURL,null,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            })
            setUserId(response.data.userid)
            const USERID = response.data.userid
        const res = await axios.get(
          `http://localhost:8000/api/student/getAnnouncements/${USERID}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )

        setAnnouncements(res.data.announcements)
        setFiltered(res.data.announcements)

        // Extract unique courses
        const uniqueCourses = [
          ...new Map(
            res.data.announcements.map((a) => [a.CourseId._id, a.CourseId])
          ).values()
        ]
        setCourses(uniqueCourses)

        setLoading(false)
      } catch (err) {
        if(err.response.status==401 || err.response.status==403)
        {
          navigate('/')
        }
        else
        {
            setError(err.response?.data?.message || "Failed to fetch announcements")
            setLoading(false)
        }
      }
    }

    fetchAnnouncements()
  }, [])

  const handleFilter = (courseId) => {
    setSelectedCourse(courseId)
    setCurrentPage(1) // reset to first page
    if (courseId === "") {
      setFiltered(announcements)
    } else {
      setFiltered(announcements.filter((a) => a.CourseId._id === courseId))
    }
  }

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filtered.slice(startIndex, endIndex)

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Announcements
        </h1>

        {/* Error / Loading */}
        {loading && <p className="text-gray-600 text-center">Loading...</p>}
        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded-lg text-center">
            {error}
          </p>
        )}

        {/* Course Filter */}
        <div className="mb-6 flex justify-center">
          <select
            value={selectedCourse}
            onChange={(e) => handleFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Announcements List */}
        <div className="grid md:grid-cols-2 gap-6">
          {paginatedData.map((a) => (
            <div
              key={a._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                {a.title}
              </h2>
              <p className="text-gray-600 mb-3">{a.Description}</p>

              <div className="text-sm text-gray-500 mb-2">
                <span className="font-medium">Course:</span> {a.CourseId.title}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Teacher:</span>{" "}
                {a.teacherId?.FullName}
              </div>

              {a.OtherMaterials?.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Materials:</span>
                  <ul className="list-disc ml-5 text-blue-600">
                    {a.OtherMaterials.map((m, idx) => (
                      <li key={idx}>
                        <a
                          href={`http://localhost:8000/getLectureMeterials/general/general/${m.Url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {m.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-3">
                Posted on {new Date(a.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {!loading && paginatedData.length === 0 && (
          <p className="text-center text-gray-600 mt-6">
            No announcements found.
          </p>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-300 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Announcement
