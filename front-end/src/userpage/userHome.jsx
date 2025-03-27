



import React, { useState, useEffect } from "react";
import axios from "axios";

const UserHome = () => {
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
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-blue-900 text-white p-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md">
        {/* Profile Image Placeholder */}
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
        />

        {/* User Info */}
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-400 mt-1">📞 {user.phone}</p>

        {/* Education Details */}
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">🎓 {user.education}</p>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-300 text-center px-4">{user.description}</p>

        {/* Social Links */}
        <div className="mt-4 flex space-x-4">
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition">
            LinkedIn
          </a>
          <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
