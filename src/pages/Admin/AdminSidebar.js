import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users,GraduationCap} from "lucide-react"; // added FileQuestion

const AdminSidebar = () => {
  return (
     <div className="h-screen w-64 bg-indigo-700 text-white flex flex-col shadow-lg">
      {/* Logo / Title */}
      <div className="p-6 text-2xl font-bold border-b border-indigo-500">
        Admin Panel
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-4">
        <Link
          to="/admin/dashboard"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          <LayoutDashboard size={20} />
          <span className="text-lg">Dashboard</span>
        </Link>

        <Link
          to="/admin/Courses"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          <BookOpen size={20} />
          <span className="text-lg">Courses</span>
        </Link>
        
        <Link
          to="/admin/Students"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          <GraduationCap size={20} />
          <span className="text-lg">Students</span>
        </Link>

        <Link
          to="/admin/teachers"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          <Users size={20} />
          <span className="text-lg">Teachers</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-indigo-500 text-sm text-center">
        © 2025 E-Learning
      </div>
    </div>
  )
}

export default AdminSidebar
