import React from 'react';
import './App.css';
import Navbar from './components/ui/navbar';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

