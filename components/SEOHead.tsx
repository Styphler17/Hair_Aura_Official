import React, { useEffect } from 'react';
import { SettingsController } from '../backend/controllers/settingsController';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update Title if provided
    if (title) document.title = `${title} | Hair Aura Ghana`;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) updateMeta('description', description);
    
    // Default keywords + page specific keywords
    const baseKeywords = "hair aura, luxury hair ghana, wigs accra, human hair, virgin bundles";
    if (keywords !== undefined) {
       updateMeta('keywords', keywords ? `${baseKeywords}, ${keywords}` : baseKeywords);
    }

    // Update Favicon dynamically
    const settings = SettingsController.getSettings();
    if (settings.favicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.favicon;
    }

  }, [title, description, keywords]);

  return null; // This component renders nothing visually
};

export default SEOHead;