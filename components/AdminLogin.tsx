
import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="bg-white p-8 md:p-12 shadow-xl border border-neutral-100 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-aura-black rounded-full flex items-center justify-center mx-auto mb-4 text-white">
            <Lock size={20} />
          </div>
          <h2 className="font-serif text-2xl font-bold">Staff Portal</h2>
          <p className="text-neutral-400 text-xs uppercase tracking-widest mt-2">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full border-b-2 border-neutral-200 py-3 px-2 focus:outline-none focus:border-aura-black transition-colors bg-transparent placeholder-neutral-400"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-aura-black text-white py-4 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            Enter Dashboard <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
