import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/student" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0v6m0 0H7m6 0h6" /></svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/student/Courses" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3" /></svg>
              Courses
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