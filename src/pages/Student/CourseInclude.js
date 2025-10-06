import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaFilePdf, FaPlayCircle, FaChalkboardTeacher } from "react-icons/fa";

const CourseInclude = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);
  const authurl = "http://localhost:8000/api/student/verifyStudentToken";
  const getCourseUrl = `http://localhost:8000/api/course/getCourseDetails/${id}`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authAndGetCourses = async () => {
      try {
        await axios.post(authurl, null, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const res = await axios.get(getCourseUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourseData(res.data.course);
      } catch (err) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    authAndGetCourses();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading course details...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Course Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{courseData?.title}</h1>
        <p className="mb-4 text-gray-700">{courseData?.description}</p>
        <p className="flex justify-center items-center gap-2 text-gray-600">
          <FaChalkboardTeacher className="text-blue-500" />
          Teacher: {courseData?.teacher?.FullName}
        </p>
      </div>

      {/* Lessons */}
      <div className="space-y-6">
        {courseData?.lessons?.length > 0 ? (
          courseData.lessons.map((lesson, i) => (
            <div
              key={lesson._id || i}
              className="border rounded-xl shadow-lg p-6 bg-white hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{lesson.title}</h2>
              <p className="text-gray-600 mb-4">{lesson.description}</p>

              {/* Videos */}
              {lesson.videos?.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <FaPlayCircle className="text-red-500" /> Videos
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {lesson.videos.map((vid, idx) => (
                      <div
                        key={vid._id || idx}
                        className="bg-gray-50 p-3 rounded-lg shadow-sm"
                      >
                        <p className="font-medium mb-1">{vid.title}</p>
                        <video
                          controls
                          className="w-full rounded-lg border"
                          src={`http://localhost:8000/getLectureMeterials/${courseData._id}/general/${vid.videoUrl}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PDFs */}
              {lesson.pdfs?.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <FaFilePdf className="text-red-600" /> PDFs
                  </h3>
                  <ul className="space-y-2">
                    {lesson.pdfs.map((pdf, idx) => (
                      <li key={pdf._id || idx}>
                        <a
                          href={`http://localhost:8000/getLectureMeterials/${courseData._id}/general/${pdf.videoUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                        >
                          📄 {pdf.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No lessons available</p>
        )}
      </div>
    </div>
  );
};

export default CourseInclude;
