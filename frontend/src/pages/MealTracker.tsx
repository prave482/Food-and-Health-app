import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, Search, Loader2, Utensils, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Meal {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  meal_type: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const MealTracker: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newMeal, setNewMeal] = useState({
    name: '',
    quantity: 100,
    unit: 'g',
    meal_type: 'breakfast'
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await api.get('/meals/');
      setMeals(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/meals/', newMeal);
      setIsAdding(false);
      setNewMeal({ name: '', quantity: 100, unit: 'g', meal_type: 'breakfast' });
      fetchMeals();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMeal = async (id: number) => {
    try {
      await api.delete(`/meals/${id}/`);
      setMeals(meals.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs mb-2">
              <Utensils className="w-4 h-4" /> Daily Log
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Today's Nutrition</h1>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-orange-500/20 active:scale-95"
          >
            <Plus className="w-6 h-6" /> Log Meal
          </button>
        </header>

        {/* Daily Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <SummaryCard label="Calories" value={meals.reduce((acc, m) => acc + m.calories, 0)} unit="kcal" icon={<Zap className="w-4 h-4" />} />
          <SummaryCard label="Protein" value={meals.reduce((acc, m) => acc + m.protein, 0)} unit="g" />
          <SummaryCard label="Carbs" value={meals.reduce((acc, m) => acc + m.carbs, 0)} unit="g" />
          <SummaryCard label="Fat" value={meals.reduce((acc, m) => acc + m.fat, 0)} unit="g" />
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 min-h-[400px]">
          {loading && meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
              <p className="text-gray-500 font-medium">Fetching your nutrition log...</p>
            </div>
          ) : meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="bg-white/[0.03] p-6 rounded-full mb-6">
                <Info className="w-12 h-12 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No meals logged today</h2>
              <p className="text-gray-500 max-w-sm">Start tracking your intake by clicking the "Log Meal" button above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {meals.map((meal) => (
                  <motion.div 
                    key={meal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-orange-500/30 transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1 block">{meal.meal_type}</span>
                      <h3 className="text-xl font-bold text-white mb-1">{meal.name}</h3>
                      <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                        <span>{meal.quantity}{meal.unit}</span>
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        <span className="text-orange-400">{Math.round(meal.calories)} kcal</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right hidden md:block">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-1">P / C / F</span>
                        <span className="text-sm font-bold text-gray-300">
                          {Math.round(meal.protein)}g <span className="text-gray-700 mx-1">/</span> {Math.round(meal.carbs)}g <span className="text-gray-700 mx-1">/</span> {Math.round(meal.fat)}g
                        </span>
                      </div>
                      <button 
                        onClick={() => deleteMeal(meal.id)} 
                        className="w-10 h-10 rounded-xl bg-white/[0.02] flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Add Meal Modal */}
        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#1A1A1A] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-extrabold mb-2">Log Meal</h2>
                  <p className="text-gray-500 font-medium text-sm">Add food to your daily nutrition log</p>
                </div>
                
                <form onSubmit={handleAddMeal} className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block ml-1">Food Name</label>
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        required
                        className="w-full bg-white/[0.05] border border-white/10 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-gray-600"
                        placeholder="e.g. Greek Yogurt"
                        value={newMeal.name}
                        onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block ml-1">Quantity</label>
                      <input 
                        type="number"
                        className="w-full bg-white/[0.05] border border-white/10 px-4 py-4 rounded-2xl outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-white"
                        value={newMeal.quantity}
                        onChange={(e) => setNewMeal({...newMeal, quantity: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block ml-1">Category</label>
                      <select 
                        className="w-full bg-white/[0.05] border border-white/10 px-4 py-4 rounded-2xl outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-white"
                        value={newMeal.meal_type}
                        onChange={(e) => setNewMeal({...newMeal, meal_type: e.target.value})}
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-4 text-gray-500 font-bold hover:text-white transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all">Add to Log</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, unit, icon }: any) => (
  <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 relative group hover:border-orange-500/30 transition-all overflow-hidden">
    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
      {icon}
    </div>
    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest block mb-2">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-extrabold text-white">{Math.round(value)}</span>
      <span className="text-gray-600 text-xs font-bold uppercase">{unit}</span>
    </div>
  </div>
);

const Zap = ({ className }: { className?: string }) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default MealTracker;
