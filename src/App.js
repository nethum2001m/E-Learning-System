import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Registration from './pages/Registration';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
