



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    github: "",
    linkedin: "",
    education: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }, // Send token
        });

        if (response.data) {
          setUserExists(true);
          setFormData(response.data); 
        }
      } catch (err) {
        console.log("No existing user data");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/users", formData, {
        headers: { Authorization: `Bearer ${token}` }, 
      });

      setMessage("User data submitted successfully!");
      setTimeout(() => navigate("/userHome"), 1500);
    } catch (error) {
      setMessage("Error submitting form. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-blue-900 text-white">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md border border-blue-500" style={{ backgroundColor: "#0a0f1e" }}>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">User Information</h2>

        {message && (
          <p className={`text-center mb-4 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        {userExists ? (
          <button
            className="w-full p-2 mt-4 bg-green-600 hover:bg-green-700 rounded-md text-white font-bold transition"
            onClick={() => navigate("/userHome")}
          >
            Go to Homepage
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-900 border border-blue-500 rounded-md text-white focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 bg-gray-900 border border-blue-500 rounded-md text-white focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 bg-gray-900 border border-blue-500 rounded-md text-white focus:ring focus:ring-blue-500"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">GitHub Link</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full p-2 bg-gray-900 border border-blue-500 rounded-md text-white focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">LinkedIn Link</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full p-2 bg-gray-900 border border-blue-500 rounded-md text-white focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Education Level</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full p-2 bg-gray-900 border border-blue-500 rounded-md text-white focus:ring focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full p-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserForm;
