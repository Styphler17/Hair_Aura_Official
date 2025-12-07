
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
  getAll: async (): Promise<BlogPost[]> => {
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/get_blog_posts.php');
      const data = await response.json();
      
      if (response.ok && Array.isArray(data)) {
        return data;
      }
      
      throw new Error('Invalid response from API');
    } catch (error) {
      console.error("Error fetching blog posts from API, using localStorage fallback:", error);
      // Fallback to LocalStorage only if API fails
      initStorage();
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_BLOGS;
    }
  },

  getById: async (id: string): Promise<BlogPost | undefined> => {
    try {
      const response = await fetch(`https://hair-aura.debesties.com/api/get_blog_posts.php?id=${id}`);
      const data = await response.json();
      
      if (response.ok && data && !data.error) {
        return data;
      }
      
      throw new Error(data.error || 'Blog post not found');
    } catch (error) {
      console.error("Error fetching blog post from API, using localStorage fallback:", error);
      // Fallback to LocalStorage
      const blogs = await BlogController.getAll();
      return blogs.find(b => b.id === id);
    }
  },

  create: async (data: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> => {
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/save_blog_post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          ...data
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        // Return the created post from API response
        const newPost: BlogPost = {
          ...data,
          id: result.id,
          date: new Date().toISOString()
        };
        return newPost;
      }
      
      throw new Error(result.error || 'Failed to create blog post');
    } catch (error) {
      console.error("Error creating blog post via API, using localStorage fallback:", error);
      // Fallback to LocalStorage only if API fails
      initStorage();
      const blogs = await BlogController.getAll();
      const newPost: BlogPost = {
        ...data,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      const updated = [newPost, ...blogs];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return newPost;
    }
  },

  update: async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      // First get the existing post from API
      const existing = await BlogController.getById(id);
      if (!existing) {
        console.error("Blog post not found with id:", id);
        return null;
      }

      const updatedData = { ...existing, ...updates };
      
      // Ensure date is in ISO format for API
      if (updatedData.date && !updatedData.date.includes('T')) {
        updatedData.date = new Date(updatedData.date).toISOString();
      }

      const response = await fetch('https://hair-aura.debesties.com/api/save_blog_post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          id: id,
          title: updatedData.title,
          excerpt: updatedData.excerpt,
          content: updatedData.content,
          image: updatedData.image,
          author: updatedData.author,
          date: updatedData.date,
          seoDescription: updatedData.seoDescription
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        // Return updated data from API
        return updatedData;
      }
      
      throw new Error(result.error || 'Failed to update blog post');
    } catch (error) {
      console.error("Error updating blog post via API, using localStorage fallback:", error);
      // Fallback to LocalStorage only if API fails
      initStorage();
      const blogs = await BlogController.getAll();
      const index = blogs.findIndex(b => b.id === id);
      if (index === -1) return null;

      const updated = { ...blogs[index], ...updates };
      blogs[index] = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
      return updated;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/delete_blog_post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        // Successfully deleted from API, no localStorage update needed
        return;
      }
      
      throw new Error(result.error || 'Failed to delete blog post');
    } catch (error) {
      console.error("Error deleting blog post via API, using localStorage fallback:", error);
      // Fallback to LocalStorage only if API fails
      initStorage();
      const blogs = await BlogController.getAll();
      const filtered = blogs.filter(b => b.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
  }
};
