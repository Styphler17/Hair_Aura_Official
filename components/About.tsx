
import React, { useState, useEffect } from 'react';
import SEOHead from './SEOHead';
import { SettingsController } from '../backend/controllers/settingsController';
import { SiteSettings } from '../backend/models';

const About: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(SettingsController.getSettingsSync());

  useEffect(() => {
    const fetchSettings = async () => {
      const fetchedSettings = await SettingsController.getSettings();
      setSettings(fetchedSettings);
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-white">
      <SEOHead 
        title={settings.aboutTitle} 
        description="Learn about the Aura Standard. We source 100% virgin, single-donor hair ethically and provide the highest quality HD lace in Ghana."
      />
      {/* Header */}
      <div className="bg-neutral-50 py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-aura-black">{settings.aboutTitle}</h1>
        <p className="text-neutral-400 uppercase tracking-widest text-xs">Redefining Luxury Hair</p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-lg mx-auto text-neutral-600 font-light whitespace-pre-line">
          <p className="text-xl leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-aura-black">
            {settings.aboutContent}
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-aura-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">The Aura Standard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 border border-neutral-800 hover:border-neutral-600 transition-colors">
              <div className="text-4xl mb-4 text-neutral-500">01</div>
              <h3 className="font-serif text-xl mb-4 text-white">100% Virgin Hair</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">Unprocessed, cuticle aligned hair that remains soft and manageable for years with proper care.</p>
            </div>
            <div className="text-center p-6 border border-neutral-800 hover:border-neutral-600 transition-colors">
              <div className="text-4xl mb-4 text-neutral-500">02</div>
              <h3 className="font-serif text-xl mb-4 text-white">HD Lace Technology</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">Ultra-thin, undetectable lace that melts seamlessly into any skin tone for a flawless install.</p>
            </div>
            <div className="text-center p-6 border border-neutral-800 hover:border-neutral-600 transition-colors">
              <div className="text-4xl mb-4 text-neutral-500">03</div>
              <h3 className="font-serif text-xl mb-4 text-white">Ethical Sourcing</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">We maintain direct relationships with our donors and suppliers to ensure ethical practices at every step.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual Break */}
      <div className="h-96 w-full relative">
         <img src="https://picsum.photos/id/1005/1920/600" alt="Texture shot" className="w-full h-full object-cover grayscale" />
      </div>
    </div>
  );
};

export default About;