import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import TopicsPanel from "./components/TopicsPanel";
import axios from "axios";
import { FaMoon, FaSun } from "react-icons/fa";

function App() {
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      heading: "🇮🇳 TechVidhya 💻",
      placeholder: "💬 Ask your question...",
      chooseTopic: "📚 Need help? Choose a topic",
    },
    hi: {
      heading: "🇮🇳 टेकविद्या 💻",
      placeholder: "💬 अपना सवाल पूछें...",
      chooseTopic: "📚 मदद चाहिए? कोई विषय चुनें",
    },
    gu: {
      heading: "🇮🇳 ટેકવિદ્યા 💻",
      placeholder: "💬 તમારો પ્રશ્ન અહીં લખો...",
      chooseTopic: "📚 મદદ જોઈએ છે? કોઈ વિષય પસંદ કરો",
    },
  };


  const { heading, placeholder } = translations[language];

  const handleSendMessage = async (userText) => {
    if (!userText.trim()) return;

    const userMessage = { sender: "user", text: userText };
    const typingMessage = { sender: "bot", text: "Bot is replying..." };

    setMessages((prev) => [...prev, userMessage, typingMessage]);

    try {
      const response = await axios.post("/api/message", { message: userText });
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = botMessage;
        return updated;
      });
    } catch (error) {
      console.error(error);
      const botMessage = { sender: "bot", text: "Failed to get response from Gemini API." };
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = botMessage;
        return updated;
      });
    }
  };

  const handleTopicClick = (topic) => {
    setInputValue(topic);
  };

  return (
    <div
      className={`min-vh-100 py-4 ${darkMode ? "dark-mode" : ""}`}
      style={{
        transition: "all 0.3s",
        backgroundColor: darkMode ? "#121212" : "#e0f7fa",
      }}
    >

      <div className="container-fluid" style={{ maxWidth: "1400px" }}>
        {/* Title and toggle */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <h2 className="mx-auto text-center fw-bold" style={{ color: darkMode ? "#f5f5f5" : "#222" }}>
            {heading}
          </h2>

          {/* Dark Mode Toggle */}
          <div
            className="border rounded p-2 me-2"
            style={{
              borderColor: darkMode ? "#ccc" : "#333",
              backgroundColor: darkMode ? "#333" : "#fff",
              transition: "all 0.3s",
              cursor: "pointer",
            }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun color="#ffcc00" /> : <FaMoon color="#222" />}
          </div>

          {/* Language Selector */}
          <select
            className="form-select form-select-sm"
            style={{ width: "150px" }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en"> English</option>
            <option value="hi"> हिंदी</option>
            <option value="gu"> ગુજરાતી</option>
          </select>
        </div>

        {/* Main chat area */}
        <div className="row g-4">
          <div className="col-md-3 col-lg-2" style={{ height: "85vh", overflow: "hidden" }}>
            <div
              className="rounded p-2.5 h-100"
              style={{
                backgroundColor: darkMode ? "#292929" : "#ffffff",
                border: darkMode ? "2px solid #777" : "2px solid #ccc",

              }}
            >
              <TopicsPanel
                onTopicClick={handleTopicClick}
                darkMode={darkMode}
                heading={translations[language].chooseTopic}
                language={language}
                translations={translations}
              />
            </div>
          </div>

          <div className="col-md-9 col-lg-10">
            <div
              className="border p-3 rounded"
              style={{
                borderWidth: "2px",
                backgroundColor: darkMode ? "#2e2e2e" : "#fff",
              }}
            >
              <ChatWindow messages={messages} darkMode={darkMode} />
              <InputBar
                onSend={handleSendMessage}
                darkMode={darkMode}
                inputValue={inputValue}
                setInputValue={setInputValue}
                placeholder={placeholder}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
