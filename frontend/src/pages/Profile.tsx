import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Save, User as UserIcon, Calculator } from 'lucide-react';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>({
    full_name: '',
    email: '',
    target_calories: 2000,
    target_protein: 150,
    target_carbs: 250,
    target_fat: 70,
    weight_goal: 'maintenance'
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/profile');
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', profile);
      alert('Profile updated!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-2xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-primary/10 rounded-2xl text-primary">
          <UserIcon className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-500">Manage your health goals and personal info</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Personal Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Full Name</label>
              <input 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                value={profile.full_name}
                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
              <input 
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-400"
                value={profile.email}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Health Goals
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Calorie Target</label>
              <input 
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                value={profile.target_calories}
                onChange={(e) => setProfile({...profile, target_calories: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Goal Type</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                value={profile.weight_goal}
                onChange={(e) => setProfile({...profile, weight_goal: e.target.value})}
              >
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Protein (g)</label>
              <input type="number" className="w-full p-2 border rounded-lg" value={profile.target_protein} onChange={(e) => setProfile({...profile, target_protein: Number(e.target.value)})} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Carbs (g)</label>
              <input type="number" className="w-full p-2 border rounded-lg" value={profile.target_carbs} onChange={(e) => setProfile({...profile, target_carbs: Number(e.target.value)})} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Fat (g)</label>
              <input type="number" className="w-full p-2 border rounded-lg" value={profile.target_fat} onChange={(e) => setProfile({...profile, target_fat: Number(e.target.value)})} />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </form>

      {/* BMI Widget */}
      <div className="mt-12 bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-3xl text-white">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-6 h-6" />
          <h3 className="text-xl font-bold">BMI Calculator</h3>
        </div>
        <p className="text-green-50 mb-6 text-sm">Calculate your Body Mass Index to see your healthy weight range.</p>
        <div className="grid grid-cols-2 gap-4 mb-4 text-black">
          <input placeholder="Height (cm)" className="p-3 rounded-xl outline-none" />
          <input placeholder="Weight (kg)" className="p-3 rounded-xl outline-none" />
        </div>
        <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">Calculate</button>
      </div>
    </div>
  );
};

export default Profile;
