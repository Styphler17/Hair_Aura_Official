
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
  heroCtaText: 'Shop Now'
};

export const SettingsController = {
  getSettings: (): SiteSettings => {
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
      };
    }
    return DEFAULT_SETTINGS;
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
