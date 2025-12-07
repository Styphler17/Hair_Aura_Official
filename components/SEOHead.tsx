
import React, { useEffect } from 'react';
import { SettingsController } from '../backend/controllers/settingsController';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string; // Featured image for sharing
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, keywords, image }) => {
  useEffect(() => {
    const settings = SettingsController.getSettings();
    const siteTitle = `${title} | Hair Aura Ghana`;
    
    // Update Document Title
    document.title = siteTitle;

    // Helper to update meta tags
    const updateMeta = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        
        // Handle name vs property attributes
        if (selector.startsWith('meta[name=')) {
           element.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        } else if (selector.startsWith('meta[property=')) {
           element.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        }
        
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard SEO
    if (description) updateMeta('meta[name="description"]', description);
    
    const baseKeywords = "hair aura, luxury hair ghana, wigs accra, human hair, virgin bundles";
    if (keywords !== undefined) {
       updateMeta('meta[name="keywords"]', keywords ? `${baseKeywords}, ${keywords}` : baseKeywords);
    }

    // Open Graph / Social Sharing
    updateMeta('meta[property="og:title"]', siteTitle);
    updateMeta('meta[property="og:description"]', description || settings.heroSubheadline);
    updateMeta('meta[property="og:type"]', 'website');
    updateMeta('meta[property="og:url"]', window.location.href);
    
    // Featured Image Logic: Product Image > Blog Image > Default Setting > Hero Image
    const shareImage = image || settings.defaultSocialImage || settings.heroImage;
    if (shareImage) {
        updateMeta('meta[property="og:image"]', shareImage);
    }

    // Dynamic Favicon
    if (settings.favicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.favicon;
    }

  }, [title, description, keywords, image]);

  return null;
};

export default SEOHead;
