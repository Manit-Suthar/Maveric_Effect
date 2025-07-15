import React from "react";

// This component displays a single message
function Message({ sender, text }) {
  // Determine styling based on who sent the message
  const isUser = sender === "user";

  return (
    <div
      className={`d-flex mb-2 ${isUser ? "justify-content-end" : "justify-content-start"}`}
    >
      <div
        className={`p-2 rounded ${isUser ? "bg-primary text-white" : "bg-light text-dark"}`}
        style={{ maxWidth: "70%" }}
      >
        {text}
      </div>
    </div>
  );
}

export default Message;
