import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import {
  INITIAL_MESSAGES,
  Message,
} from "../../lib/constants/components/ChatInterface";
export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };
  return (
    <div className="flex h-[calc(100vh-80px)] bg-white overflow-hidden border-t border-charcoal/5">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-charcoal/5 bg-cream/30 hidden md:flex flex-col">
        <div className="p-6 border-b border-charcoal/5">
          <h2 className="font-serif text-2xl text-charcoal">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`p-6 border-b border-charcoal/5 cursor-pointer hover:bg-white transition-colors ${
                i === 1 ? "bg-white border-l-4 border-l-gold" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-serif font-medium text-lg">
                  Eleanor Sterling
                </h3>
                <span className="text-xs text-charcoal-light">10:36 AM</span>
              </div>
              <p className="text-sm text-charcoal-light line-clamp-1">
                Yes, the infinity pool is heated year-round...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white relative">
        {/* Chat Header */}
        <div className="p-6 border-b border-charcoal/5 flex justify-between items-center bg-white z-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                alt="Host"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h3 className="font-serif text-lg text-charcoal">
                Eleanor Sterling
              </h3>
              <p className="text-xs text-charcoal-light uppercase tracking-wider">
                Typically replies in 1 hr
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-charcoal-light">
            <button className="p-2 hover:bg-cream rounded-full transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-cream rounded-full transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-cream rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 bg-cream/20">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-6 rounded-sm shadow-sm ${
                    msg.sender === "me"
                      ? "bg-charcoal text-white rounded-tr-none"
                      : "bg-white text-charcoal border border-charcoal/5 rounded-tl-none"
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <div
                    className={`text-[10px] mt-2 uppercase tracking-widest opacity-60 ${
                      msg.sender === "me" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-charcoal/5">
          <form onSubmit={handleSend} className="flex items-center space-x-4">
            <button
              type="button"
              className="p-3 text-charcoal-light hover:text-gold transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-cream/30 border border-charcoal/10 p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 placeholder:text-charcoal/30"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-4 bg-gold text-white hover:bg-charcoal disabled:opacity-50 disabled:hover:bg-gold transition-colors duration-300"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
