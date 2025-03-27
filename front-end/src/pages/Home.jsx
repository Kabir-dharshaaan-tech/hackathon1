


import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900 text-white p-10 relative">
      {/* Top Bar with Search and Login */}
      <div className="absolute top-4 w-full flex justify-center">
        <div className="bg-gray-900 p-4 rounded-lg flex items-center w-2/3 shadow-lg">
          {/* Search Box with Icon */}
          <div className="flex items-center w-full">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="text-gray-400 ml-2" />
          </div>
          
          {/* Login Button (Navigates to Login Page) */}
          <button 
            onClick={() => navigate("/login")} 
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Main Content */}
      <h1 className="text-4xl font-bold mt-20">Welcome to Our Website</h1>
    </div>
  );
};

export default Home;
