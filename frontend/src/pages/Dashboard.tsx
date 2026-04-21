import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie 
} from 'recharts';
import { 
  Zap, Target, TrendingUp, Calendar, ChevronRight, 
  Droplets, Moon, Clock, Trophy 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [trendData, setTrendData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const [trendRes, summaryRes] = await Promise.all([
          api.get('/nutrition/weekly/'),
          api.get(`/nutrition/summary/?date=${today}`)
        ]);
        setTrendData(trendRes.data);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const macroData = [
    { name: 'Protein', value: summary?.total_protein || 0, target: summary?.goals?.target_protein || 150, color: '#3B82F6' },
    { name: 'Carbs', value: summary?.total_carbs || 0, target: summary?.goals?.target_carbs || 200, color: '#FF6B00' },
    { name: 'Fat', value: summary?.total_fat || 0, target: summary?.goals?.target_fat || 70, color: '#EAB308' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Welcome back, {summary?.goals?.full_name || 'Champion'}!</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Here's your performance breakdown for today.</p>
          </div>
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
            <Calendar className="text-orange-500 w-5 h-5" />
            <span className="font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Top Row: Main Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Daily Calorie Progress */}
          <div className="lg:col-span-2 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-32 h-32" />
            </div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-xs font-black uppercase tracking-widest block mb-2">Daily Calories</span>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-6xl font-black text-orange-500">{Math.round(summary?.total_calories || 0)}</h2>
                  <span className="text-gray-400 font-bold">/ {summary?.goals?.target_calories || 2000} kcal</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-500 font-black text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {Math.round(((summary?.total_calories || 0) / (summary?.goals?.target_calories || 2000)) * 100)}%
                </span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">of daily goal</span>
              </div>
            </div>
            <div className="w-full h-4 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(((summary?.total_calories || 0) / (summary?.goals?.target_calories || 2000)) * 100, 100)}%` }}
                className="h-full bg-orange-gradient shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              label="Water" 
              value="2.4" 
              unit="Liters" 
              icon={<Droplets className="w-5 h-5 text-blue-500" />} 
              progress={75}
              color="blue"
            />
            <StatCard 
              label="Sleep" 
              value="7.5" 
              unit="Hours" 
              icon={<Moon className="w-5 h-5 text-purple-500" />} 
              progress={85}
              color="purple"
            />
            <StatCard 
              label="Steps" 
              value="8,432" 
              unit="Steps" 
              icon={<Clock className="w-5 h-5 text-emerald-500" />} 
              progress={60}
              color="emerald"
            />
            <StatCard 
              label="Streak" 
              value="12" 
              unit="Days" 
              icon={<Trophy className="w-5 h-5 text-yellow-500" />} 
              progress={100}
              color="yellow"
            />
          </div>
        </div>

        {/* Bottom Row: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity */}
          <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <TrendingUp className="text-orange-500 w-5 h-5" /> Weekly Intake Trend
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} opacity={0.1} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#666" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', { weekday: 'short' })}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#FF6B00' }}
                  />
                  <Area type="monotone" dataKey="calories" stroke="#FF6B00" strokeWidth={4} fillOpacity={1} fill="url(#colorCal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Macro Distribution */}
          <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Target className="text-orange-500 w-5 h-5" /> Macronutrient Balance
            </h3>
            <div className="space-y-6">
              {macroData.map((macro) => (
                <div key={macro.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{macro.name}</span>
                    <span className="text-sm font-black">{Math.round(macro.value)}g <span className="text-gray-500">/ {macro.target}g</span></span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((macro.value / macro.target) * 100, 100)}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: macro.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, unit, icon, progress, color }: any) => {
  const colorMap: any = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:border-orange-500/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-xl">
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
      </div>
      <div className="mb-4">
        <h4 className="text-2xl font-black dark:text-white">{value}</h4>
        <p className="text-[10px] font-bold text-gray-500 uppercase">{unit}</p>
      </div>
      <div className="w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorMap[color] || 'bg-orange-500'}`} 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
