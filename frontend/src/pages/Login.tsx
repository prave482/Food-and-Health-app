import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { Flame, Mail, Lock, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '', // FastAPI OAuth2 uses 'username' for the email field
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('registered=true')) {
      setSuccess('Registration successful! Please log in.');
    }
  }, [location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // FastAPI expects form-data for login
    const loginData = new URLSearchParams();
    loginData.append('username', formData.username);
    loginData.append('password', formData.password);

    try {
      const response = await api.post('/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
              <Flame className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-400 font-medium">Log in to continue your journey</p>
          </div>

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm mb-6 flex items-center justify-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4" /> {success}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-6 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block ml-1">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="w-full bg-white/[0.05] border border-white/10 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-600"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                <a href="#" className="text-xs font-bold text-orange-500 hover:text-orange-400">Forgot?</a>
              </div>
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
                <>Log In <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-gray-500 font-medium">
            Don't have an account? <Link to="/register" className="text-orange-500 hover:text-orange-400 font-bold transition-colors">Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
