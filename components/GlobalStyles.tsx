
import React, { useEffect } from 'react';
import { SettingsController } from '../backend/controllers/settingsController';

const GlobalStyles: React.FC = () => {
  useEffect(() => {
    const updateColors = async () => {
      const settings = await SettingsController.getSettings();
      const root = document.documentElement;

      // Primary / Text Color (aura-black)
      root.style.setProperty('--color-aura-black', settings.colorText);
      
      // Background Color
      root.style.setProperty('--color-background', settings.colorBackground);
      
      // Accent / Gold Color (aura-gold)
      root.style.setProperty('--color-aura-gold', settings.colorAccent);
      
      // Derived Lighter Gold (Optional: just reducing opacity or reusing accent)
      // For simplicity, we just keep aura-gold-light as a static complementary or derived if needed
      // Here we might just set it to the same accent but let tailwind handle opacity or leave static
      // Let's make it a 40% opacity version of the accent if possible, or just keeping the static one for now to avoid complexity
      // root.style.setProperty('--color-aura-gold-light', settings.colorAccent + '66'); // Hex transparency
    };

    // Initial load
    updateColors();

    // Listen for changes
    window.addEventListener('settings-updated', updateColors);
    return () => window.removeEventListener('settings-updated', updateColors);
  }, []);

  return null;
};

export default GlobalStyles;
