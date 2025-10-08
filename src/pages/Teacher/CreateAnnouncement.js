import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateAnnouncement = () => {
  const [teacherId, setTeacherId] = useState(null)
  const [course, setCourses] = useState(null)
  const [courseId, setCourseId] = useState('')
  const [title, setTitle] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  const authURL = "http://localhost:8000/api/teacher/getteacherid"
  const submitUrl = "http://localhost:8000/api/teacher/createAnnouncement"

  useEffect(() => {
    const token = localStorage.getItem("token")
    const checkAuth = async () => {
      try {
        const response = await axios.post(authURL, null, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        setTeacherId(response.data.teacherid)
        const id = response.data.teacherid
        const courses = await axios.get(`http://localhost:8000/api/course/all/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        setCourses(courses.data)
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/')
        } else {
          console.log(err)
        }
      }
    }
    checkAuth()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("CourseId", courseId)
    formdata.append("teacherId", teacherId)

    if (file) {
      for (let i = 0; i < file.length; i++) {
        formdata.append("others", file[i])  
      }
    }

    try {
      await axios.post(submitUrl, formdata, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      setError("")
      setSuccess("Announcement created successfully!")
      setDescription("")
      setTitle("")
      setFile(null)
      setCourseId('')
    } catch (err) {
      setSuccess("")
      setError(err.response?.data?.message || "Failed to create announcement")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
           Create Announcement
        </h2>

        {/* Success / Error Messages */}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 border border-green-300">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Course Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Choose Course</option>
              {course && course.map((c, idx) => (
                <option key={idx} value={c._id}>{c.title}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter announcement title"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              required
              rows={4}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attach Materials</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFile(e.target.files)}
              required
              className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-indigo-50 file:text-indigo-600
              hover:file:bg-indigo-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAnnouncement
