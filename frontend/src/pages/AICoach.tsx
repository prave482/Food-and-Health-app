import React, { useState } from 'react';
import api from '../api/axios';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Welcome to your personal performance lab. I'm your AI health coach, trained on elite nutrition protocols. What's on your mind today?" }
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
      const res = await api.post('/ai/coach/', { message: input });
      setMessages(prev => [...prev, { role: 'bot', text: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm currently recalibrating. Please check back in a moment or try a different question." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl h-[calc(100vh-12rem)] flex flex-col">
        <header className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-2xl">
            <Sparkles className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">AI Health Coach</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm italic">Powered by Healthify Intelligence</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto mb-8 space-y-6 pr-4 custom-scrollbar">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-[70%] p-6 rounded-[2rem] flex gap-4 ${
                  msg.role === 'user' 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 rounded-tr-none' 
                    : 'bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-tl-none shadow-sm'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-white/20' : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    {msg.role === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <p className="text-sm md:text-base leading-relaxed font-medium">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 p-4 rounded-3xl flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                <span className="text-sm text-gray-500 font-bold uppercase tracking-widest text-[10px]">Thinking...</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative">
          <form onSubmit={sendMessage} className="relative z-10">
            <input 
              className="w-full bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 rounded-[2rem] px-8 py-6 pr-20 outline-none focus:border-orange-500/50 transition-all text-gray-900 dark:text-white shadow-xl dark:shadow-none"
              placeholder="Describe your goals or ask for a meal plan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button 
              disabled={loading || !input.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-4 rounded-2xl hover:bg-orange-600 transition-all disabled:opacity-50 shadow-lg shadow-orange-500/20 active:scale-90"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {["High protein breakfast?", "Analyze my trends", "Recovery tips"].map((prompt) => (
              <button 
                key={prompt}
                onClick={() => setInput(prompt)}
                className="text-[10px] font-black uppercase tracking-widest bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 px-5 py-2.5 rounded-full whitespace-nowrap hover:border-orange-500/50 hover:text-orange-500 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
