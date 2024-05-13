import React, {useState} from 'react';
import './App.css';
import Navbar from './components/ui/navbar';
import axios from 'axios';
import LoginPage from './components/pages/LoginPage';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <LoginPage />
    </div>
  );
}

export default App;
