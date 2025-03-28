


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLinkedin, FaGithub, FaLightbulb, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/me");
        setUser(response.data);
      } catch (error) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return <div className="text-white text-center mt-10 text-lg animate-pulse">Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center mt-10 text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black text-white flex items-center justify-between p-10 relative">
      <button
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 transition"
        onClick={logout}
      >
        <FaSignOutAlt className="text-xl" />
        <span>Logout</span>
      </button>
      
      <div className="w-1/3 flex justify-center">
        <img
          src="https://via.placeholder.com/300"
          alt="Profile"
          className="w-80 h-80 rounded-full border-4 border-blue-500 shadow-xl hover:scale-105 transition-transform"
        />
      </div>
      
      <div className="w-2/3 pl-10 text-left">
        <h1 className="text-6xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-300 text-2xl italic">"{user.description}"</p>
        <p className="text-gray-400 text-xl mt-4">📞 {user.phone}</p>
        <div className="mt-6 flex space-x-6">
          <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 text-3xl">
            <FaGithub />
          </a>
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-3xl">
            <FaLinkedin />
          </a>
        </div>
        <p className="mt-6 text-2xl font-semibold bg-gray-800 px-6 py-2 rounded-lg">🎓 {user.education}</p>
      </div>
      
      <button
        className="absolute bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 transition"
        onClick={() => navigate("/pitch")}
      >
        <FaLightbulb className="text-2xl" />
        <span>Pitch Your Ideas</span>
      </button>
    </div>
  );
};

export default UserHome;