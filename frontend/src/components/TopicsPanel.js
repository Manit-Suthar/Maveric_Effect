// TopicsPanel.js
import React, { useState } from "react";

function TopicsPanel({ onTopicClick, darkMode, heading, language }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sectionTranslations = {
    en: { general: "For General Users", students: "For Students" },
    hi: { general: "सामान्य उपयोगकर्ताओं के लिए", students: "छात्रों के लिए" },
    gu: { general: "સામાન્ય વપરાશકર્તાઓ માટે", students: "વિદ્યાર્થીઓ માટે" },
  };

  const topicTranslations = {
    en: {
      general: [
        "How to do online payments",
        "How to use Google Maps",
        "How to book train or bus tickets",
        "Basic computer skills (files, folders, devices, shortcuts)",
        "How to use Gmail",
      ],
      students: [
        "Technical skills for beginners",
        "Formal email formats and content",
        "Communication tools (Zoom, Meet, Teams)",
        "Career and job readiness (resume, LinkedIn, interview prep)",
      ],
    },
    hi: {
      general: [
        "ऑनलाइन भुगतान कैसे करें",
        "गूगल मैप्स का उपयोग कैसे करें",
        "ट्रेन या बस टिकट कैसे बुक करें",
        "बुनियादी कंप्यूटर ज्ञान (फाइलें, फोल्डर, डिवाइस, शॉर्टकट)",
        "जीमेल का उपयोग कैसे करें",
      ],
      students: [
        "शुरुआती के लिए तकनीकी कौशल",
        "औपचारिक ईमेल प्रारूप और सामग्री",
        "संचार उपकरण (Zoom, Meet, Teams)",
        "करियर और नौकरी की तैयारी (रिज़्यूमे, LinkedIn, साक्षात्कार तैयारी)",
      ],
    },
    gu: {
      general: [
        "ઓનલાઇન પેમેન્ટ કેવી રીતે કરવી",
        "ગૂગલ મેપ્સનો ઉપયોગ કેવી રીતે કરવો",
        "ટ્રેન અથવા બસ ટિકિટ કેવી રીતે બુક કરવી",
        "મૂળભૂત કમ્પ્યુટર કૌશલ્ય (ફાઈલો, ફોલ્ડર, ડિવાઈસ, શોર્ટકટ્સ)",
        "જીમેઇલનો ઉપયોગ કેવી રીતે કરવો",
      ],
      students: [
        "શરૂઆત માટે ટેકનિકલ સ્કિલ્સ",
        "ઔપચારિક ઈમેઈલ ફોર્મેટ અને કન્ટેન્ટ",
        "કમ્યુનિકેશન ટૂલ્સ (Zoom, Meet, Teams)",
        "કારકિર્દી અને નોકરી માટે તૈયારી (રિઝ્યૂમે, LinkedIn, ઇન્ટરવ્યુ તૈયારી)",
      ],
    },
  };

  const { general, students } = sectionTranslations[language] || sectionTranslations.en;
  const generalTopics = topicTranslations[language]?.general || topicTranslations.en.general;
  const studentTopics = topicTranslations[language]?.students || topicTranslations.en.students;

  return (
    <div
      className="p-3 rounded"
      style={{
        backgroundColor: darkMode ? "#3a3b3c" : "#ffffff",
        color: darkMode ? "#f0f0f0" : "#000000",
        boxShadow: darkMode ? "0 0 5px rgba(255,255,255,0.1)" : "0 0 5px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
        height: "100%",
        overflowY: "auto", // ✅ Only this panel scrolls
      }}
    >
      <h5 className="mb-3" style={{ fontSize: "1rem", fontWeight: "bold" }}>{heading}</h5>

      {/* General Section */}
      <button
        className="btn w-100 mb-2"
        style={{
          color: darkMode ? "#ddd" : "#000",
          border: darkMode ? "1px solid #666" : "1px solid #0d6efd",
          backgroundColor: darkMode ? "#4b4c4d" : "#fff",
        }}
        onClick={() => toggleSection("general")}
      >
        {openSection === "general" ? `▼ ${general}` : `▶ ${general}`}
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
              onClick={() => onTopicClick(topic)} // ✅ Sends topic in selected language
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

      {/* Student Section */}
      <button
        className="btn w-100 mb-2"
        style={{
          color: darkMode ? "#ddd" : "#000",
          border: darkMode ? "1px solid #666" : "1px solid #0d6efd",
          backgroundColor: darkMode ? "#4b4c4d" : "#fff",
        }}
        onClick={() => toggleSection("students")}
      >
        {openSection === "students" ? `▼ ${students}` : `▶ ${students}`}
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
              onClick={() => onTopicClick(topic)} // ✅ Sends topic in selected language
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
