import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, TrendingUp, Shield, Smartphone, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-56">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
        
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold text-sm mb-8 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                V2.0 NOW LIVE: AI-POWERED MEAL TRACKING
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95]"
              >
                Elevate Health <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 italic">
                  Smart AI Nutrition.
                </span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-xl font-medium leading-relaxed"
              >
                Experience the future of fitness. Healthify combines cutting-edge AI meal scanning with deep nutritional insights to fuel your journey toward peak performance.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex items-center gap-8 text-sm font-bold text-gray-400 dark:text-gray-600">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-black bg-gray-200 dark:bg-gray-800" />
                  ))}
                </div>
                <span>Trusted by 2.4M+ elite performers</span>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-[3rem] p-4 shadow-2xl backdrop-blur-sm">
                <div className="bg-gray-50 dark:bg-black rounded-[2.5rem] overflow-hidden">
                  <div className="p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/20" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dashboard Preview</div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="h-4 w-1/3 bg-orange-500/20 rounded-full" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-orange-500/5 rounded-2xl border border-orange-500/10" />
                      <div className="h-24 bg-blue-500/5 rounded-2xl border border-blue-500/10" />
                    </div>
                    <div className="h-40 bg-gray-100 dark:bg-white/5 rounded-3xl" />
                  </div>
                </div>
              </div>
              
              {/* Floating Element 1 */}
              <motion.div 
                variants={floatVariants}
                animate="animate"
                className="absolute -top-12 -right-12 z-20 bg-orange-500 p-6 rounded-3xl shadow-xl shadow-orange-500/20 text-white"
              >
                <Zap className="w-8 h-8" />
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-12 z-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 p-5 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-400 uppercase">Growth</div>
                  <div className="text-xl font-black">+24%</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Target className="w-6 h-6" />}
              title="Smart Goal Setting"
              desc="Define your trajectory with AI-driven goal optimization tailored to your unique physiology."
            />
            <FeatureCard 
              icon={<Smartphone className="w-6 h-6" />}
              title="Instant Scan"
              desc="Log meals in seconds using state-of-the-art computer vision and deep nutritional database."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              title="Secure & Private"
              desc="Your data is encrypted and managed with enterprise-grade security protocols."
            />
          </div>
        </div>
      </section>

      {/* Visual Quote / CTA placeholder */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">Ready to join the <span className="text-orange-500 italic">elite?</span></h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 font-medium">Join 2.4 million users already achieving their fitness goals with Healthify.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-black">Healthify</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-bold text-gray-400 dark:text-gray-600">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="container mx-auto px-6 pt-12 text-center text-[10px] font-bold text-gray-500 dark:text-gray-700 uppercase tracking-widest">
          © 2026 Healthify AI Labs. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-orange-500/30 transition-all shadow-sm hover:shadow-xl hover:shadow-orange-500/5"
  >
    <div className="w-16 h-16 rounded-3xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-black mb-4">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{desc}</p>
  </motion.div>
);

const Flame = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.206 1.146-3" />
  </svg>
);

export default Home;
