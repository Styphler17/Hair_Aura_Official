
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string; // Main image
  images?: string[]; // Gallery images
  category: 'wigs' | 'bundles' | 'closures';
  tags?: string[];
  seoKeywords?: string;
}

export interface SocialLink {
  platform: 'TikTok' | 'Instagram' | 'Facebook' | 'Twitter' | 'YouTube' | 'Snapchat';
  url: string;
}

export interface SiteSettings {
  phoneNumber: string;
  address: string;
  socialLinks: SocialLink[];
  
  // Branding Colors
  colorText: string;       // Replaces aura-black (Primary/Text)
  colorBackground: string; // Page Background
  colorAccent: string;     // Replaces aura-gold (Accent)
  
  currencySymbol: string;
  logo?: string; // Base64 or URL
  favicon?: string; // Base64 or URL
  
  // Homepage Hero Configuration
  heroImage?: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
}

export type AdminRole = 'Super Admin' | 'Editor' | 'Viewer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: AdminRole;
  avatar?: string;
  lastLogin: string;
}

export interface AdminProfile {
  username: string;
  lastLogin: string;
}
