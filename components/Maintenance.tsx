
import React, { useState, useEffect } from 'react';
import { SettingsController } from '../backend/controllers/settingsController';
import SEOHead from './SEOHead';
import { Loader } from 'lucide-react';

const Maintenance: React.FC = () => {
  const [settings, setSettings] = useState(SettingsController.getSettings());

  useEffect(() => {
    setSettings(SettingsController.getSettings());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-aura-black text-white px-4 relative overflow-hidden">
      <SEOHead title="Under Maintenance" description="We are currently upgrading our experience." />
      
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <img src={settings.heroImage} alt="Background" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="mb-8 flex justify-center text-aura-gold">
           <Loader size={48} className="animate-spin-slow" />
        </div>
        
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 tracking-tight">We'll be right back</h1>
        <div className="w-24 h-1 bg-aura-gold mx-auto mb-8"></div>
        <p className="text-neutral-300 text-lg font-light leading-relaxed mb-10">
          The Aura Standard is currently being elevated. We are performing scheduled maintenance to bring you an even better luxury experience.
        </p>
        
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-aura-gold">
          Check back soon
        </p>
      </div>

      <div className="absolute bottom-8 left-0 w-full text-center">
        <span className="font-serif text-xl font-bold tracking-tighter text-white/30">HAIR AURA.</span>
      </div>
    </div>
  );
};

export default Maintenance;
