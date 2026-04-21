import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, LayoutDashboard, Utensils } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#141414]/80 backdrop-blur-md border-b border-[#2A2A2A]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-orange-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">Healthify</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/dashboard" className="text-sm font-bold text-white/60 hover:text-white transition-colors flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link to="/tracker" className="text-sm font-bold text-white/60 hover:text-white transition-colors flex items-center gap-2">
            <Utensils className="w-4 h-4" /> Meal Tracker
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="bg-orange-primary hover:bg-orange-light text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95 shadow-lg shadow-orange-500/20">
            Open App
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
