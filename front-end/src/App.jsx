


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import UserHome from "./userpage/userHome";
import UserForm from "./userpage/userForm";

const App = () => {
  // State to track authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in (token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token existence to boolean
  }, []);

  // Function to handle login success
  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login"; // Ensures redirection after logout
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/userHome"
          element={isAuthenticated ? <UserHome onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/userForm"
          element={isAuthenticated ? <UserForm /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
