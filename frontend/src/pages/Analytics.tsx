import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line, Legend
} from 'recharts';
import { Activity, TrendingUp, Calendar, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics: React.FC = () => {
  const [trendData, setTrendData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/nutrition/weekly/');
        setTrendData(res.data);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Deep Analytics</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Long-term nutritional trends and insights.</p>
          </div>
          <button className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4" /> Last 30 Days
          </button>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Calorie Progress Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-10 shadow-sm"
          >
            <h3 className="text-xl font-bold mb-10 flex items-center gap-2">
              <Activity className="text-orange-500 w-5 h-5" /> Calorie Consumption Over Time
            </h3>
            <div className="h-[400px]">
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
                    tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#FF6B00' }}
                  />
                  <Area type="monotone" dataKey="calories" stroke="#FF6B00" strokeWidth={4} fillOpacity={1} fill="url(#colorCal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mock Weekly Comparison */}
            <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-8">Weekly Comparison</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Last Week', calories: 15400 },
                    { name: 'This Week', calories: 16800 },
                  ]}>
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="calories" fill="#FF6B00" radius={[10, 10, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Protein Consistency */}
            <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-8">Protein Consistency</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} opacity={0.1} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', { day: 'numeric' })}
                    />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '12px', color: '#fff' }} />
                    <Line type="monotone" dataKey="protein" stroke="#3B82F6" strokeWidth={4} dot={{ r: 4, fill: '#3B82F6' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
