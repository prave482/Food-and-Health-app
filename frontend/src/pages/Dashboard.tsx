import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../api/axios';
import { Trophy, Flame, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [trendData, setTrendData] = useState([]);
  const [summary, setSummary] = useState<any>(null);

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
        console.error('Error fetching dashboard data:', err);
      }
    };
    fetchData();
  }, []);

  const macroData = summary ? [
    { name: 'Protein', value: summary.total_protein, color: '#FF6B00' },
    { name: 'Carbs', value: summary.total_carbs, color: '#FF8C38' },
    { name: 'Fat', value: summary.total_fat, color: '#FF6B0040' },
  ] : [];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs mb-2">
            <TrendingUp className="w-4 h-4" /> Real-time Analytics
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Performance Dashboard</h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Weekly Trend */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/[0.03] backdrop-blur-xl p-8 rounded-[2rem] border border-white/5"
          >
            <h2 className="text-xl font-bold mb-8">7-Day Calorie Trend</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#1A1A1A', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}}
                  />
                  <Line type="monotone" dataKey="calories" stroke="#FF6B00" strokeWidth={4} dot={{r: 6, fill: '#FF6B00', strokeWidth: 2, stroke: '#0D0D0D'}} activeDot={{r: 8}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Macro Breakdown */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-8 w-full text-left">Daily Macros</h2>
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold">{summary ? Math.round(summary.total_calories) : 0}</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">kcal</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {macroData.map(m => (
                <div key={m.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: m.color}} />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{m.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <StatCard 
            icon={<Flame className="w-6 h-6 text-orange-500" />}
            label="Current Streak"
            value="12 Days"
            sub="2 days longer than last week"
          />
          <StatCard 
            icon={<Target className="w-6 h-6 text-orange-500" />}
            label="Calorie Target"
            value={summary ? `${Math.round((summary.total_calories / summary.goals.target_calories) * 100)}%` : '0%'}
            sub={summary ? `${Math.round(summary.total_calories)} / ${summary.goals.target_calories} kcal` : 'Setting up...'}
          />
          <StatCard 
            icon={<Trophy className="w-6 h-6 text-orange-500" />}
            label="Main Goal"
            value="Muscle Gain"
            sub="Progress: +1.2kg this month"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 flex items-center gap-6"
  >
    <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500">{icon}</div>
    <div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">{label}</span>
      <span className="text-3xl font-extrabold block text-white">{value}</span>
      <span className="text-xs text-gray-400 font-medium">{sub}</span>
    </div>
  </motion.div>
);

export default Dashboard;
