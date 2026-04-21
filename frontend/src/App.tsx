import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MealTracker from './pages/MealTracker';
import Dashboard from './pages/Dashboard';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // Auto-login for guest mode
  React.useEffect(() => {
    localStorage.setItem('token', 'guest_token_bypass');
  }, []);
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/tracker" 
              element={<PrivateRoute><MealTracker /></PrivateRoute>} 
            />
            <Route 
              path="/dashboard" 
              element={<PrivateRoute><Dashboard /></PrivateRoute>} 
            />
            <Route 
              path="/analytics" 
              element={<PrivateRoute><Analytics /></PrivateRoute>} 
            />
            <Route 
              path="/profile" 
              element={<PrivateRoute><Profile /></PrivateRoute>} 
            />
          </Routes>
        </main>
        <footer className="py-10 text-center text-gray-400 text-sm">
          © 2026 Healthify AI. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
