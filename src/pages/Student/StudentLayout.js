import React from 'react'
import {Outlet} from "react-router-dom"
import Sidebar from './Sidebar'
const StudentLayout = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar className="h-full"/>
      <main className="flex-1  bg-gray-100 overflow-y-auto">
         <Outlet/>
      </main>
    </div>
  )
}

<<<<<<< HEAD
export default StudentLayout
=======
export default StudentLayout
>>>>>>> vidu_frontend
