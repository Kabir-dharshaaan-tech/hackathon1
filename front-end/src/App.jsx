
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import UserHome from "./userpage/userHome";
import UserForm from "./userpage/userForm";
import Pitch from "./userpage/pitch"; // Import Pitch component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      checkUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Function to check if user data exists
  const checkUserData = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setUserExists(true);
      }
    } catch (err) {
      console.log("User data not found, redirecting to UserForm.");
    }
    setLoading(false);
  };

  // Function to handle login success
  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    checkUserData(token);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserExists(false);
    window.location.href = "/login"; // Redirect after logout
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>; // Show loading state
  }

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
        
        {/* Pitch Route */}
        <Route path="/pitch" element={<Pitch />} /> 

        {/* Redirect Logic */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              userExists ? (
                <Navigate to="/userHome" replace />
              ) : (
                <Navigate to="/userForm" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;


