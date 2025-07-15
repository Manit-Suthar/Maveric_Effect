import React from "react";

function ChatWindow({ messages, darkMode }) {
  // User icons
  const userIconLight = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";
  const userIconDark = "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // <-- change this!

  return (
    <div
      className="mb-3 p-3 border rounded"
      style={{
        background: darkMode ? "#2c2c2c" : "#ffffff",
        height: "70vh",
        overflowY: "auto",
        transition: "all 0.3s",
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
                ? "bg-primary text-white"
                : darkMode
                  ? "bg-secondary text-white"
                  : "bg-light text-dark"
              } ${msg.text === "Bot is replying..." ? "bot-replying" : ""}`}
            style={{
              maxWidth: "70%",
              borderRadius: "20px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
              wordBreak: "break-word",
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
              style={{
                width: "32px",
                height: "32px",
                marginLeft: "8px",
                borderRadius: "50%",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
