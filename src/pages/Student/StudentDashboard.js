import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaBookOpen,
  FaClipboardList,
  FaCheckCircle,
  FaLayerGroup,   // for total courses
} from "react-icons/fa";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const url = "http://localhost:8000/api/student/verifyStudentToken";
  const [enrolledCourseCount,setEnrolledCourseCount] = useState(0)
  const [totalCourse,setTotalCourses] = useState(0)
  const [completedQuizesCount,setCompletedQuizesCount] = useState(0)
  const [pendingQuizesCount,setPendingQuizesCount]  = useState(0)
  const [student, setStudent] = useState(null);
  const [announcements,setAnnouncements] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Check authentication and authorization
    const verifyStudent = async () => {
      try {
        const res = await axios.post(url, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const studentId = res.data.userid
        setStudent(res.data.userid);
        const getEnrolledCoursesCount = async() =>{
            await axios.get(`http://localhost:8000/api/student/EnrolledCoursesCount/${studentId}`,{
              headers:{
                'Authorization':`Bearer ${token}`,
              }
            }).then((res)=>{
                setEnrolledCourseCount(res.data.enrolledCourseCount)
            }).catch((err)=>{
              console.log(err)
            })
        }
        const getTotalCourseCount = async() =>{
          await axios.get("http://localhost:8000/api/student/totalCourses",{
            headers:{
              'Authorization':`Bearer ${token}`,
            }
          }).then((res)=>{
            setTotalCourses(res.data.totalCourses)
          }).catch((err)=>{
            console.log(err)
          })
        }
        const getCompletedQuizesCount = async() =>{
          await axios.get(`http://localhost:8000/api/student/totalCompletedQuizes/${studentId}`,{
            headers:{
              'Authorization':`Bearer ${token}`,
            }
          }).then((res)=>{
            setCompletedQuizesCount(res.data.submissionCount)
          }).catch((err)=>{
            console.log(err)
          })
        }
        const getPendingQuizesCount = async() =>{
            await axios.get(`http://localhost:8000/api/student/pendingQuizes/${studentId}`,{
              headers:{
                'Authorization':`Bearer ${token}`,
              }
            }).then((res)=>{
              setPendingQuizesCount(res.data.pendingQuizesCount)
            }).catch((err)=>{
              console.log(err)
            })
        }
        const getRecentAnnouncements = async() =>{
          await axios.get(`http://localhost:8000/api/student/getRecentAnnouncements/${studentId}`,{
            headers:{
              'Authorization':`Bearer ${token}`,
            }
          }).then((res)=>{
            setAnnouncements(res.data.announcements)
          }).catch((err)=>{
            console.log(err)
          })
        }
        getEnrolledCoursesCount()
        getTotalCourseCount()
        getCompletedQuizesCount()
        getPendingQuizesCount()
        getRecentAnnouncements()
         // assuming backend sends student info
      } catch (err) {
        navigate("/");
      }
    };
    verifyStudent();
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {student ? student.FullName : "Student"} 👋
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <FaBookOpen className="text-blue-600 w-8 h-8" />
          <div>
            <p className="text-gray-600">Enrolled Courses</p>
            <h2 className="text-xl font-bold">{enrolledCourseCount}</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <FaLayerGroup className="text-indigo-600 w-8 h-8" />
          <div>
            <p className="text-gray-600">Total Courses</p>
            <h2 className="text-xl font-bold">{totalCourse}</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <FaCheckCircle className="text-green-600 w-8 h-8" />
          <div>
            <p className="text-gray-600">Completed Quizzes</p>
            <h2 className="text-xl font-bold">{completedQuizesCount}</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <FaClipboardList className="text-orange-500 w-8 h-8" />
          <div>
            <p className="text-gray-600">Pending Quizzes</p>
            <h2 className="text-xl font-bold">{pendingQuizesCount}</h2>
          </div>
        </div>
      </div>

      {/* Recent Announcements */}
      {/* Recent Announcements */}
<div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-lg font-semibold mb-4">Recent Announcements</h2>

  {announcements.length > 0 ? (
    <ul className="space-y-3">
      {announcements.map((a) => (
        <li
          key={a._id}
          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
        >
          <p className="font-semibold">{a.title}</p>
          <p className="text-gray-600 text-sm">{a.Description}</p>
          <p className="text-xs text-gray-400 mt-1">
            By {a.teacherId?.FullName} • {new Date(a.createdAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No recent announcements</p>
  )}
</div>

    </div>
  );
};

export default StudentDashboard;
