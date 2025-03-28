



import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLinkedin, FaGithub, FaLightbulb } from "react-icons/fa";
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
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-10 text-lg animate-pulse">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10 text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-blue-900 text-white p-10 flex items-center relative">
      
      <div className="w-1/3 flex flex-col items-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg hover:scale-105 transition-transform"
        />
        <h1 className="text-4xl font-bold mt-4">{user.name}</h1>
        <p className="text-gray-400 text-lg">📞 {user.phone}</p>
      </div>

      
      <div className="w-2/3 pl-10">
        <p className="text-gray-300 text-lg italic">"{user.description}"</p>

        
        <div className="mt-6 flex space-x-6">
          <a
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition text-2xl flex items-center"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition text-2xl flex items-center"
          >
            <FaLinkedin className="mr-2" /> LinkedIn
          </a>
        </div>

       
        <p className="mt-6 text-xl font-semibold bg-gray-800 inline-block px-4 py-2 rounded-md">🎓 {user.education}</p>
      </div>

   
      <button
        className="absolute bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 transition"
        onClick={() => navigate("/pitch")} 
      >
        <FaLightbulb className="text-xl" />
        <span>Pitch Your Ideas</span>
      </button>
    </div>
  );
};

export default UserHome;



