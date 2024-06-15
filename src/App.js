import React, {useState} from 'react';
import './App.css';
import Navbar from './components/ui/navbar';
import axios from 'axios';
import LoginPage from './components/pages/LoginPage';
import Testing from './components/pages/Testing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

