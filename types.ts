export type { Product, SiteSettings, AdminProfile } from './backend/models';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface WhatsAppConfig {
  phoneNumber: string; 
  messagePrefix: string;
}
