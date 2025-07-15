import React, { useState } from "react";

function TopicsPanel({ onTopicClick, darkMode, heading }) {
  const [openSection, setOpenSection] = useState(null);

  const generalTopics = [
    "How to do online payments",
    "How to use Google Maps",
    "How to book train or bus tickets",
    "Basic computer skills (files, folders, devices, shortcuts)",
    "How to use Gmail",
  ];

  const studentTopics = [
    "Technical skills for beginners",
    "Formal email formats and content",
    "Communication tools (Zoom, Meet, Teams)",
    "Career and job readiness (resume, LinkedIn, interview prep)",
  ];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div
      className="p-3 rounded"
      style={{
        backgroundColor: darkMode ? "#3a3b3c" : "#ffffff",
        color: darkMode ? "#f0f0f0" : "#000000",
        boxShadow: darkMode ? "0 0 5px rgba(255,255,255,0.1)" : "0 0 5px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <h5 className="mb-3" style={{ fontSize: "1rem", fontWeight: "bold" }}>{heading}</h5>

      <button
        className="btn w-100 mb-2"
        style={{
          color: darkMode ? "#ddd" : "#000",
          border: darkMode ? "1px solid #666" : "1px solid #0d6efd",
          backgroundColor: darkMode ? "#4b4c4d" : "#fff",
        }}
        onClick={() => toggleSection("general")}
      >
        {openSection === "general" ? "▼ For General Users" : "▶ For General Users"}
      </button>
      {openSection === "general" && (
        <div className="mb-3">
          {generalTopics.map((topic, idx) => (
            <button
              key={idx}
              className="btn w-100 mb-2"
              style={{
                color: darkMode ? "#ddd" : "#000",
                border: darkMode ? "1px solid #666" : "1px solid #0d6efd",
                backgroundColor: darkMode ? "#4b4c4d" : "#fff",
              }}
              onClick={() => onTopicClick(topic)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#3b82f6"; 
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode ? "#4b4c4d" : "#fff";
                e.target.style.color = darkMode ? "#ddd" : "#000";
              }}
            >
              {topic}
            </button>
          ))}
        </div>
      )}

      <button
        className="btn w-100 mb-2"
        style={{
          color: darkMode ? "#ddd" : "#000",
          border: darkMode ? "1px solid #666" : "1px solid #0d6efd",
          backgroundColor: darkMode ? "#4b4c4d" : "#fff",
        }}
        onClick={() => toggleSection("students")}
      >
        {openSection === "students" ? "▼ For Students" : "▶ For Students"}
      </button>
      {openSection === "students" && (
        <div>
          {studentTopics.map((topic, idx) => (
            <button
              key={idx}
              className="btn w-100 mb-2"
              style={{
                color: darkMode ? "#ddd" : "#000",
                border: darkMode ? "1px solid #666" : "1px solid #0d6efd",
                backgroundColor: darkMode ? "#4b4c4d" : "#fff",
              }}
              onClick={() => onTopicClick(topic)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#3b82f6"; 
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode ? "#4b4c4d" : "#fff";
                e.target.style.color = darkMode ? "#ddd" : "#000";
              }}
            >
              {topic}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopicsPanel;
