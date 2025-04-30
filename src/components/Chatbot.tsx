// src/components/Chatbot.tsx
import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/chat", {
        messages: updatedMessages,
      });

      setMessages([...updatedMessages, { role: "assistant", content: response.data.reply }]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "⚠️ Error reaching AI. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-[300px] bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 text-white font-semibold">
        🤖 Ask Devashish's AI Assistant
      </div>
      <div className="p-3 max-h-[300px] overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              msg.role === "user"
                ? "bg-indigo-100 text-gray-800 self-end"
                : "bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-400">AI is typing...</div>}
      </div>
      <div className="flex border-t border-gray-200 dark:border-gray-700">
        <input
          className="flex-grow p-2 text-sm bg-transparent outline-none"
          placeholder="Ask about Devashish's work..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-indigo-500 text-white px-3 hover:bg-indigo-600 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
