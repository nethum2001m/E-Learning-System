import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Search } from "lucide-react"; // added search icon

const AdminCourses = () => {
  const url = "http://localhost:8000/api/admin/verifyadmintoken";
  const coursesUrl = "http://localhost:8000/api/admin/getAllCourses";
  const deleteUrl = "http://localhost:8000/api/course/delete";
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6; // show 6 per page
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getAdminCourses = async () => {
      try {
        const verifyRes = await axios.post(url, null, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (verifyRes.data.userid) {
          const coursesRes = await axios.get(coursesUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCourses(coursesRes.data.courses);
        }
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    getAdminCourses();
  }, [navigate]);

  // Delete course handler
  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${deleteUrl}/${courseId}`)

      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      alert("Course deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete the course!");
    }
  };

  // Search filter logic
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.Category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Admin - Manage Courses
      </h1>

      {/* Search bar */}
      <div className="mb-6 flex items-center gap-3 bg-white border border-gray-300 rounded-lg p-2 shadow-sm w-full sm:w-1/2">
        <Search className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page when searching
          }}
          className="w-full outline-none bg-transparent text-gray-700"
        />
      </div>

      {currentCourses.length === 0 ? (
        <p className="text-gray-600 text-lg">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
            >
              <img
                src={`http://localhost:8000/getImages/images/${course.lessonPicture}`}
                alt={course.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {course.description?.substring(0, 70)}...
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-semibold">Category:</span>{" "}
                  {course.Category}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-semibold">Teacher:</span>{" "}
                  {course.teacher?.FullName || "Unknown"}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <span className="font-semibold">Type:</span> {course.payorFree}
                </p>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(course._id)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
