// InputBar.js
import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperPlane, FaPaperclip } from "react-icons/fa";

const InputBar = ({ onSend, darkMode, inputValue, setInputValue, placeholder = "Type your message..." }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + " " + transcript);
        setListening(false);
      };

      recognitionRef.current.onend = () => setListening(false);
      recognitionRef.current.onerror = () => setListening(false);
    }
  }, [setInputValue]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setInputValue(uploadedFile.name);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const iconColor = darkMode ? "#f8f8f8" : "#202020";
  const bgColor = darkMode ? "#1c1c1c" : "#f7f7f7";
  const borderColor = darkMode ? "#666" : "#ccc";
  const inputBg = darkMode ? "#2a2a2a" : "#fff";
  const textColor = darkMode ? "#fff" : "#000";

  return (
    <div
      className="d-flex align-items-center rounded px-3 py-2 mt-3"
      style={{
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        transition: "all 0.3s",
      }}
    >
      {/* File Upload Icon - Left */}
      <label className="me-2 mb-0" style={{ cursor: "pointer" }} title="Attach a file">
        <FaPaperclip size={18} color={iconColor} />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      {/* Input Area */}
      <textarea
        className="form-control me-2"
        rows={1}
        style={{
          resize: "none",
          backgroundColor: inputBg,
          color: textColor,
          border: "none",
          outline: "none",
          caretColor: textColor,
        }}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      {/* Mic Icon */}
      <button
        className="btn p-0 me-3"
        title="Voice input"
        onClick={toggleMic}
        style={{ border: "none", background: "none" }}
      >
        <FaMicrophone size={18} color={listening ? "#ff4d4d" : iconColor} />
      </button>

      {/* Send Icon */}
      <button
        className="btn p-0"
        onClick={handleSend}
        title="Send"
        style={{ border: "none", background: "none" }}
      >
        <FaPaperPlane size={20} color={iconColor} />
      </button>
    </div>
  );
};

export default InputBar;
