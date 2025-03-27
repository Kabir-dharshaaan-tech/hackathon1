import React from "react";

const UserHome = () => {
  const user = {
    profileImage: "https://via.placeholder.com/150", // Replace with user's profile image URL
    name: "John Doe",
    whatsapp: "+91 9876543210",
    education: "Bachelor's in Computer Science",
    school: "XYZ University",
    employment: "Software Engineer at ABC Corp",
    description: "Passionate about web development, AI, and open-source contributions.",
    linkedin: "https://www.linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-blue-900 text-white p-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md">
        {/* Profile Image */}
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
        />

        {/* User Name */}
        <h2 className="text-2xl font-semibold">{user.name}</h2>

        {/* WhatsApp Number */}
        <p className="text-gray-400 mt-1">📞 {user.whatsapp}</p>

        {/* Education Details */}
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">🎓 {user.education}</p>
          <p className="text-gray-300">{user.school}</p>
          <p className="text-gray-300">💼 {user.employment}</p>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-300 text-center px-4">{user.description}</p>

        {/* Social Links */}
        <div className="mt-4 flex space-x-4">
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition"
          >
            LinkedIn
          </a>
          <a
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
