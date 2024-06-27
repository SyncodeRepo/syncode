import React from 'react';
import './App.css';
import Navbar from './components/ui/navbar';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import ClassPage from './components/pages/ClassPage'; // Import the ClassPage component
import Testing from './components/pages/Testing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/classes/:classId" element={<ClassPage />} /> {/* Add this route */}
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
