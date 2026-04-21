import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, LayoutDashboard, Utensils, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#2A2A2A] transition-colors duration-300"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-orange-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">Healthify</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/dashboard" className="text-sm font-bold text-gray-500 dark:text-white/60 hover:text-orange-500 dark:hover:text-white transition-colors flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link to="/tracker" className="text-sm font-bold text-gray-500 dark:text-white/60 hover:text-orange-500 dark:hover:text-white transition-colors flex items-center gap-2">
            <Utensils className="w-4 h-4" /> Meal Tracker
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="bg-orange-primary hover:bg-orange-light text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95 shadow-lg shadow-orange-500/20">
            Open App
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
