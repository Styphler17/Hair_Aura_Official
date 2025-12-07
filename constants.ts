import { Product, WhatsAppConfig } from './types';

// Updated to the provided Ghana number
export const WHATSAPP_CONFIG: WhatsAppConfig = {
  phoneNumber: '233508007873', 
  messagePrefix: 'Hello Hair Aura, I am interested in: '
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silky Straight 13x4 HD Lace Wig',
    price: 350,
    description: 'Bone straight, high definition lace that melts into your skin. 100% Virgin Human Hair.',
    image: 'https://picsum.photos/id/64/800/800',
    category: 'wigs'
  },
  {
    id: '2',
    name: 'Body Wave Bundles (3pcs)',
    price: 220,
    description: 'Luxurious S-pattern waves that hold curls for days. Full cuticle aligned.',
    image: 'https://picsum.photos/id/338/800/800',
    category: 'bundles'
  },
  {
    id: '3',
    name: 'Deep Curly Frontal Wig',
    price: 380,
    description: 'Tight, bouncy curls for a voluminous look. Minimal shedding and tangling.',
    image: 'https://picsum.photos/id/129/800/800',
    category: 'wigs'
  },
  {
    id: '4',
    name: 'Russian Blonde 613 Bundles',
    price: 280,
    description: 'Pre-bleached platinum blonde bundles. Ready to dye any color.',
    image: 'https://picsum.photos/id/22/800/800',
    category: 'bundles'
  },
  {
    id: '5',
    name: '5x5 Transparent Closure',
    price: 120,
    description: 'Perfect for glueless installs. Thin lace for a natural hairline.',
    image: 'https://picsum.photos/id/1005/800/800',
    category: 'closures'
  },
  {
    id: '6',
    name: 'Kinky Straight Clip-ins',
    price: 150,
    description: 'Matches natural blown-out 4C hair texture perfectly. Seamless blend.',
    image: 'https://picsum.photos/id/331/800/800',
    category: 'bundles'
  }
];

export const SYSTEM_INSTRUCTION = `
You are "Aura", a high-end AI Hair Consultant for "Hair Aura", a luxury hair extension brand.
Your tone is sophisticated, knowledgeable, friendly, and concise. 
You help customers choose between wigs, bundles, and closures based on their lifestyle and preferences.
We sell:
- Straight Wigs (Sleek, professional)
- Body Wave Bundles (Versatile, hold curls)
- Deep Curly Wigs (Voluminous, vacation vibes)
- 613 Blonde (Bold, color-ready)
- Closures (Protective, beginner-friendly)

If a user asks to buy, direct them to click the "Order on WhatsApp" button on the products.
Keep responses under 50 words unless detailed advice is requested.
`;