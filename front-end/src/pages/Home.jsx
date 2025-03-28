



import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pitches/all");
        setPitches(response.data);
      } catch (error) {
        console.error("Error fetching pitches:", error);
      }
    };
    fetchPitches();
  }, []);

  

    const topics = [
        {
          title: "Artificial Intelligence & Machine Learning (AI/ML)",
          subtopics: [
            "AI-powered SaaS Solutions",
            "Machine Learning & Deep Learning Applications",
            "AI in Healthcare & Diagnostics",
            "AI for Finance & Trading",
            "AI for Agriculture & Precision Farming",
            "AI-powered Chatbots & Virtual Assistants",
            "Generative AI & Content Creation",
            "AI Ethics & Bias Reduction",
            "AI-powered Cybersecurity & Fraud Detection",
            "AI in Robotics & Automation",
          ],
        },
        {
          title: "Information Technology (IT) & Software Development",
          subtopics: [
            "Cloud Computing & SaaS Startups",
            "Cybersecurity & Data Protection",
            "Web & Mobile App Development",
            "IT Consultancy & Digital Transformation",
            "IT Infrastructure & DevOps",
            "AI-driven IT Operations (AIOps)",
            "Big Data & Analytics Solutions",
            "Edge Computing & IoT Integration",
            "Low-code & No-code Development Platforms",
            "Software Testing & Quality Assurance",
          ],
        },
        {
          title: "Computer Science & Engineering (CSE) Innovations",
          subtopics: [
            "Operating Systems & Embedded Systems",
            "High-Performance Computing & Quantum Computing",
            "Robotics & Automation",
            "AR/VR & Metaverse Development",
            "IoT & Smart Device Innovations",
            "Blockchain for Secure Transactions",
            "Human-Computer Interaction & UX/UI Innovations",
            "Digital Twins & Simulation Technologies",
            "Cyber-Physical Systems & Smart Devices",
            "AI-driven Development & Automated Coding",
          ],
        },
        {
          title: "Biotechnology & Healthcare Startups",
          subtopics: [
            "Bioinformatics & Genetic Engineering",
            "Medical Devices & Wearable Tech",
            "Pharmaceuticals & Drug Discovery",
            "AI & Robotics in Healthcare",
            "Telemedicine & HealthTech Platforms",
            "Personalized Medicine & Genomic Research",
            "3D Bioprinting & Organ Regeneration",
            "Remote Patient Monitoring & Smart Hospitals",
            "Mental Health Tech & Digital Therapy",
            "Blockchain for Secure Medical Data",
          ],
        },
        {
          title: "FinTech & Blockchain Startups",
          subtopics: [
            "Cryptocurrency & DeFi Solutions",
            "AI-driven Financial Analytics",
            "Peer-to-Peer Lending & Digital Payments",
            "InsurTech & Fraud Prevention",
            "Blockchain for Supply Chain & Security",
            "Central Bank Digital Currencies (CBDCs)",
            "AI-powered Robo-Advisors & Investment Tools",
            "Smart Contracts & Decentralized Applications",
            "RegTech & Compliance Automation",
            "Embedded Finance & Banking-as-a-Service",
          ],
        },
        {
          title: "AgriTech & FoodTech",
          subtopics: [
            "Precision Farming & Smart Agriculture",
            "AI & IoT in Farming",
            "Organic & Sustainable Farming Innovations",
            "Food Processing & Packaging Startups",
            "Alternative Protein & Lab-Grown Meat",
            "Vertical Farming & Urban Agriculture",
            "Drones & Robotics in Agriculture",
            "Smart Irrigation & Water Management",
            "AI-driven Supply Chain Optimization",
            "Food Safety & Traceability Solutions",
          ],
        },
        {
          title: "EdTech & E-Learning",
          subtopics: [
            "AI-driven Personalized Learning",
            "AR/VR-based Interactive Education",
            "Online Courses & Upskilling Platforms",
            "School & College Management Software",
            "Gamification in Learning",
            "AI Tutors & Virtual Assistants",
            "Language Learning Platforms",
            "STEM & Coding Bootcamps",
            "Education for Special Needs & Accessibility",
            "Career Guidance & Job Placement Platforms",
          ],
        },
        {
          title: "GreenTech & Sustainability",
          subtopics: [
            "Renewable Energy (Solar, Wind, Hydro)",
            "Smart Waste Management & Recycling",
            "Carbon Capture & Climate Solutions",
            "Eco-friendly Consumer Products",
            "Electric Vehicles & Clean Mobility",
            "Sustainable Agriculture & Food Production",
            "Water Purification & Conservation Technologies",
            "Smart Grid & Energy Management",
            "Circular Economy & Zero-Waste Innovations",
            "Sustainable Packaging & Biodegradable Materials",
          ],
        },
        {
          title: "Consumer & E-Commerce",
          subtopics: [
            "Direct-to-Consumer (D2C) Brands",
            "AI-powered Shopping Assistants",
            "Social Commerce & Influencer Marketplaces",
            "Subscription-based E-commerce Models",
            "Last-Mile Delivery & Logistics Tech",
            "Hyperlocal & On-demand Delivery Services",
            "Voice Commerce & AI-driven Retail",
            "Virtual Shopping & AR Try-On Technology",
            "B2B E-commerce & Wholesale Marketplaces",
            "Second-hand & Rental Economy Platforms",
          ],
        },
      ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900 text-white p-10 relative">
      <div className="absolute top-4 w-full flex flex-col items-center gap-4 p-4">
        <div className="flex items-center w-full bg-gray-900 p-4 shadow-lg px-30">
          <div className="flex items-center mr-4">
            <img src="/idRmJUl4Jv.png" alt="PitchIt Logo" className="h-12 w-auto mr-2" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
              PitchIt
            </span>
          </div>

          <div className="flex items-center flex-grow max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="text-gray-400 ml-2" />
          </div>

          <button
            onClick={() => navigate("/login")}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg transition"
          >
            Login
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {topics.map((topic, index) => (
            <div key={index} className="text-center">
              <button
                className="bg-black hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                onClick={() => setSelectedTopic(selectedTopic === topic.title ? null : topic.title)}
              >
                {topic.title}
              </button>
              {selectedTopic === topic.title && (
                <div className="mt-2 p-2 bg-gray-800 rounded-lg shadow-lg">
                  {topic.subtopics.map((subtopic, subIndex) => (
                    <p key={subIndex} className="text-white text-sm py-1">{subtopic}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Latest Project Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pitches.length > 0 ? (
              pitches.map((pitch) => (
                <div key={pitch._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-blue-300">{pitch.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">Category: {pitch.category}</p>
                  <p className="text-gray-300 mt-2">{pitch.problem}</p>
                  <p className="text-gray-400 mt-2 font-semibold">Solution:</p>
                  <p className="text-gray-300">{pitch.solution}</p>
                  <p className="text-gray-400 mt-2 font-semibold">Impact:</p>
                  <p className="text-gray-300">{pitch.impact}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No project ideas submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;