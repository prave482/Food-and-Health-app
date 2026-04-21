import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, TrendingUp, Shield, Smartphone, Github, Heart, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-56 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] will-change-transform" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold text-sm mb-8">
                TRUSTED BY 2.4M+ ELITE USERS
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95]">
                Master Your <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600 italic">
                  Nutrition.
                </span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-xl font-medium leading-relaxed">
                Healthify is the world's most advanced nutritional performance platform. Track every macro, analyze every trend, and reach your peak potential with precision data.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex gap-4">
                <Link to="/dashboard" className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl shadow-orange-500/20">
                  Enter Dashboard
                </Link>
                <Link to="/tracker" className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-10 py-5 rounded-full font-black text-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
                  Log a Meal
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              <div className="relative bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-[3rem] p-8 shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-black text-xl">Daily Performance</h3>
                  <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-4 bg-gray-100 dark:bg-white/5 rounded-full w-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-[70%]" style={{ width: `${40 + i*20}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-24 bg-white dark:bg-[#050505] transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Built for Excellence</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">We've combined sports science with modern technology to give you the ultimate edge in your health journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Target className="w-6 h-6" />}
              title="Hyper-Personalized Goals"
              desc="Our algorithms calculate your precise caloric and macronutrient requirements based on your unique metabolic profile, activity levels, and body composition goals."
            />
            <FeatureCard 
              icon={<ActivityIcon className="w-6 h-6" />}
              title="Real-Time Analytics"
              desc="Visualize your progress with deep-dive charts. Understand how every meal impacts your weekly trends and long-term health markers with our intuitive data engine."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              title="Privacy First Data"
              desc="Your health data is sacred. We use multi-layered encryption to ensure your personal nutrition logs remain completely private and under your total control."
            />
            <FeatureCard 
              icon={<Heart className="w-6 h-6" />}
              title="Heart-Healthy Choices"
              desc="Our database prioritizes nutrient density, helping you choose foods that support cardiovascular health, reduce inflammation, and improve longevity."
            />
            <FeatureCard 
              icon={<Award className="w-6 h-6" />}
              title="Performance Optimized"
              desc="Tailored for athletes and high-performers who need exact precision in their fuel. Optimize your timing and ratios for maximum physical output."
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6" />}
              title="Community Driven"
              desc="Join a global network of health-conscious individuals. Share insights, stay motivated, and achieve your goals alongside 2.4 million others."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="bg-orange-500 rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="flex-1 relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Your Health, <br />Reimagined.</h2>
              <p className="text-xl text-white/80 mb-10 font-medium max-w-xl">
                Healthify isn't just another tracker. It's a comprehensive ecosystem designed to eliminate guesswork and provide the clarity you need to succeed.
              </p>
              <ul className="space-y-4 font-bold">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  No confusing ads or hidden paywalls
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  Instant syncing across all your devices
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  Verified nutritional database of 1M+ items
                </li>
              </ul>
            </div>
            <div className="flex-1 relative z-10">
              <div className="bg-black/20 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10">
                <div className="text-center py-12">
                  <h4 className="text-2xl font-black mb-2 italic">"The only app that actually understands my metabolism."</h4>
                  <p className="text-white/60 font-bold uppercase tracking-widest text-xs">- Sarah J., Professional Triathlete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <FlameIcon className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-black">Healthify</span>
          </div>
          <div className="text-gray-500 font-bold text-sm mb-4">© 2026 Healthify Performance Labs. All rights reserved.</div>
          <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Designed for elite performance</div>
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
    className="group p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-orange-500/30 transition-all shadow-sm"
  >
    <div className="w-16 h-16 rounded-3xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-black mb-4">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{desc}</p>
  </motion.div>
);

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const FlameIcon = ({ className }: { className?: string }) => (
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
