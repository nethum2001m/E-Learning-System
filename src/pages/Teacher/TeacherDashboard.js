import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaPlus,
  FaBullhorn,
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

  const recentActivities = [
    {
      student: "Alice Johnson",
      activity: "Submitted Assignment 3",
      time: "2 hours ago",
    },
    { student: "Mark Smith", activity: "Joined your course", time: "1 day ago" },
    { student: "Jane Doe", activity: "Completed Quiz 2", time: "3 days ago" },
  ];

  const upcomingClasses = [
    { course: "Math 101", time: "Today 10:00 AM" },
    { course: "Physics 201", time: "Today 2:00 PM" },
    { course: "Chemistry 301", time: "Tomorrow 11:00 AM" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-screen bg-gray-100"
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
        className="w-64 bg-gray-900 text-white p-6"
      >
        <h2 className="text-2xl font-bold mb-8 text-orange-400">EduSphere</h2>
        <nav>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-orange-400">Dashboard</li>
            <li className="cursor-pointer hover:text-orange-400">Courses</li>
            <li className="cursor-pointer hover:text-orange-400">Assignments</li>
            <li className="cursor-pointer hover:text-orange-400">Students</li>
            <li className="cursor-pointer hover:text-orange-400">Profile</li>
          </ul>
        </nav>
      </motion.aside>

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
        </div>

        {/* Upcoming Classes */}
        <motion.div className="bg-white rounded-xl p-6 shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">Upcoming Classes</h3>
          <ul>
            {upcomingClasses.map((cls, index) => (
              <motion.li
                key={index}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#dbeafe",
                  borderRadius: "8px",
                }}
                className="py-3 border-b border-gray-200 cursor-pointer"
              >
                <p>
                  <strong>{cls.course}</strong> - {cls.time}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Recent Activity */}
        <motion.div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <ul>
            {recentActivities.map((activity, index) => (
              <motion.li
                key={index}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#fef3c7",
                  borderRadius: "8px",
                }}
                className="py-3 border-b border-gray-200 cursor-pointer"
              >
                <p>
                  <strong>{activity.student}</strong> - {activity.activity}
                </p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

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
