
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string; // Main image
  images?: string[]; // Gallery images
  category: 'wigs' | 'bundles' | 'closures';
  tags?: string[];
  colors?: string[]; // New: Available colors
  seoKeywords?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string; // Short description for cards
  content: string; // Full content
  image: string; // Thumbnail
  author: string;
  date: string;
  seoDescription: string; // Meta description
}

export interface Draft {
  id: string;
  type: 'product' | 'blog';
  content: any; // Flexible JSON content
  updatedAt: string;
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
  colorText: string;
  colorBackground: string;
  colorAccent: string;
  
  currencySymbol: string;
  logo?: string; 
  favicon?: string;
  
  // SEO & Social Sharing
  defaultSocialImage?: string; // Image used when sharing homepage
  
  // Homepage Hero Configuration
  heroImage?: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;

  // Page Content Management
  aboutTitle: string;
  aboutContent: string; // Supports simple text or HTML if needed
  aboutImage?: string; // Background image for About page
  contactTitle: string;
  contactContent: string;
  
  maintenanceMode: boolean; // New: Toggle for maintenance page
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
