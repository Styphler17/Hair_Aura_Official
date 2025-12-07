
import { SiteSettings } from '../models';

const STORAGE_KEY = 'hair_aura_settings_db';

const DEFAULT_LOGO = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 150'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='60' fill='%230a0a0a'%3EHAIR AURA%3C/text%3E%3C/svg%3E`;

const DEFAULT_FAVICON = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>`;

const DEFAULT_HERO_IMAGE = 'https://picsum.photos/id/325/1920/1080';

const DEFAULT_SETTINGS: SiteSettings = {
  phoneNumber: '233508007873',
  address: 'Odumase GA West Accra, Ghana',
  socialLinks: [
    { platform: 'TikTok', url: 'https://www.tiktok.com/@hair_aura_official' },
    { platform: 'Instagram', url: 'https://instagram.com/hair_aura_official' }
  ],
  
  colorText: '#0a0a0a',
  colorBackground: '#ffffff',
  colorAccent: '#D4AF37',

  currencySymbol: 'GH₵',
  logo: DEFAULT_LOGO,
  favicon: DEFAULT_FAVICON,
  
  defaultSocialImage: DEFAULT_HERO_IMAGE, // Use hero as default social share image
  
  heroImage: DEFAULT_HERO_IMAGE,
  heroHeadline: 'Unleash Your Inner Aura',
  heroSubheadline: 'Experience the pinnacle of luxury with our ethically sourced, cuticle-aligned hair extensions. Served exclusively in Accra.',
  heroCtaText: 'Shop Now',

  // Page Content Defaults
  aboutTitle: 'Our Story',
  aboutContent: `Hair Aura was born from a desire to bring uncompromising quality to the hair extension market. We noticed a gap between high-end promises and actual product longevity. Our mission became clear: source only the finest raw virgin hair, ensuring that every bundle, wig, and closure meets our rigorous standards of excellence.\n\nWe believe that hair is an accessory that should empower you. Whether you are looking for a professional sleek look or vacation curls, our collection is curated to enhance your natural beauty without the hassle of tangling or shedding.`,
  contactTitle: 'Get in Touch',
  contactContent: `We operate exclusively online and via WhatsApp to ensure a personalized luxury experience for our clients in Ghana. Connect with us directly for consultations and orders.`,

  maintenanceMode: false
};

export const SettingsController = {
  // Synchronous version for initial state (returns defaults)
  getSettingsSync: (): SiteSettings => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        logo: parsed.logo || DEFAULT_LOGO,
        favicon: parsed.favicon || DEFAULT_FAVICON,
        defaultSocialImage: parsed.defaultSocialImage || DEFAULT_HERO_IMAGE,
        colorText: parsed.colorText || parsed.brandColor || DEFAULT_SETTINGS.colorText,
        colorBackground: parsed.colorBackground || DEFAULT_SETTINGS.colorBackground,
        colorAccent: parsed.colorAccent || DEFAULT_SETTINGS.colorAccent,
        aboutTitle: parsed.aboutTitle || DEFAULT_SETTINGS.aboutTitle,
        aboutContent: parsed.aboutContent || DEFAULT_SETTINGS.aboutContent,
        contactTitle: parsed.contactTitle || DEFAULT_SETTINGS.contactTitle,
        contactContent: parsed.contactContent || DEFAULT_SETTINGS.contactContent,
        maintenanceMode: parsed.maintenanceMode || false,
      };
    }
    return DEFAULT_SETTINGS;
  },

  // Async version that fetches from API
  getSettings: async (): Promise<SiteSettings> => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/get_settings.php');
      const data = await response.json();
      
      // Map database fields to frontend format
      return {
        phoneNumber: data.phone_number || DEFAULT_SETTINGS.phoneNumber,
        address: data.address || DEFAULT_SETTINGS.address,
        currencySymbol: data.currency_symbol || DEFAULT_SETTINGS.currencySymbol,
        colorText: data.color_text || DEFAULT_SETTINGS.colorText,
        colorBackground: data.color_background || DEFAULT_SETTINGS.colorBackground,
        colorAccent: data.color_accent || DEFAULT_SETTINGS.colorAccent,
        logo: data.logo || DEFAULT_LOGO,
        favicon: data.favicon || DEFAULT_FAVICON,
        defaultSocialImage: data.default_social_image || DEFAULT_HERO_IMAGE,
        heroImage: data.hero_image || DEFAULT_HERO_IMAGE,
        heroHeadline: data.hero_headline || DEFAULT_SETTINGS.heroHeadline,
        heroSubheadline: data.hero_subheadline || DEFAULT_SETTINGS.heroSubheadline,
        heroCtaText: data.hero_cta_text || DEFAULT_SETTINGS.heroCtaText,
        aboutTitle: data.about_title || DEFAULT_SETTINGS.aboutTitle,
        aboutContent: data.about_content || DEFAULT_SETTINGS.aboutContent,
        contactTitle: data.contact_title || DEFAULT_SETTINGS.contactTitle,
        contactContent: data.contact_content || DEFAULT_SETTINGS.contactContent,
        maintenanceMode: data.maintenance_mode || false,
        socialLinks: data.socialLinks || DEFAULT_SETTINGS.socialLinks,
      };
    } catch (error) {
      console.error("Error fetching settings:", error);
      // Fallback to LocalStorage if API fails
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          logo: parsed.logo || DEFAULT_LOGO,
          favicon: parsed.favicon || DEFAULT_FAVICON,
          defaultSocialImage: parsed.defaultSocialImage || DEFAULT_HERO_IMAGE,
          colorText: parsed.colorText || parsed.brandColor || DEFAULT_SETTINGS.colorText,
          colorBackground: parsed.colorBackground || DEFAULT_SETTINGS.colorBackground,
          colorAccent: parsed.colorAccent || DEFAULT_SETTINGS.colorAccent,
          aboutTitle: parsed.aboutTitle || DEFAULT_SETTINGS.aboutTitle,
          aboutContent: parsed.aboutContent || DEFAULT_SETTINGS.aboutContent,
          contactTitle: parsed.contactTitle || DEFAULT_SETTINGS.contactTitle,
          contactContent: parsed.contactContent || DEFAULT_SETTINGS.contactContent,
          maintenanceMode: parsed.maintenanceMode || false,
        };
      }
      return DEFAULT_SETTINGS;
    }
  },

  updateSettings: (settings: SiteSettings): SiteSettings => {
    const safeSettings = {
        ...settings,
        logo: settings.logo || DEFAULT_LOGO,
        favicon: settings.favicon || DEFAULT_FAVICON
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeSettings));
    window.dispatchEvent(new Event('settings-updated'));
    return safeSettings;
  }
};
