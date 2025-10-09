import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherStudents = () => {
  const authURL = "http://localhost:8000/api/teacher/getteacherid";
  const EnrolledStudentsWithCoursesURL =
    "http://localhost:8000/api/teacher/getEnrolledStudents";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        // 1. Get teacher ID
        const authRes = await axios.post(authURL, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const teacherId = authRes.data.teacherid;

        // 2. Get courses with enrolled students
        const coursesRes = await axios.post(
          EnrolledStudentsWithCoursesURL,
          { teacherId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const courses = coursesRes.data.courses;

        // 3. Group by student
        const studentMap = {};
        courses.forEach((course) => {
          course.enrollStudents.forEach((s) => {
            const id = s.StudentID._id;
            if (!studentMap[id]) {
              studentMap[id] = {
                ...s.StudentID,
                courses: [],
              };
            }
            studentMap[id].courses.push({
              title: course.title,
            });
          });
        });

        setStudents(Object.values(studentMap));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter students based on search
  const filteredStudents = students.filter((student) =>
    student.FullName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Students & Their Enrolled Courses
      </h1>

      {/* Search bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 shadow"
        />
      </div>

      {currentStudents.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No students found
        </div>
      ) : (
        <div className="space-y-6">
          {currentStudents.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-lg rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {student.FullName} ({student.email})
              </h2>
              {student.courses.length === 0 ? (
                <p className="text-gray-500">No enrolled courses</p>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {student.courses.map((course, idx) => (
                    <li key={idx} className="text-gray-700 font-medium">
                      {course.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Pagination controls */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-3 py-1 rounded-lg font-medium border ${
                    currentPage === number
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherStudents;
