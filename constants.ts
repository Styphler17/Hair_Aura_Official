
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
    price: 3500,
    description: 'Bone straight, high definition lace that melts into your skin. 100% Virgin Human Hair.',
    image: 'https://picsum.photos/id/64/800/800',
    images: [
      'https://picsum.photos/id/64/800/800',
      'https://picsum.photos/id/65/800/800',
      'https://picsum.photos/id/66/800/800'
    ],
    category: 'wigs',
    tags: ['Best Seller', 'HD Lace'],
    colors: ['Natural Black', 'Jet Black'],
    seoKeywords: 'straight wig, bone straight, ghana wigs, hd lace accra'
  },
  {
    id: '2',
    name: 'Body Wave Bundles (3pcs)',
    price: 2200,
    description: 'Luxurious S-pattern waves that hold curls for days. Full cuticle aligned.',
    image: 'https://picsum.photos/id/338/800/800',
    images: [
      'https://picsum.photos/id/338/800/800',
      'https://picsum.photos/id/339/800/800'
    ],
    category: 'bundles',
    tags: ['Bundle Deal'],
    colors: ['Natural Black', 'Dark Brown'],
    seoKeywords: 'body wave, hair bundles, virgin hair ghana'
  },
  {
    id: '3',
    name: 'Deep Curly Frontal Wig',
    price: 3800,
    description: 'Tight, bouncy curls for a voluminous look. Minimal shedding and tangling.',
    image: 'https://picsum.photos/id/129/800/800',
    images: [
      'https://picsum.photos/id/129/800/800',
      'https://picsum.photos/id/130/800/800'
    ],
    category: 'wigs',
    tags: ['Vacation Ready'],
    colors: ['Natural Black'],
    seoKeywords: 'curly wig, deep wave, frontal wig'
  },
  {
    id: '4',
    name: 'Russian Blonde 613 Bundles',
    price: 2800,
    description: 'Pre-bleached platinum blonde bundles. Ready to dye any color.',
    image: 'https://picsum.photos/id/22/800/800',
    images: [
      'https://picsum.photos/id/22/800/800',
      'https://picsum.photos/id/23/800/800'
    ],
    category: 'bundles',
    tags: ['613 Blonde'],
    colors: ['613 Blonde'],
    seoKeywords: 'blonde hair, 613 bundles, platinum hair accra'
  },
  {
    id: '5',
    name: '5x5 Transparent Closure',
    price: 1200,
    description: 'Perfect for glueless installs. Thin lace for a natural hairline.',
    image: 'https://picsum.photos/id/1005/800/800',
    images: [
      'https://picsum.photos/id/1005/800/800'
    ],
    category: 'closures',
    tags: ['Beginner Friendly'],
    colors: ['Natural Black', 'Dark Brown', '613 Blonde'],
    seoKeywords: 'closure, 5x5 closure, transparent lace'
  },
  {
    id: '6',
    name: 'Kinky Straight Clip-ins',
    price: 1500,
    description: 'Matches natural blown-out 4C hair texture perfectly. Seamless blend.',
    image: 'https://picsum.photos/id/331/800/800',
    images: [
      'https://picsum.photos/id/331/800/800'
    ],
    category: 'bundles',
    tags: ['Natural Texture'],
    colors: ['Natural Black'],
    seoKeywords: 'kinky straight, clip ins, natural hair extensions'
  },
   {
    id: '7',
    name: 'Raw Burmese Curly Wig',
    price: 4500,
    description: 'Authentic raw hair with a natural luster and coarse curly texture.',
    image: 'https://picsum.photos/id/342/800/800',
    images: ['https://picsum.photos/id/342/800/800'],
    category: 'wigs',
    tags: ['Raw Hair'],
    colors: ['Natural Black'],
    seoKeywords: 'burmese hair, curly wig, raw hair ghana'
  },
   {
    id: '8',
    name: 'Piano Highlight Bob',
    price: 2000,
    description: 'Chic blunt cut bob with honey blonde highlights.',
    image: 'https://picsum.photos/id/433/800/800',
    images: ['https://picsum.photos/id/433/800/800'],
    category: 'wigs',
    tags: ['Short Style'],
    colors: ['Piano Highlight (P4/27)'],
    seoKeywords: 'bob wig, highlighted hair, piano color'
  }
];
