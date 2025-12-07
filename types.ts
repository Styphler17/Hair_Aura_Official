export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'wigs' | 'bundles' | 'closures';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface WhatsAppConfig {
  phoneNumber: string; // e.g., 1234567890
  messagePrefix: string;
}