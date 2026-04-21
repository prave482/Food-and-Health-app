import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Flame, User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Debug log to confirm endpoint
      console.log('Attempting registration at:', api.defaults.baseURL + '/auth/register');
      const response = await api.post('/auth/register', formData);
      console.log('Registration success:', response.data);
      navigate('/login?registered=true');
    } catch (err: any) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.detail || 'Registration failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
              <Flame className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Join Healthify</h1>
            <p className="text-gray-400 font-medium">Start your elite health journey</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-6 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block ml-1">Full Name</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-white/[0.05] border border-white/10 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-600"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block ml-1">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="w-full bg-white/[0.05] border border-white/10 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-600"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.05] border border-white/10 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-600"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>Create Account <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-orange-500 hover:text-orange-400 font-bold transition-colors">Log In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
