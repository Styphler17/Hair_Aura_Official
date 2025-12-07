import React, { useState } from 'react';
import { ArrowRight, Lock, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password for demo
      onLogin();
    } else {
      setError('Invalid Access Key');
    }
  };

  const handleReturnHome = () => {
    // Reloading to root cleans up the url state 
    window.location.href = '/'; 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="bg-white p-8 md:p-12 shadow-2xl border-t-4 border-aura-gold max-w-md w-full relative">
        
        {/* Decorative Gold Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aura-black via-aura-gold to-aura-black opacity-20"></div>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-aura-gold rounded-full flex items-center justify-center mx-auto mb-6 bg-white text-aura-black shadow-sm">
            <Lock size={24} className="text-aura-black" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-aura-black">Staff Portal</h2>
          <p className="text-neutral-400 text-[10px] uppercase tracking-[0.2em] mt-3">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs font-bold text-aura-black uppercase tracking-widest mb-2">Access Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Key..."
              className="w-full bg-white border border-neutral-200 py-4 px-4 text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all placeholder-neutral-300 shadow-sm"
              style={{ backgroundColor: '#ffffff' }}
            />
            {error && <p className="text-red-600 text-xs mt-2 font-medium flex items-center gap-1"><span className="w-1 h-1 bg-red-600 rounded-full"></span>{error}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-aura-black text-white py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-3 border border-aura-black hover:border-aura-gold hover:text-aura-gold"
          >
            Enter Dashboard <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
          <button 
            onClick={handleReturnHome}
            className="text-neutral-400 hover:text-aura-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors mx-auto"
          >
            <ArrowLeft size={14} /> Return to Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;