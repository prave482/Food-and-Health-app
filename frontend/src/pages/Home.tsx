import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, BarChart3, ShieldCheck, Apple, Calendar, Bell, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Radial Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold text-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              NEW: AI Meal Scanning is here
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
              Unlock your <br />
              <span className="text-orange-500">peak potential.</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl font-medium leading-relaxed">
              Experience the future of fitness. Healthify combines cutting-edge AI meal scanning with deep nutritional insights to fuel your journey toward peak performance.
            </p>
            
            {/* Hero buttons removed per user request */}
          </motion.div>

          {/* Floating Stats Cards */}
          <div className="relative hidden lg:block">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-dark-card border border-dark-border p-6 rounded-2xl absolute top-0 right-0 w-64 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="bg-orange-primary/20 p-3 rounded-xl">
                  <Star className="w-6 h-6 text-orange-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2.4M</div>
                  <div className="text-sm text-text-secondary">Happy Users</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="bg-dark-card border border-dark-border p-6 rounded-2xl absolute top-40 right-40 w-64 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="bg-orange-primary/20 p-3 rounded-xl">
                  <Zap className="w-6 h-6 text-orange-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-text-secondary">AI Accuracy</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="bg-dark-card border border-dark-border p-6 rounded-2xl absolute top-80 right-0 w-64 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="bg-orange-primary/20 p-3 rounded-xl">
                  <Apple className="w-6 h-6 text-orange-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">500k+</div>
                  <div className="text-sm text-text-secondary">Verified Foods</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 border-y border-dark-border bg-dark-bgSecondary">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 text-center">
            <StatItem value="2.4M+" label="Active Users" />
            <div className="hidden md:block w-px h-12 bg-dark-border" />
            <StatItem value="50M+" label="Meals Tracked" />
            <div className="hidden md:block w-px h-12 bg-dark-border" />
            <StatItem value="98%" label="Satisfaction" />
            <div className="hidden md:block w-px h-12 bg-dark-border" />
            <StatItem value="500+" label="Superfoods" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-dark-bg" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need</h2>
            <div className="w-24 h-1.5 bg-orange-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Instant Tracking"
              description="Log your meals in seconds with our smart search and natural language processing."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6" />}
              title="Deep Insights"
              description="Visualize your macros and micros with beautiful, interactive charts and daily summaries."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6" />}
              title="AI Health Coach"
              description="Get personalized advice and answers to your health questions from our advanced AI engine."
            />
            <FeatureCard 
              icon={<Calendar className="w-6 h-6" />}
              title="Meal Planning"
              description="Generate weekly meal plans based on your preferences, allergies, and calorie goals."
            />
            <FeatureCard 
              icon={<ArrowRight className="w-6 h-6" />}
              title="Progress Charts"
              description="Track your weight, body fat, and performance metrics over time with ease."
            />
            <FeatureCard 
              icon={<Bell className="w-6 h-6" />}
              title="Smart Reminders"
              description="Never miss a meal or a water break with intelligent notifications that adapt to your schedule."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-dark-bgSecondary border-t border-dark-border">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20">Loved by thousands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard name="Alex Rivers" role="Fitness Enthusiast" text="The AI coach completely changed how I think about my macros. Highly recommend!" initials="AR" />
            <TestimonialCard name="Sarah Chen" role="Yoga Instructor" text="Interface is so clean. Finally a nutrition app that doesn't feel like a spreadsheet." initials="SC" />
            <TestimonialCard name="Mark Jones" role="Marathon Runner" text="Accurate tracking is key for my training. Healthify is the best I've used so far." initials="MJ" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl bg-dark-card border border-dark-border rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-orange-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 relative z-10">Ready to transform your health?</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto relative z-10">Join 2.4 million users already achieving their fitness goals with Healthify.</p>
          {/* CTA button removed per user request */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-dark-border bg-dark-bg">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Flame className="w-8 h-8 text-orange-primary" />
            <span className="text-2xl font-bold">Healthify</span>
          </div>
          <div className="flex justify-center gap-8 mb-12 text-text-secondary">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
          </div>
          <p className="text-text-secondary text-sm">© 2026 Healthify AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div>
    <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
    <div className="text-text-secondary text-sm font-medium">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-dark-card border border-dark-border p-8 rounded-2xl hover:border-orange-primary/40 transition-all group">
    <div className="bg-orange-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-primary group-hover:text-white transition-all text-orange-primary">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{description}</p>
  </div>
);

const TestimonialCard = ({ name, role, text, initials }: { name: string, role: string, text: string, initials: string }) => (
  <div className="bg-dark-card border border-dark-border p-8 rounded-2xl">
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-primary text-orange-primary" />)}
    </div>
    <p className="text-lg mb-8 text-white italic">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-orange-primary flex items-center justify-center font-bold text-white text-sm">
        {initials}
      </div>
      <div>
        <div className="font-bold">{name}</div>
        <div className="text-sm text-text-secondary">{role}</div>
      </div>
    </div>
  </div>
);

const Flame = ({ className }: { className?: string }) => (
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
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.204 1.146-3.146" />
  </svg>
);

export default Home;
