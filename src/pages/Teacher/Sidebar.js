import React from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen } from "lucide-react"; // nice icons

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-indigo-700 text-white flex flex-col shadow-lg">
      {/* Logo / Title */}
      <div className="p-6 text-2xl font-bold border-b border-indigo-500">
        Teacher Panel
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-4">
        <Link
          to="/teacher/dashboard"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          <Home size={20} />
          <span className="text-lg">Dashboard</span>
        </Link>

        <Link
          to="/teacher/courses"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          <BookOpen size={20} />
          <span className="text-lg">Courses</span>
        </Link>
      </nav>

      {/* Footer (optional) */}
      <div className="p-4 border-t border-indigo-500 text-sm text-center">
        © 2025 E-Learning
      </div>
    </div>
  );
};

export default Sidebar;
