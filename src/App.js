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
import TeacherLayout from './pages/Teacher/TeacherLayout';
import StudentLayout from './pages/Student/StudentLayout';
import Courses from './pages/Student/Courses';
import CourseDetailsPage from './pages/Student/CourseDetailsPage';
import CourseInclude from './pages/Student/CourseInclude';
import EnrolledCourses from './pages/Student/EnrolledCourses';
import Student from './pages/Teacher/Student';
import CreateQuiz from './pages/Teacher/CreateQuiz';
import Quiz from './pages/Student/Quiz';
import CreateAnnouncement from './pages/Teacher/CreateAnnouncement';
import Announcement from './pages/Student/Announcement';
import Quizes from './pages/Teacher/Quizes';
import QuizInclude from './pages/Teacher/QuizInclude';
import QuizResult from './pages/Teacher/QuizResult';


function App() {
    return ( 
    < Router >
        <div className = "min-h-screen bg-gray-50" >
            <Routes >
                <Route path = "/signup" element = { < Registration /> }/> 
                <Route path = '/admin-dashboard' element = { < Admin /> }/>
                <Route path='/student' element={<StudentLayout/>}>
                    <Route index element={<StudentDashboard/>}></Route>
                    <Route path='Courses' element={<Courses/>}/>
                    <Route path='courseDetails/:id' element={<CourseDetailsPage/>}/>
                    <Route path='courseInclude/:id' element={<CourseInclude/>}/>
                    <Route path='enrolledCourses' element={<EnrolledCourses/>}/>
                    <Route path='quiz/:id' element={<Quiz/>}/>
                    <Route path='announcements' element={<Announcement/>}/>
                </Route>
                <Route index element={<Login />} />
                <Route path='/teacher' element={<TeacherLayout/>}>
                    <Route path='QuizInclude/:id' element={<QuizInclude/>}/>
                    <Route path='dashboard' element={<TeacherDashboard/>}/>
                    <Route path='quiz' element={<Quizes/>}/>
                    <Route path='courses' element={<CoursesPage/>}/>
                    <Route path='courseEditPage/:id' element={<EditCoursePage/>}/>
                    <Route path='students' element={<Student/>}/>
                    <Route path='quizes' element={<CreateQuiz/>}/>
                    <Route path='createAnnouncement' element={<CreateAnnouncement/>}/>
                    <Route path='quizResult/:id' element={<QuizResult/>}/>
                </Route>
            </Routes > 
        </div> 
    </Router >

        )
}

export default App;