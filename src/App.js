import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Registration from './pages/Registration';
import StudentDashboard from './pages/Student/StudentDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import Login from './pages/Login';
import Admin from './pages/Admin/Admin';
import CoursesPage from './pages/Teacher/CoursesPage';
import EditCoursePage from './pages/Teacher/EditCoursePage';


function App() {
    return ( 
    < Router >
        <div className = "min-h-screen bg-gray-50" >
            <Routes >
                <Route path = "/signup" element = { < Registration /> }/> 
                <Route path = '/student-dashboard' element = { < StudentDashboard /> }/>
                <Route path = '/teacher-dashboard' element = { < TeacherDashboard /> }/>
                <Route path = '/admin-dashboard' element = { < Admin /> }/>
                <Route path = '/coursesPage' element = {<CoursesPage/>}/>
                <Route path='/courseEditPage/:id' element = {<EditCoursePage/>}/>
                <Route index element={<Login />} />
            </Routes > 
        </div> 
    </Router >

        )
}

export default App;