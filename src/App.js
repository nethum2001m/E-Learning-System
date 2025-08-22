import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Registration from './pages/Registration';
import StudentDashboard from './pages/Student/StudentDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="" element={<Registration />} />
          <Route path='/student-dashboard' element={<StudentDashboard/>}/>
          <Route path='/teacher-dashboard' element={<TeacherDashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
