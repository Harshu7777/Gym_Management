import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Additional/Navbar';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import Dashboard from './pages/Dashboard';
import Member from './pages/Member';
import About from './pages/About';
import AddMember from './pages/AddMember';

function App() {

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        <Route path="/member" element={<Member />} />
        <Route path="/Addmember" element={<AddMember />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
