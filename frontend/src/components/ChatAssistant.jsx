import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import api from "../services/api";

function ChatAssistant({ crmData, setCrmData }) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! Tell me about today's doctor interaction.",
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await api.post("/chat/", {
        message: input,
      });

      setCrmData(res.data);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "✅ CRM Form Updated Successfully.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to process your request.",
        },
      ]);
    }

    setInput("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border h-[700px] flex flex-col">

      <div className="p-5 border-b bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-2xl">

        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bot size={22}/>
          AI Assistant
        </h2>

        <p className="text-sm opacity-90">
          Ask AI to extract or edit CRM details
        </p>

      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] rounded-xl p-3 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100"
              }`}
            >

              <div className="flex items-center gap-2 mb-1">

                {msg.sender === "user" ? (
                  <User size={16}/>
                ) : (
                  <Bot size={16}/>
                )}

                <span className="font-semibold">
                  {msg.sender === "user"
                    ? "You"
                    : "AI"}
                </span>

              </div>

              <p>{msg.text}</p>

            </div>

          </div>

        ))}

      </div>

      <div className="border-t p-4 flex gap-3">

        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=>e.key==="Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded-xl p-3"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl"
        >
          <Send size={20}/>
        </button>

      </div>

    </div>
  );
}

export default ChatAssistant;