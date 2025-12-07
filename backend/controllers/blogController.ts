
import { BlogPost } from '../models';

const STORAGE_KEY = 'hair_aura_blog_posts';

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Maintaining HD Lace',
    excerpt: 'Learn the secrets to keeping your lace melted and undetectable for weeks with our expert maintenance tips.',
    content: 'HD Lace is known for its delicate nature and high transparency, making it the top choice for a flawless install. However, to keep it looking fresh, you need to avoid heavy oils and excessive glue. Clean the lace gently with alcohol every few days to remove buildup...',
    image: 'https://picsum.photos/id/1027/800/600',
    author: 'Aura Stylist',
    date: new Date().toISOString(),
    seoDescription: 'Expert tips on maintaining HD lace wigs for longevity and a natural look.'
  },
  {
    id: '2',
    title: 'Virgin vs. Raw Hair: What is the Difference?',
    excerpt: 'Confused about hair grades? We break down the differences between processed virgin hair and authentic raw donor hair.',
    content: 'When shopping for luxury extensions, the terms Virgin and Raw are often used interchangeably, but they are quite different. Raw hair is completely unprocessed, meaning it comes directly from a donor without chemical alterations. Virgin hair may be steam processed to achieve specific curl patterns...',
    image: 'https://picsum.photos/id/64/800/600',
    author: 'Hair Aura Team',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    seoDescription: 'Understand the difference between Virgin hair and Raw hair before you buy.'
  },
  {
    id: '3',
    title: '5 Summer Styles for the Accra Heat',
    excerpt: 'Beat the humidity with these breathable, chic styles perfect for the Ghanaian weather.',
    content: 'Accra heat is no joke, and wearing a heavy wig can be uncomfortable. We recommend glueless closures for breathability, or a short bob cut to keep hair off your neck. Our body wave bundles also hold up well in humidity without frizzing excessively...',
    image: 'https://picsum.photos/id/338/800/600',
    author: 'Aura Stylist',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    seoDescription: 'Best wig styles for hot weather in Ghana.'
  }
];

const initStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
    }
  }
};

export const BlogController = {
  getAll: (): BlogPost[] => {
    initStorage();
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_BLOGS;
  },

  getById: (id: string): BlogPost | undefined => {
    const blogs = BlogController.getAll();
    return blogs.find(b => b.id === id);
  },

  create: (data: Omit<BlogPost, 'id' | 'date'>): BlogPost => {
    const blogs = BlogController.getAll();
    const newPost: BlogPost = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    const updated = [newPost, ...blogs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newPost;
  },

  update: (id: string, updates: Partial<BlogPost>): BlogPost | null => {
    const blogs = BlogController.getAll();
    const index = blogs.findIndex(b => b.id === id);
    if (index === -1) return null;

    const updated = { ...blogs[index], ...updates };
    blogs[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return updated;
  },

  delete: (id: string): void => {
    const blogs = BlogController.getAll();
    const filtered = blogs.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
