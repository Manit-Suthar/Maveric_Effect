import React, { useState, useEffect } from "react";
import { Mic } from "lucide-react";

function InputBar({ onSend, darkMode, inputValue, setInputValue, isLoading }) {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (inputValue !== undefined) {
      setInputValue(inputValue);
    }
  }, [inputValue, setInputValue]);

  const handleVoiceClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Voice recognition error: " + event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    onSend(inputValue);
    setInputValue("");
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className={`form-control ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
        placeholder="Type or speak your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleSend}
        disabled={isLoading}
      >
        Send
      </button>
      <button
        className={`btn btn-outline-secondary ${listening ? "active" : ""}`}
        type="button"
        onClick={handleVoiceClick}
        title="Speak"
      >
        <Mic size={20} />
      </button>
    </div>
  );
}

export default InputBar;
