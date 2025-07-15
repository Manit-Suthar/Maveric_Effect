import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import TopicsPanel from "./components/TopicsPanel";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const topics = [
    "How to pay using UPI (GPay, PhonePe)",
    "How to share images on WhatsApp",
    "How to secure your smartphone",
    "How to create a strong password",
    "How to book train tickets online",
    "How to use Google Maps"
  ];

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
    setInputValue(topic); // Put selected topic into input bar first
  };

  return (
    <div
      className={`min-vh-100 py-4 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
      style={{ transition: "all 0.3s" }}
    >
      <div className="container-fluid" style={{ maxWidth: "1400px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-center w-100" style={{ margin: 0 }}>Digital Literacy AI Chatbot</h3>
          <div className="position-absolute end-0 me-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkModeSwitch"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                Dark
              </label>
            </div>
          </div>
        </div>

              <div className="row">
        {/* Topics Panel on the left */}
        <div className="col-md-3 col-lg-2 mb-3">
          <TopicsPanel
            topics={topics}
            onTopicClick={handleTopicClick}
            darkMode={darkMode}
            heading="Need help? Choose a topic:"
          />
        </div>

        {/* Chat window on the right */}
        <div className="col-md-9 col-lg-10">
          <ChatWindow messages={messages} darkMode={darkMode} />
          <InputBar
            onSend={handleSendMessage}
            darkMode={darkMode}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
