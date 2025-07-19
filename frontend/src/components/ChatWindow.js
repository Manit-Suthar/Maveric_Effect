import React from "react";

function ChatWindow({ messages, darkMode }) {
  const userIconLight = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";
  const userIconDark = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  return (
    <div
      className="mb-3 p-3 border rounded"
      style={{
        background: darkMode ? "#1f1f1f" : "#f9f9f9",
        height: "70vh",
        overflowY: "auto",
        border: `2px solid ${darkMode ? "#444" : "#ccc"}`,
        transition: "all 0.3s ease-in-out",
        borderRadius: "12px"
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`d-flex my-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
        >
          {msg.sender === "bot" && (
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt="Bot"
              style={{ width: "32px", height: "32px", marginRight: "8px", borderRadius: "50%" }}
            />
          )}

          <div
            className={`p-3 shadow-sm ${msg.sender === "user"
              ? "text-white"
              : "text-white"
              }`}
            style={{
              maxWidth: "75%",
              borderRadius: "16px",
              backgroundColor: msg.sender === "user"
                ? "#0078d4"
                : darkMode ? "#444" : "#2a9d8f",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              wordBreak: "break-word"
            }}
          >
            {msg.text.split(/\.\s+|\n/).map((line, idx) => (
              <p key={idx} style={{ marginBottom: "0.5rem", marginTop: 0 }}>
                {line.trim()}{line.trim() && !line.trim().endsWith('.') ? '.' : ''}
              </p>
            ))}
          </div>

          {msg.sender === "user" && (
            <img
              src={darkMode ? userIconDark : userIconLight}
              alt="User"
              style={{ width: "32px", height: "32px", marginLeft: "8px", borderRadius: "50%" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
