import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiBook, FiClipboard, FiAward, FiFolder, 
  FiBell, FiSearch, FiMenu, FiUser, FiCalendar,
  FiCheckCircle, FiClock, FiBarChart2, FiDownload,
  FiMessageSquare, FiVideo, FiSettings
} from 'react-icons/fi';
import { 
  FaChalkboardTeacher, FaGraduationCap, 
  FaRegCalendarCheck, FaTasks 
} from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const StudentDashboard = () => {
  const navigate = useNavigate()
  const url = "http://localhost:8000/api/student/verifyStudentToken"
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  useEffect(()=>{
    const token = localStorage.getItem("token")
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
        })
        .catch(() => {
          navigate("/");
        });
    };
    getTeacherId();
  },[])
  // Sample data
  const courses = [
    { 
      id: 1, 
      title: 'Web Development', 
      progress: 75, 
      instructor: 'Sarah Johnson', 
      icon: <FiVideo className="text-blue-500" />,
      color: 'bg-blue-100',
      textColor: 'text-blue-700'
    },
    { 
      id: 2, 
      title: 'Data Science', 
      progress: 40, 
      instructor: 'Michael Chen', 
      icon: <FiBarChart2 className="text-purple-500" />,
      color: 'bg-purple-100',
      textColor: 'text-purple-700'
    },
    { 
      id: 3, 
      title: 'UI/UX Design', 
      progress: 90, 
      instructor: 'Emma Wilson', 
      icon: <FiCheckCircle className="text-pink-500" />,
      color: 'bg-pink-100',
      textColor: 'text-pink-700'
    },
    { 
      id: 4, 
      title: 'Machine Learning', 
      progress: 30, 
      instructor: 'David Kim', 
      icon: <FaChalkboardTeacher className="text-orange-500" />,
      color: 'bg-orange-100',
      textColor: 'text-orange-700'
    },
  ];

  const assignments = [
    { 
      id: 1, 
      title: 'React Component Project', 
      course: 'Web Development', 
      dueDate: '2023-06-15', 
      status: 'Pending',
      icon: <FiClipboard className="text-amber-500" />
    },
    { 
      id: 2, 
      title: 'Data Visualization', 
      course: 'Data Science', 
      dueDate: '2023-06-10', 
      status: 'Submitted',
      icon: <FiDownload className="text-blue-500" />
    },
    { 
      id: 3, 
      title: 'Design System', 
      course: 'UI/UX Design', 
      dueDate: '2023-06-05', 
      status: 'Graded',
      icon: <FaTasks className="text-green-500" />
    },
  ];

  const announcements = [
    { 
      id: 1, 
      title: 'New Course Available', 
      content: 'Advanced JavaScript course is now available for enrollment.', 
      date: '2023-06-01',
      icon: <FiBook className="text-indigo-500" />
    },
    { 
      id: 2, 
      title: 'System Maintenance', 
      content: 'The platform will be down for maintenance on June 15th from 2-4 AM.', 
      date: '2023-05-28',
      icon: <FiSettings className="text-gray-500" />
    },
    { 
      id: 3, 
      title: 'Scholarship Opportunity', 
      content: 'Apply for the developer scholarship by June 20th.', 
      date: '2023-05-25',
      icon: <FaGraduationCap className="text-amber-500" />
    },
  ];

  const stats = [
    { title: 'Active Courses', value: '4', icon: <FiBook className="text-white" />, color: 'bg-blue-500' },
    { title: 'Completed', value: '12', icon: <FiCheckCircle className="text-white" />, color: 'bg-green-500' },
    { title: 'Study Time', value: '5h 20m', icon: <FiClock className="text-white" />, color: 'bg-amber-500' },
    { title: 'Pending Tasks', value: '3', icon: <FiClipboard className="text-white" />, color: 'bg-red-500' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: typeof window !== "undefined" && window.innerWidth < 768 ? -300 : 0 }}
  animate={{ x: sidebarOpen || window.innerWidth >= 768 ? 0 : -300 }}
  transition={{ type: "spring", damping: 25 }}
  className="fixed md:relative z-50 w-64 bg-white text-gray-800 h-full shadow-lg border-r border-gray-200"
>
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center">
            <FaGraduationCap className="text-2xl mr-2 text-green-600" />
            <h1 className="text-xl font-bold text-gray-800">EduSphere</h1>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: <FiHome /> },
              { id: 'courses', label: 'Courses', icon: <FiBook /> },
              { id: 'assignments', label: 'Assignments', icon: <FiClipboard /> },
              { id: 'grades', label: 'Grades', icon: <FiAward /> },
              { id: 'resources', label: 'Resources', icon: <FiFolder /> },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === tab.id 
                      ? 'bg-green-50 text-green-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3 text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            >
              <FiMenu className="text-xl" />
            </button>
            
            <div className="flex-1 mx-4">
              <div className="relative max-w-xl">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, materials..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
                <FiBell className="text-xl" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover border-2 border-green-500"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <OverviewTab courses={courses} assignments={assignments} announcements={announcements} stats={stats} />}
              {activeTab === 'courses' && <CoursesTab courses={courses} />}
              {activeTab === 'assignments' && <AssignmentsTab assignments={assignments} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// Tab Components
const OverviewTab = ({ courses, assignments, announcements, stats }) => (
  <div className="space-y-6">
    {/* Welcome Card */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back, Emily!</h2>
          <p className="mb-4">You have {assignments.filter(a => a.status === 'Pending').length} upcoming assignments and {announcements.length} new announcements.</p>
          <button className="bg-white text-green-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
            View My Courses <FiBook className="ml-2" />
          </button>
        </div>
        <div className="mt-4 md:mt-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
            alt="Learning" 
            className="h-32 rounded-xl object-cover shadow-md"
          />
        </div>
      </div>
    </motion.div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
            {stat.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
          <p className="text-gray-500">{stat.title}</p>
        </motion.div>
      ))}
    </div>

    {/* Courses Progress */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">My Courses</h3>
        <button className="text-green-600 hover:text-green-800 font-medium flex items-center">
          View all <FiBook className="ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.slice(0, 2).map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div className={`${course.color} w-14 h-14 rounded-lg flex items-center justify-center text-2xl mr-4`}>
                {course.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{course.title}</h4>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-green-500 h-2 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Upcoming Assignments & Announcements Side by Side */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upcoming Assignments */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Upcoming Assignments</h3>
          <button className="text-green-600 hover:text-green-800 font-medium flex items-center">
            View all <FiClipboard className="ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="mr-3 text-lg">
                  {assignment.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{assignment.title}</h4>
                  <p className="text-sm text-gray-500">{assignment.course} • Due: {assignment.dueDate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                assignment.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                assignment.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {assignment.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Recent Announcements</h3>
          <button className="text-green-600 hover:text-green-800 font-medium flex items-center">
            View all <FiMessageSquare className="ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start">
                <div className="mr-3 text-lg mt-1">
                  {announcement.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                  <span className="text-xs text-gray-500 mt-2 block">{announcement.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CoursesTab = ({ courses }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
      <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center">
        <FiBook className="mr-2" /> New Course
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className={`h-32 ${course.color} flex items-center justify-center text-5xl`}>
            {course.icon}
          </div>
          <div className="p-5">
            <h3 className="font-bold text-xl text-gray-800 mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-green-500 h-2 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center">
              Continue Learning <FiBook className="ml-2" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const AssignmentsTab = ({ assignments }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800">My Assignments</h2>
      <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center">
        <FiClipboard className="mr-2" /> New Assignment
      </button>
    </div>
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assignments.map((assignment, index) => (
              <motion.tr
                key={assignment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-3 text-lg text-gray-500">
                      {assignment.icon}
                    </div>
                    <div className="font-medium text-gray-900">{assignment.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{assignment.course}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{assignment.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    assignment.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                    assignment.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-green-600 hover:text-green-900 font-medium flex items-center">
                    View <FiClipboard className="ml-1" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default StudentDashboard;