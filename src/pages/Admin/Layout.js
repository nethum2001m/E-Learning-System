import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";

const Layout = () => {
  return (
     <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="h-full"/>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
