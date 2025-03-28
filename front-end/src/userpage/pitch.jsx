

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pitch = () => {
  const navigate = useNavigate();
  const [idea, setIdea] = useState({
    title: "",
    category: "",
    problem: "",
    solution: "",
    techStack: "",
    impact: "",
    attachment: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdea((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setIdea((prev) => ({ ...prev, attachment: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", idea.title);
    formData.append("category", idea.category);
    formData.append("problem", idea.problem);
    formData.append("solution", idea.solution);
    formData.append("techStack", idea.techStack);
    formData.append("impact", idea.impact);
    if (idea.attachment) {
      formData.append("attachment", idea.attachment);
    }

    try {
      await axios.post(
        "http://localhost:5000/api/pitches/submit", 
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("Idea submitted successfully! 🚀");
      setIdea({
        title: "",
        category: "",
        problem: "",
        solution: "",
        techStack: "",
        impact: "",
        attachment: null,
      });
      
      setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
    } catch (error) {
      setMessage("Error submitting idea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 text-white p-10 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-blue-400 drop-shadow-md">Unleash Your Innovation 🚀</h1>
        <p className="text-gray-300 text-lg mt-2">Your ideas have the power to change the world. Share them with us!</p>
      </div>

      <form className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-blue-400">Title of the Idea</span>
          <input type="text" name="title" value={idea.title} onChange={handleChange} className="w-full px-4 py-2 mt-1 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" required />
        </label>

        <label className="block mb-4">
          <span className="text-blue-400">Category</span>
          <select name="category" value={idea.category} onChange={handleChange} className="w-full px-4 py-2 mt-1 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="">Select a Category</option>
            <option value="AI/ML Innovations">AI/ML Innovations</option>
            <option value="FinTech & Blockchain">FinTech & Blockchain</option>
            <option value="Healthcare & Biotech">Healthcare & Biotech</option>
            <option value="Smart Cities & IoT">Smart Cities & IoT</option>
            <option value="EdTech & E-Learning">EdTech & E-Learning</option>
            <option value="GreenTech & Sustainability">GreenTech & Sustainability</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-blue-400">Problem Statement</span>
          <textarea name="problem" value={idea.problem} onChange={handleChange} className="w-full px-4 py-2 mt-1 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" required />
        </label>

        <label className="block mb-4">
          <span className="text-blue-400">Proposed Solution</span>
          <textarea name="solution" value={idea.solution} onChange={handleChange} className="w-full px-4 py-2 mt-1 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" required />
        </label>

        <label className="block mb-4">
          <span className="text-blue-400">Technology Stack (Optional)</span>
          <input type="text" name="techStack" value={idea.techStack} onChange={handleChange} className="w-full px-4 py-2 mt-1 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
        </label>

        <label className="block mb-4">
          <span className="text-blue-400">Expected Impact</span>
          <textarea name="impact" value={idea.impact} onChange={handleChange} className="w-full px-4 py-2 mt-1 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" required />
        </label>

        <label className="block mb-6">
          <span className="text-blue-400">Attachments (Upload files)</span>
          <input type="file" onChange={handleFileChange} className="w-full mt-2 text-white border border-gray-600 px-4 py-2 rounded bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
        </label>

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition shadow-lg" disabled={loading}>
          {loading ? "Submitting..." : "Submit Idea 🚀"}
        </button>
      </form>

      {message && <p className="mt-4 text-lg text-yellow-300">{message}</p>}
    </div>
  );
};

export default Pitch;
