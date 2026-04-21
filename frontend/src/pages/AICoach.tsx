import React, { useState } from 'react';
import api from '../api/axios';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your AI health coach. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/coach', { message: input });
      setMessages(prev => [...prev, { role: 'bot', text: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl flex gap-3 ${
              msg.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-gray-100 shadow-sm'
            }`}>
              {msg.role === 'bot' && <Bot className="w-5 h-5 mt-1 shrink-0" />}
              <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
              {msg.role === 'user' && <User className="w-5 h-5 mt-1 shrink-0" />}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-gray-500">Coach is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="relative">
        <input 
          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 pr-16 outline-none focus:ring-2 focus:ring-primary shadow-sm"
          placeholder="Ask about your diet, goals, or health..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button 
          disabled={loading || !input.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {["What should I eat for energy?", "Analyze my week", "Am I eating enough protein?"].map((prompt) => (
          <button 
            key={prompt}
            onClick={() => setInput(prompt)}
            className="text-xs bg-gray-100 text-gray-600 px-4 py-2 rounded-full whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AICoach;
