import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/course/all");
        setCourses(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDel = window.confirm("Are you sure want to delete?");
      if (!confirmDel) {
        return;
      } else {
        await axios.delete(`http://localhost:8000/api/course/delete/${id}`);
        setCourses(courses.filter((c) => c._id !== id));
      }
    } catch (err) {
      setError(err);
    }
  };

  const updateCourse = (id) => {
    navigate(`/teacher/courseEditPage/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-10 px-4">
      <h2 className="text-5xl text-center font-extrabold text-indigo-600 mt-7 mb-10 drop-shadow-lg">
        All Courses
      </h2>
      {error && (
        <div className="max-w-xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          {error.message || "An error occurred."}
        </div>
      )}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="relative bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-indigo-200 flex flex-col"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-300 to-blue-200 flex items-center justify-center shadow-lg mb-3">
                <span className="text-3xl font-bold text-indigo-700">{course.title.charAt(0)}</span>
              </div>
              <h3 className="text-2xl font-bold text-indigo-800 mb-1 text-center">{course.title}</h3>
              <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-semibold mb-2">{course.payorFree}</span>
            </div>
            <p className="text-gray-700 mb-3 text-center line-clamp-2">{course.description}</p>
            <div className="flex justify-center gap-3 mt-auto">
              <button
                onClick={() => updateCourse(course._id)}
                className="px-4 py-2 rounded-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-500 border border-yellow-300 shadow-md transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 border border-red-400 shadow-md transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;