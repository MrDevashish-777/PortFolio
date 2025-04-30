import { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm Devashish's AI Assistant. Ask me anything about his projects or skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (data?.reply) {
        setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...updatedMessages, { role: "assistant", content: "⚠️ No reply from bot." }]);
      }
    } catch (err) {
      setMessages([...updatedMessages, { role: "assistant", content: "⚠️ Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[320px] bg-white dark:bg-gray-900 shadow-2xl rounded-xl border border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm">
        Devashish’s AI Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm max-h-[300px]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-indigo-100 text-right"
                : "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-left"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <p className="text-gray-400">Typing...</p>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="flex border-t border-gray-200 dark:border-gray-700">
        <input
          type="text"
          className="flex-grow p-2 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
          placeholder="Ask something about Devashish..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 hover:bg-indigo-700 transition text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
