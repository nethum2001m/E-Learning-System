import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaPlus,
  FaBullhorn,
  FaFile,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");
  const [payorFree, setPayOrFree] = useState("");
  const [coursePicture, setCoursePicture] = useState(null);

  const url = "http://localhost:8000/api/teacher/getteacherid";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getTeacherId = async () => {
      await axios
        .post(
          url,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTeacher(res.data.teacherid);
        })
        .catch(() => {
          navigate("/");
        });
    };
    getTeacherId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !payorFree || !coursePicture) {
      alert("All fields are required");
      return;
    }
    if (!teacher) {
      alert("Internal server error");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("teacher", teacher);
    formdata.append("payorFree", payorFree);
    formdata.append("coursePicture", coursePicture);

    const submitform = async () => {
      const token = localStorage.getItem("token");
      await axios
        .post("http://localhost:8000/api/course/create", formdata, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert("Course created successfully");
          setShowModal(false);
          setTitle("");
          setDescription("");
          setPayOrFree("");
          setCoursePicture(null);
        })
        .catch(() => {
          alert("Error in creating course");
        });
    };
    submitform();
  }; 
  const PageCourses =()=> {
    navigate("/teacher/courses")
  }
  const stats = [
    {
      title: "Total Students",
      value: 120,
      icon: <FaUsers className="text-white text-2xl" />,
    },
    {
      title: "Courses Assigned",
      value: 8,
      icon: <FaBook className="text-white text-2xl" />,
    },
    {
      title: "Pending Assignments",
      value: 15,
      icon: <FaClipboardList className="text-white text-2xl" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-screen bg-gray-100"
    >
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-orange-400 uppercase shadow-md bg-white inline-block px-8 py-4 rounded-lg">
            Welcome, Teacher!
          </h1>
        </motion.div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-6 justify-center mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
              className="flex flex-1 min-w-[200px] items-center justify-between bg-orange-400 text-white p-6 rounded-xl"
            >
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </div>
              <div>{stat.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 flex-1 min-w-[150px] py-3 bg-orange-400 text-white rounded-lg font-bold"
          >
            <FaPlus /> Create Assignment
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 flex-1 min-w-[150px] py-3 bg-blue-500 text-white rounded-lg font-bold"
          >
            <FaBullhorn /> Send Announcement
          </motion.button>

          <motion.button
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 flex-1 min-w-[150px] py-3 bg-green-500 text-white rounded-lg font-bold"
          >
            <FaChalkboardTeacher /> Create Course
          </motion.button>

           {/* My courses */}
          <motion.button
            onClick={PageCourses}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 flex-1 min-w-[150px] py-3 bg-blue-500 text-white rounded-lg font-bold"
          >
            <FaFile /> My Courses
          </motion.button>
        </div>
        {/* Create Course Modal */}
        {showModal && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-8 w-96"
            >
              <h2 className="text-xl font-bold mb-4">Create Course</h2>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Course Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="p-3 rounded-lg border border-gray-300"
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="p-3 rounded-lg border border-gray-300"
                />
                <select
                  value={payorFree}
                  onChange={(e) => setPayOrFree(e.target.value)}
                  required
                  className="p-3 rounded-lg border border-gray-300"
                >
                  <option value="">Choose one</option>
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
                </select>
                <input
                  required
                  type="file"
                  onChange={(e) => setCoursePicture(e.target.files[0])}
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold"
                  >
                    Create
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default TeacherDashboard;
