import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBookOpen, FaGraduationCap } from "react-icons/fa"; // FontAwesome icons

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white shadow-lg flex flex-col">
      <div className="p-6 text-center border-b border-blue-400">
        <h2 className="text-2xl font-bold tracking-wide mb-2">Student Panel</h2>
        <span className="text-sm text-blue-200">Welcome!</span>
      </div>

      <nav className="flex-1 py-8 px-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/student"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              <FaTachometerAlt className="w-5 h-5" />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/student/Courses"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              <FaBookOpen className="w-5 h-5" />
              Courses
            </Link>
          </li>

          <li>
            <Link
              to="/student/enrolledCourses"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              <FaGraduationCap className="w-5 h-5" />
              Enrolled Courses
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-400 text-center text-xs text-blue-200">
        &copy; {new Date().getFullYear()} E-Learning System
      </div>
    </aside>
  );
};

export default Sidebar;
